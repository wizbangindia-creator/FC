from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import httpx
import uuid
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=8, max_length=20)
    email: Optional[EmailStr] = None
    date: str
    time: str
    guests: str
    occasion: Optional[str] = None
    event: Optional[str] = None
    notes: Optional[str] = Field(default=None, max_length=500)


class Booking(BookingCreate):
    booking_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


def _booking_email_html(b: Booking) -> str:
    def row(label: str, value: str) -> str:
        return (f'<tr><td style="padding:8px 16px 8px 0;color:#9CA3AF;font-size:12px;'
                f'text-transform:uppercase;letter-spacing:2px;vertical-align:top">{label}</td>'
                f'<td style="padding:8px 0;color:#F7F5F0;font-size:14px">{value}</td></tr>')

    rows = [
        row("Name", escape(b.name)),
        row("Phone", f'<a href="tel:{escape(b.phone)}" style="color:#D4AF37">{escape(b.phone)}</a>'),
        row("Date", escape(b.date)),
        row("Time", escape(b.time)),
        row("Guests", escape(b.guests)),
    ]
    if b.email:
        rows.append(row("Email", f'<a href="mailto:{escape(b.email)}" style="color:#D4AF37">{escape(b.email)}</a>'))
    if b.occasion:
        rows.append(row("Occasion", escape(b.occasion)))
    if b.event:
        rows.append(row("Event RSVP", escape(b.event)))
    if b.notes:
        rows.append(row("Requests", escape(b.notes)))
    rows.append(row("Booking ID", escape(b.booking_id)))

    return ('<table role="presentation" width="100%" style="background:#09090B;padding:32px">'
            '<tr><td style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">'
            '<p style="color:#D4AF37;font-size:12px;letter-spacing:4px;text-transform:uppercase">'
            f'{escape(EMAIL_FROM_NAME)}</p>'
            '<h1 style="color:#F7F5F0;font-size:24px;font-weight:600;margin:8px 0 24px">'
            'New table booking request</h1>'
            f'<table role="presentation">{"".join(rows)}</table>'
            '<p style="font-size:12px;color:#888;margin-top:32px">'
            f'Sent by {escape(EMAIL_FROM_NAME)}. We never ask for passwords or card details by email.'
            '</p></td></tr></table>')


@api_router.get("/")
async def root():
    return {"message": "Flow Club Pathankot API"}


@api_router.post("/bookings", response_model=Booking)
async def create_booking(input: BookingCreate):
    booking = Booking(**input.model_dump())
    doc = booking.model_dump()
    await db.bookings.insert_one(doc)
    try:
        subject = f"New booking: {booking.name} — {booking.date} at {booking.time}"
        await send_email(to=OWNER_EMAIL, subject=subject, html=_booking_email_html(booking))
    except Exception as e:
        logger.error(f"Owner notification email failed for {booking.booking_id}: {e}")
    return booking


@api_router.get("/bookings")
async def list_bookings():
    return await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

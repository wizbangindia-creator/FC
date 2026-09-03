# Flow Club Pathankot — Website

## Original Problem Statement
Build a very beautiful website for Flow Club, a disco club + restaurant in Adhunik Vihar, Mamun, Pathankot, Punjab 145001. Live music, DJ/party environment, comedy & live events, ~12 PM–12 AM daily, phone +91 95390 80001, Instagram @flowclub__, Google rating 4.4 (299 reviews), ₹400–₹1,600 per person. User chose: full multi-section site + table booking/event RSVP form; luxe lounge vibe (deep tones, gold/champagne); WhatsApp contact button; bookings saved to database; email notification on every booking; "surprise me" on colors/fonts. User attempted to attach a logo but it did not come through — typographic FLOWCLUB wordmark used as placeholder.

## User Personas
- Party-goers/diners in Pathankot wanting to book tables or RSVP events
- The venue owner receiving booking notifications by email
- Mobile-first visitors arriving via Instagram/Google

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll), sonner toasts, single-page scroll experience
- Backend: FastAPI, MongoDB (motor) via MONGO_URL/DB_NAME env, /api prefix
- Email: Emergent-managed Resend proxy (integrations.emergentagent.com), EMERGENT_EMAIL_KEY in backend/.env
- Design: /app/design_guidelines.json — Luxe Lounge (Obsidian #09090B, Gold #D4AF37, Cormorant Garamond / Syne / Plus Jakarta Sans / JetBrains Mono)

## Implemented (2026-07)
- Cinematic hero with masked line-by-line kinetic reveal + scroll parallax/zoom
- Slow editorial marquee ribbon
- Numbered manifesto chapters: 01 Vibe, 02 Dining & Drinks (tabbed menu), 03 Events lineup (filterable, RSVP buttons prefill booking form), 04 Gallery (spotlight frames + lightbox), 05 Reservations (booking form -> MongoDB + owner email), 06 Location/Hours/Contact
- Floating WhatsApp button (wa.me/919539080001 prefilled)
- Glass navbar, mobile menu, editorial footer, grain overlay
- POST/GET /api/bookings; owner notification email per booking (guardrail-gated template)
- Verified: curl booking POST/GET, email send 202 Accepted, e2e booking flow via screenshot

## Pending / Requires User
- OWNER_EMAIL in /app/backend/.env is currently TEST address delivered@resend.dev — replace with the owner's real email for production notifications

## Updates (2026-07, iteration 2)
- Real Flow Club logo integrated: navbar, footer, gallery Instagram band, favicon + page title/meta
- Instagram: "Follow the night — @flowclub__" band in gallery linking to https://www.instagram.com/flowclub__ (profile link-out; live auto-feed requires Meta Graph API token — deferred)

## Updates (2026-07, iteration 4)
- Animated preloader: obsidian screen, logo pop-in, letter-by-letter "FLOW CLUB" masked reveal, gold progress line + percentage counter, curtain-lift exit into the hero; page scroll locked during load
- Footer credit: "Designed & Developed by Wizbang India" (very small, links to https://www.wizbang.in, opens in new tab)
- Real venue photography integrated: hero background = B&W packed dance-floor crowd shot (venue-crowd.webp, wide); Events: Saturday Flow = crowd photo, Unplugged Evenings = live band photo; Gallery leads with real venue shots (crowd, singers, band) mixed with lounge ambiance stock. Files in /app/frontend/public/venue-*.webp. Singer-with-balloons shot (venue-hero.webp) lives in the gallery.

## Backlog
- P0: Real owner email for notifications; real logo swap
- P1: Admin view of bookings (needs auth); event management CRUD for owner
- P2: Instagram feed auto-embed; Google Maps embed; full menu PDF; gallery image management

## Next Tasks
1. Collect owner email + logo from user
2. Add booking admin dashboard if requested

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MessageCircle, Check } from "lucide-react";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TIMES = ["12:00 PM", "1:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];
const GUESTS = ["2 guests", "4 guests", "6 guests", "8 guests", "10+ guests (VIP booth)"];
const OCCASIONS = ["Casual Dining", "Birthday", "Anniversary", "VIP Party", "Corporate", "Other"];

const inputCls =
  "w-full bg-[#121215] border border-amber-500/20 px-4 py-3.5 text-sm text-[#F7F5F0] placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37] transition-colors duration-300";

export default function Booking() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", time: "8:00 PM",
    guests: "4 guests", occasion: "Casual Dining", event: "", notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    const onRsvp = (e) => setForm((f) => ({ ...f, event: e.detail }));
    window.addEventListener("fc:rsvp", onRsvp);
    return () => window.removeEventListener("fc:rsvp", onRsvp);
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, email: form.email || null, notes: form.notes || null, event: form.event || null };
      const { data } = await axios.post(`${API}/bookings`, payload);
      setConfirmed(data);
      toast.success("Booking request received — we'll confirm shortly.");
    } catch (err) {
      toast.error(err.response?.data?.detail?.[0]?.msg || "Could not submit. Please call us instead.");
    } finally {
      setLoading(false);
    }
  };

  const waText = confirmed
    ? encodeURIComponent(
        `Hi Flow Club! I just booked online — ${confirmed.name}, ${confirmed.date} at ${confirmed.time}, ${confirmed.guests}. Booking ID: ${confirmed.booking_id.slice(0, 8)}`
      )
    : "";

  return (
    <section id="reserve" data-testid="reserve-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ChapterHeading number="05" title="Reservations & VIP" subtitle="Your table, held in gold." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Reserve for dinner, a birthday booth, or tonight&rsquo;s headline set.
              Requests go straight to the Flow Club team — expect a confirmation call
              within the hour during operating times.
            </p>
            <div className="mt-8 space-y-4 font-mono-luxe text-xs tracking-[0.2em] text-zinc-500">
              <p>OPEN DAILY · 12 PM — 12 AM</p>
              <p>WALK-INS WELCOME · BOOTHS BY REQUEST</p>
              <p className="text-[#D4AF37]">PREFER TALKING? +91 95390 80001</p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-8">
            {confirmed ? (
              <div
                data-testid="booking-confirmation"
                className="bg-[#121215] border border-[#D4AF37]/50 p-8 sm:p-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                    <Check size={18} className="text-[#09090B]" />
                  </span>
                  <h3 className="font-serif-luxe text-2xl sm:text-3xl text-[#F7F5F0]">Request received.</h3>
                </div>
                <div className="grid grid-cols-2 gap-y-3 text-sm mb-8">
                  <span className="text-zinc-500">Name</span><span className="text-[#F7F5F0]">{confirmed.name}</span>
                  <span className="text-zinc-500">Date</span><span className="text-[#F7F5F0]">{confirmed.date}</span>
                  <span className="text-zinc-500">Time</span><span className="text-[#F7F5F0]">{confirmed.time}</span>
                  <span className="text-zinc-500">Party</span><span className="text-[#F7F5F0]">{confirmed.guests}</span>
                  {confirmed.event && (<><span className="text-zinc-500">Event</span><span className="text-[#F7F5F0]">{confirmed.event}</span></>)}
                  <span className="text-zinc-500">Booking ID</span>
                  <span className="font-mono-luxe text-[#D4AF37] text-xs">{confirmed.booking_id.slice(0, 8)}</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    data-testid="booking-whatsapp-confirm"
                    href={`https://wa.me/919539080001?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold bg-[#25D366] text-black hover:brightness-110 transition-all duration-300"
                  >
                    <MessageCircle size={14} /> Confirm on WhatsApp
                  </a>
                  <button
                    data-testid="booking-new-button"
                    onClick={() => setConfirmed(null)}
                    className="px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase border border-amber-500/30 text-zinc-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                  >
                    Make another booking
                  </button>
                </div>
              </div>
            ) : (
              <form data-testid="booking-form" onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input data-testid="booking-form-name-input" required minLength={2} placeholder="Full name *" value={form.name} onChange={set("name")} className={inputCls} />
                <input data-testid="booking-form-phone-input" required minLength={8} placeholder="Phone number *" value={form.phone} onChange={set("phone")} className={inputCls} />
                <input data-testid="booking-form-email-input" type="email" placeholder="Email (optional)" value={form.email} onChange={set("email")} className={inputCls} />
                <input data-testid="booking-form-date-picker" required type="date" value={form.date} onChange={set("date")} className={inputCls} />
                <select data-testid="booking-form-time-select" value={form.time} onChange={set("time")} className={inputCls}>
                  {TIMES.map((t) => <option key={t}>{t}</option>)}
                </select>
                <select data-testid="booking-form-guests-select" value={form.guests} onChange={set("guests")} className={inputCls}>
                  {GUESTS.map((g) => <option key={g}>{g}</option>)}
                </select>
                <select data-testid="booking-form-occasion-select" value={form.occasion} onChange={set("occasion")} className={inputCls}>
                  {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <input data-testid="booking-form-event-input" placeholder="Event RSVP (optional)" value={form.event} onChange={set("event")} className={inputCls} />
                <textarea
                  data-testid="booking-form-notes-input"
                  placeholder="Special requests — cake, décor, booth preference…"
                  value={form.notes}
                  onChange={set("notes")}
                  rows={3}
                  className={`${inputCls} sm:col-span-2 resize-none`}
                />
                <button
                  data-testid="booking-form-submit-button"
                  type="submit"
                  disabled={loading}
                  className="sm:col-span-2 px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold bg-[#D4AF37] text-[#09090B] hover:bg-[#F3E5AB] disabled:opacity-50 transition-all duration-300"
                >
                  {loading ? "Sending…" : "Request This Table"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

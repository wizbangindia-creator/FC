import { MapPin, Clock, Phone, Instagram, Navigation } from "lucide-react";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const CARDS = [
  {
    icon: MapPin,
    title: "Find Us",
    lines: ["Adhunik Vihar, Mamun", "Pathankot, Punjab 145001"],
    testid: "contact-address-card",
  },
  {
    icon: Clock,
    title: "Hours",
    lines: ["Open daily", "12:00 PM — 12:00 AM"],
    testid: "contact-hours-card",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 95390 80001", "Reservations & event queries"],
    testid: "contact-phone-card",
  },
  {
    icon: Instagram,
    title: "Follow",
    lines: ["@flowclub__", "Lineups, drops & aftermovies"],
    testid: "contact-instagram-card",
  },
];

export default function Contact() {
  return (
    <section id="contact" data-testid="contact-section" className="py-24 sm:py-32 bg-[#0D0D10] border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ChapterHeading number="06" title="Location & Hours" subtitle="Mamun, Pathankot — after dark, follow the gold." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * i}>
              <div
                data-testid={c.testid}
                className="h-full bg-[#121215] border border-amber-500/10 p-7 hover:border-amber-500/40 transition-colors duration-500"
              >
                <c.icon size={22} strokeWidth={1.25} className="text-[#D4AF37] mb-5" />
                <h3 className="font-serif-luxe text-xl text-[#F7F5F0] mb-2">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-sm text-zinc-400 leading-relaxed">{l}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-4">
            <a
              data-testid="contact-phone-link"
              href="tel:+919539080001"
              className="inline-flex items-center gap-2 px-7 py-4 text-xs tracking-[0.2em] uppercase font-semibold bg-[#D4AF37] text-[#09090B] hover:bg-[#F3E5AB] transition-colors duration-300"
            >
              <Phone size={14} /> Call +91 95390 80001
            </a>
            <a
              data-testid="contact-directions-button"
              href="https://www.google.com/maps/search/?api=1&query=Flow+Club+Adhunik+Vihar+Mamun+Pathankot+Punjab+145001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 text-xs tracking-[0.2em] uppercase font-semibold border border-amber-500/40 text-[#F7F5F0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              <Navigation size={14} /> Get Directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

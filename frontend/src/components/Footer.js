import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-amber-500/15 bg-[#09090B] pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <img
          src="/flowclub-logo.png"
          alt="Flow Club logo"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto mb-8 ring-1 ring-[#D4AF37]/40"
          data-testid="footer-logo"
        />
        <h2 className="font-serif-luxe italic text-[18vw] lg:text-[11rem] leading-none gold-text text-center select-none">
          Flow Club
        </h2>

        <div className="hairline-gold my-12" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">
          <div>
            <p className="font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Visit</p>
            <p className="text-zinc-400 leading-relaxed flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[#D4AF37]/70" />
              Adhunik Vihar, Mamun,<br />Pathankot, Punjab 145001
            </p>
          </div>
          <div>
            <p className="font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Hours</p>
            <p className="text-zinc-400 leading-relaxed">
              Open daily<br />12:00 PM — 12:00 AM
            </p>
          </div>
          <div>
            <p className="font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              <a data-testid="footer-phone-link" href="tel:+919539080001" className="text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <Phone size={14} /> +91 95390 80001
              </a>
              <a data-testid="footer-instagram-link" href="https://www.instagram.com/flowclub__" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <Instagram size={14} /> @flowclub__
              </a>
            </div>
          </div>
        </div>

        <div className="hairline-gold my-10" />

        <p className="text-center font-mono-luxe text-[10px] tracking-[0.25em] text-zinc-600 uppercase">
          © {new Date().getFullYear()} Flow Club · Pathankot&rsquo;s Nightlife
        </p>
      </div>
    </footer>
  );
}

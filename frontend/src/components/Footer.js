import { Instagram, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-amber-500/15 bg-[#09090B] pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <button
            data-testid="footer-flowclub-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group text-center py-8 md:py-4 md:pr-12 md:border-r md:border-amber-500/15"
          >
            <img
              src="/flowclub-logo.png"
              alt="Flow Club logo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto mb-6 ring-1 ring-[#D4AF37]/40 group-hover:ring-[#D4AF37] transition-all duration-300"
              data-testid="footer-logo"
            />
            <h2 className="font-serif-luxe italic text-5xl sm:text-6xl lg:text-7xl leading-none gold-text select-none">
              Flow Club
            </h2>
            <p className="mt-4 font-mono-luxe text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
              Tonight&rsquo;s Destination
            </p>
          </button>

          <Link
            to="/pathankot-club"
            data-testid="footer-pathankot-club-link"
            className="group block text-center py-8 md:py-4 md:pl-12 border-t md:border-t-0 border-amber-500/15"
          >
            <img
              src="/pathankot-club-logo.png"
              alt="Pathankot Club logo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto mb-6 ring-1 ring-[#D4AF37]/40 group-hover:ring-[#D4AF37] transition-all duration-300"
            />
            <h2 className="font-serif-luxe italic text-5xl sm:text-6xl lg:text-7xl leading-none text-[#F7F5F0] group-hover:text-[#D4AF37] transition-colors duration-300 select-none">
              Pathankot Club
            </h2>
            <p className="mt-4 font-mono-luxe text-[10px] tracking-[0.3em] text-zinc-500 group-hover:text-[#D4AF37]/80 uppercase transition-colors duration-300 inline-flex items-center gap-2">
              Est. 1998 · The Heritage Club <ArrowUpRight size={12} />
            </p>
          </Link>
        </div>

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
        <p className="text-center mt-3">
          <a
            data-testid="footer-credit-wizbang"
            href="https://www.wizbang.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-luxe text-[9px] tracking-[0.2em] text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors duration-300 uppercase"
          >
            Designed &amp; Developed by Wizbang India
          </a>
        </p>
      </div>
    </footer>
  );
}

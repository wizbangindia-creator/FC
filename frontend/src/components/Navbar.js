import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { EASE } from "@/components/Reveal";

const LINKS = [
  { id: "vibe", label: "The Vibe", testid: "nav-link-vibe" },
  { id: "dining", label: "Dining & Drinks", testid: "nav-link-dining" },
  { id: "events", label: "Events", testid: "nav-link-events" },
  { id: "gallery", label: "Gallery", testid: "nav-link-gallery" },
  { id: "reserve", label: "Book Table", testid: "nav-link-reserve" },
];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/60 border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        <button
          data-testid="nav-brand-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse-gold" />
          <span className="font-syne font-extrabold tracking-[0.22em] text-sm sm:text-base text-[#F7F5F0]">
            FLOW<span className="gold-text">CLUB</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={l.testid}
              onClick={() => scrollTo(l.id)}
              className="text-xs tracking-[0.2em] uppercase text-zinc-400 hover:text-[#D4AF37] transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            data-testid="nav-call-button"
            href="tel:+919539080001"
            className="hidden sm:flex items-center gap-2 text-xs tracking-wider text-zinc-300 hover:text-[#D4AF37] transition-colors duration-300"
          >
            <Phone size={13} />
            <span className="font-mono-luxe">95390 80001</span>
          </a>
          <button
            data-testid="nav-reserve-button"
            onClick={() => scrollTo("reserve")}
            className="hidden sm:inline-flex px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-semibold bg-[#D4AF37] text-[#09090B] hover:bg-[#F3E5AB] transition-colors duration-300"
          >
            Reserve
          </button>
          <button
            data-testid="nav-mobile-menu-button"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-zinc-300"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="lg:hidden overflow-hidden bg-black/90 border-b border-amber-500/15"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: EASE }}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollTo(l.id), 150);
                  }}
                  className="text-left font-serif-luxe text-2xl text-[#F7F5F0] hover:text-[#D4AF37] transition-colors"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

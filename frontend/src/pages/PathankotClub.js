import { useEffect } from "react";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import { motion } from "framer-motion";
import {
  Waves, CircleDot, Target, Zap, Flame, Layers, Dumbbell, Scissors,
  Wine, UtensilsCrossed, Trees, GlassWater, BedDouble, Star, MapPin,
  Phone, Navigation, ArrowLeft, ArrowUpRight,
} from "lucide-react";
import { Reveal, ChapterHeading, EASE } from "@/components/Reveal";
import Marquee from "@/components/Marquee";

const FACILITIES = [
  { icon: Waves, name: "Swimming Pool" },
  { icon: CircleDot, name: "Billiards" },
  { icon: Target, name: "Snooker" },
  { icon: Zap, name: "Table Tennis" },
  { icon: Flame, name: "Steam & Sauna" },
  { icon: Layers, name: "Card Room" },
  { icon: Dumbbell, name: "Gymnasium" },
  { icon: Scissors, name: "Salon" },
  { icon: Wine, name: "Bar" },
  { icon: UtensilsCrossed, name: "Dining" },
  { icon: Trees, name: "Party Lawns" },
  { icon: GlassWater, name: "Poolside Hall" },
  { icon: BedDouble, name: "Guest Accommodation" },
];

function MaskedLine({ children, index, className }) {
  return (
    <span className={`block overflow-hidden ${className || ""}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.35 + index * 0.14, duration: 0.95, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function PathankotClub() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div data-testid="pathankot-club-page" className="min-h-screen bg-[#09090B] text-[#F7F5F0]">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/60 border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" data-testid="pc-nav-home-logo" className="flex items-center gap-3 group">
            <img src="/flowclub-logo.png" alt="Flow Club" className="w-9 h-9 rounded-full object-cover ring-1 ring-[#D4AF37]/50" />
            <span className="hidden sm:inline font-mono-luxe text-[10px] tracking-[0.3em] text-zinc-500 uppercase group-hover:text-[#D4AF37] transition-colors">
              A Flow Club Presentation
            </span>
          </Link>
          <Link
            to="/"
            data-testid="pc-back-to-flowclub"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-semibold border border-amber-500/40 text-[#F7F5F0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            <ArrowLeft size={13} /> Flow Club
          </Link>
        </div>
      </header>

      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1A1A1E_0%,#09090B_65%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20 w-full pt-32">
          <motion.img
            src="/pathankot-club-logo.png"
            alt="Pathankot Club logo"
            data-testid="pc-crest"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-1 ring-[#D4AF37]/50 mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-mono-luxe text-[10px] sm:text-xs tracking-[0.35em] text-[#D4AF37] uppercase mb-6"
          >
            Est. 1998 · 1, Dalhousie Road, Mamun · Pathankot
          </motion.p>

          <h1 className="font-serif-luxe font-medium text-5xl sm:text-7xl lg:text-[6.5rem] leading-[1.02] tracking-tight">
            <MaskedLine index={0}>Pathankot</MaskedLine>
            <MaskedLine index={1}>
              <span className="italic gold-text">Club.</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-xl text-sm sm:text-base text-zinc-300 leading-relaxed"
          >
            The city&rsquo;s original private social club — recreation, hospitality
            and membership since 1998. Where Flow Club owns the night, Pathankot Club
            owns the lifestyle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            data-testid="pc-hero-stats"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-luxe text-[10px] sm:text-xs tracking-[0.2em] text-zinc-400"
          >
            <span className="flex items-center gap-1.5">
              <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" /> 3.8 GOOGLE · 396 REVIEWS
            </span>
            <span className="hidden sm:inline text-[#D4AF37]/50">|</span>
            <span>10 ROOMS · 8 DELUXE + 2 SUITES</span>
            <span className="hidden sm:inline text-[#D4AF37]/50">|</span>
            <span>MEMBERS · FAMILIES · GUESTS</span>
          </motion.div>
        </div>
      </section>

      <Marquee items={["PATHANKOT CLUB", "EST. 1998", "RECREATION & HOSPITALITY", "MEMBERSHIP CLUB", "DALHOUSIE ROAD", "POOL · GYM · BILLIARDS"]} />

      <section className="py-24 sm:py-32 bg-[#0D0D10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ChapterHeading number="01" title="The Facilities" subtitle="Thirteen ways to spend a slow afternoon." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-amber-500/10 border border-amber-500/10">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.name} delay={0.03 * i}>
                <div
                  data-testid={`pc-facility-${f.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="group bg-[#121215] p-6 sm:p-8 h-full hover:bg-[#1A1A1E] transition-colors duration-500"
                >
                  <f.icon size={22} strokeWidth={1.25} className="text-[#D4AF37] mb-4" />
                  <p className="font-serif-luxe text-base sm:text-lg text-[#F7F5F0] group-hover:text-[#D4AF37] transition-colors duration-300">
                    {f.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ChapterHeading number="02" title="Stay & Dine" subtitle="Rooms above the lawns, dinner below the stars." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Guest Accommodation", desc: "10 rooms — 8 Deluxe and 2 Suites — listed in the affiliated-club network, with parking and Wi-Fi. Listed as a 3-star hospitality property.", tag: "STAY" },
              { title: "The Dining Room", desc: "North Indian cuisine and desserts with indoor and outdoor seating. Third-party listings put dinner for two at roughly ₹350.", tag: "DINE" },
              { title: "Members First", desc: "Most facilities are reserved for members, their families and invited guests — a club lifestyle rather than a walk-in venue.", tag: "BELONG" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={0.08 * i}>
                <div data-testid={`pc-staydine-${i}`} className="h-full bg-[#121215] border border-amber-500/10 p-8 hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-500">
                  <span className="font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">{c.tag}</span>
                  <h3 className="font-serif-luxe text-2xl text-[#F7F5F0] mt-4 mb-3">{c.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-[#0D0D10] border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ChapterHeading number="03" title="Two Destinations" subtitle="Same neighbourhood. Different nights." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-amber-500/10 border border-amber-500/10">
            <Reveal>
              <div className="bg-[#121215] p-8 sm:p-12 h-full">
                <p className="font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Pathankot Club</p>
                <p className="font-serif-luxe text-2xl sm:text-3xl text-[#F7F5F0] leading-snug">
                  &ldquo;I want a club lifestyle — recreation, family hospitality, membership.&rdquo;
                </p>
                <p className="mt-4 text-sm text-zinc-500">Traditional private social club · Est. 1998 · 3.8★</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/" data-testid="pc-compare-flowclub-link" className="group block bg-[#121215] p-8 sm:p-12 h-full hover:bg-[#1A1A1E] transition-colors duration-500">
                <p className="font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-4 flex items-center gap-2">
                  Flow Club <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </p>
                <p className="font-serif-luxe text-2xl sm:text-3xl text-[#F7F5F0] group-hover:text-[#D4AF37] transition-colors leading-snug">
                  &ldquo;I want to go out tonight — eat, drink, listen to music, party.&rdquo;
                </p>
                <p className="mt-4 text-sm text-zinc-500">Modern nightlife venue · Disco & dining · 4.4★</p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ChapterHeading number="04" title="Visit" subtitle="Dalhousie Road, Mamun — the quiet side of the cluster." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: MapPin, title: "Address", lines: ["1, Dalhousie Road, Adhunik Vihar", "Mamun, Pathankot, Punjab 145001"], testid: "pc-address-card" },
              { icon: Phone, title: "Reservations", lines: ["0186-2247500", "0186-2247600"], testid: "pc-phone-card" },
              { icon: Star, title: "Reputation", lines: ["3.8 on Google", "~396 reviews"], testid: "pc-rating-card" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={0.06 * i}>
                <div data-testid={c.testid} className="h-full bg-[#121215] border border-amber-500/10 p-7 hover:border-amber-500/40 transition-colors duration-500">
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
                data-testid="pc-call-button"
                href="tel:01862247500"
                className="inline-flex items-center gap-2 px-7 py-4 text-xs tracking-[0.2em] uppercase font-semibold bg-[#D4AF37] text-[#09090B] hover:bg-[#F3E5AB] transition-colors duration-300"
              >
                <Phone size={14} /> Call 0186-2247500
              </a>
              <a
                data-testid="pc-directions-button"
                href="https://www.google.com/maps/search/?api=1&query=Pathankot+Club+Dalhousie+Road+Mamun+Pathankot+Punjab+145001"
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

      <footer className="border-t border-amber-500/15 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="font-mono-luxe text-[10px] tracking-[0.25em] text-zinc-600 uppercase">
            © {new Date().getFullYear()} Pathankot Club Limited · Presented by Flow Club
          </p>
          <p className="mt-3">
            <a
              data-testid="pc-footer-credit-wizbang"
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
    </div>
  );
}

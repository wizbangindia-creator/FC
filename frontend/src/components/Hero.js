import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, MapPin, ArrowDown } from "lucide-react";
import { EASE } from "@/components/Reveal";

const HERO_IMG = "/venue-hero.webp";

function MaskedLine({ children, index, className }) {
  return (
    <span className={`block overflow-hidden ${className || ""}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.45 + index * 0.14, duration: 0.95, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative min-h-screen flex items-end overflow-hidden">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img src={HERO_IMG} alt="Live singer performing at Flow Club Pathankot" className="w-full h-full object-cover object-[center_20%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/55 to-[#09090B]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#09090B_100%)]" />

      <motion.div style={{ opacity: fade }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20 sm:pb-28 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="font-mono-luxe text-[10px] sm:text-xs tracking-[0.35em] text-[#D4AF37] uppercase mb-6"
          data-testid="hero-eyebrow"
        >
          Flow Club · Adhunik Vihar, Mamun · Pathankot
        </motion.p>

        <h1 className="font-serif-luxe font-medium text-4xl sm:text-6xl lg:text-[5.5rem] leading-[1.02] tracking-tight">
          <MaskedLine index={0}>The Epicenter of</MaskedLine>
          <MaskedLine index={1}>
            <span className="italic gold-text">Pathankot&rsquo;s</span>
          </MaskedLine>
          <MaskedLine index={2}>Nightlife.</MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8, ease: EASE }}
          className="mt-6 max-w-xl text-sm sm:text-base text-zinc-300 leading-relaxed"
        >
          A disco floor that never sleeps, a kitchen that plates like art, live music,
          comedy nights and champagne-gold evenings — open daily, 12 PM to 12 AM.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.8, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-reserve-cta"
            onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold bg-[#D4AF37] text-[#09090B] hover:bg-[#F3E5AB] hover:-translate-y-0.5 transition-all duration-300"
          >
            Reserve a VIP Table
          </button>
          <button
            data-testid="hero-lineup-cta"
            onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold border border-amber-500/40 text-[#F7F5F0] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            Tonight&rsquo;s Lineup
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          data-testid="hero-rating-badge"
          className="mt-10 inline-flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-luxe text-[10px] sm:text-xs tracking-[0.2em] text-zinc-400"
        >
          <span className="flex items-center gap-1.5">
            <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
            4.4 GOOGLE · 299+ REVIEWS
          </span>
          <span className="hidden sm:inline text-[#D4AF37]/50">|</span>
          <span>₹400 – ₹1,600 PER GUEST</span>
          <span className="hidden sm:inline text-[#D4AF37]/50">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[#D4AF37]" />
            MAMUN, PATHANKOT
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#D4AF37]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

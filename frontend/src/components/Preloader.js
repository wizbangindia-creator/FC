import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/Reveal";

const LETTERS = "FLOW CLUB".split("");

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1900;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      data-testid="preloader"
      className="fixed inset-0 z-[100] bg-[#09090B] flex flex-col items-center justify-center"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img
        src="/flowclub-logo.png"
        alt="Flow Club"
        initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-1 ring-[#D4AF37]/50 mb-8"
      />

      <div className="flex overflow-hidden">
        {LETTERS.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: EASE }}
            className="font-serif-luxe text-3xl sm:text-5xl tracking-[0.28em] text-[#F7F5F0]"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-3 font-mono-luxe text-[10px] tracking-[0.4em] text-zinc-500 uppercase"
      >
        Pathankot's Nightlife
      </motion.p>

      <div className="mt-8 h-px w-52 bg-[#D4AF37]/15 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#D4AF37] transition-none"
          style={{ width: `${count}%` }}
        />
      </div>

      <span
        data-testid="preloader-counter"
        className="absolute bottom-8 right-8 font-mono-luxe text-sm tracking-[0.25em] text-[#D4AF37]"
      >
        {count}%
      </span>
      <span className="absolute bottom-8 left-8 font-mono-luxe text-[10px] tracking-[0.3em] text-zinc-700 uppercase">
        Est. Mamun · Open till 12 AM
      </span>
    </motion.div>
  );
}

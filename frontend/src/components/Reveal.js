import { motion } from "framer-motion";

export const EASE = [0.25, 1, 0.5, 1];

export function Reveal({ children, delay = 0, className = "", y = 36 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ChapterHeading({ number, title, subtitle }) {
  return (
    <div className="mb-14 sm:mb-20">
      <Reveal>
        <div className="flex items-end gap-5 sm:gap-8">
          <span className="font-mono-luxe text-sm sm:text-base text-[#D4AF37]/80 pb-2 sm:pb-4">
            {number}
          </span>
          <div className="hairline-gold flex-1 mb-4 sm:mb-7" />
          <span className="font-mono-luxe text-[10px] sm:text-xs tracking-[0.3em] text-zinc-500 pb-2 sm:pb-4 uppercase">
            {title}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-serif-luxe text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F7F5F0] mt-6">
          {subtitle}
        </h2>
      </Reveal>
    </div>
  );
}

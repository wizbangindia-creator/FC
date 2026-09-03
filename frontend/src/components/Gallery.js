import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, X } from "lucide-react";
import { Reveal, ChapterHeading, EASE } from "@/components/Reveal";

const IMAGES = [
  { src: "/venue-crowd.webp", alt: "The Flow Club floor mid-celebration", span: "md:col-span-7" },
  { src: "https://images.unsplash.com/photo-1582387914300-c398d3feb160?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuaWdodGNsdWIlMjBwYXJ0eSUyMGxvdW5nZSUyMGdvbGQlMjBsaWdodCUyMG1vb2R8ZW58MHx8fHwxNzg4NDIzOTI3fDA&ixlib=rb-4.1.0&q=85", alt: "Candlelit table ambiance", span: "md:col-span-5" },
  { src: "/venue-singer.webp", alt: "Resident singer live on the Flow stage", span: "md:col-span-5" },
  { src: "/venue-band.webp", alt: "Live band night at Flow Club", span: "md:col-span-7" },
  { src: "https://images.unsplash.com/photo-1659626672821-e64c8a510e26?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBuaWdodGNsdWIlMjBwYXJ0eSUyMGxvdW5nZSUyMGdvbGQlMjBsaWdodCUyMG1vb2R8ZW58MHx8fHwxNzg4NDIzOTI3fDA&ixlib=rb-4.1.0&q=85", alt: "Lounge interior in gold light", span: "md:col-span-4" },
  { src: "/venue-hero.webp", alt: "Acoustic set at Flow Club Pathankot", span: "md:col-span-8" },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" data-testid="gallery-section" className="py-24 sm:py-32 bg-[#0D0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ChapterHeading number="04" title="Visual Archive" subtitle="Moments from the floor, framed." />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={0.05 * i} className={img.span}>
              <button
                data-testid={`gallery-item-${i}`}
                onClick={() => setSelected(img)}
                className="spotlight-card relative block w-full h-60 sm:h-72 overflow-hidden group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="spotlight-frame w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#09090B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <a
            data-testid="gallery-instagram-link"
            href="https://www.instagram.com/flowclub__"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-14 flex items-center justify-between gap-6 border border-amber-500/20 bg-[#121215] p-6 sm:p-8 group hover:border-[#D4AF37]/60 transition-colors duration-500"
          >
            <div className="flex items-center gap-5">
              <img
                src="/flowclub-logo.png"
                alt="Flow Club on Instagram"
                className="w-14 h-14 rounded-full object-cover ring-1 ring-[#D4AF37]/40"
              />
              <div>
                <p className="font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-1.5">
                  Follow the night
                </p>
                <p className="font-serif-luxe text-xl sm:text-2xl text-[#F7F5F0] group-hover:text-[#D4AF37] transition-colors duration-300">
                  @flowclub__ on Instagram
                </p>
                <p className="text-xs text-zinc-500 mt-1">Lineup drops, event aftermovies & nightly stories</p>
              </div>
            </div>
            <span className="hidden sm:flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-zinc-400 group-hover:text-[#D4AF37] transition-colors duration-300 shrink-0">
              <Instagram size={16} /> Follow
            </span>
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="gallery-lightbox"
            className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setSelected(null)}
          >
            <button
              data-testid="gallery-lightbox-close"
              className="absolute top-6 right-6 text-zinc-400 hover:text-[#D4AF37]"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              src={selected.src}
              alt={selected.alt}
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

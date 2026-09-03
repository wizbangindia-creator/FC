import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Ticket } from "lucide-react";
import { Reveal, ChapterHeading, EASE } from "@/components/Reveal";

const DJ_IMG = "https://images.unsplash.com/photo-1541126274323-dbac58d14741?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxkaiUyMHBlcmZvcm1pbmclMjBwYXJ0eSUyMGxpZ2h0aW5nJTIwc3RhZ2UlMjBuaWdodGNsdWIlMjBjb25jZXJ0fGVufDB8fHx8MTc4ODQyMzkzNnww&ixlib=rb-4.1.0&q=85";
const CROWD_IMG = "/venue-crowd.webp";
const BAND_IMG = "/venue-band.webp";

const EVENTS = [
  {
    title: "Neon Fridays",
    tag: "DJ Night",
    when: "Every Friday",
    time: "9:00 PM onwards",
    entry: "Couples & mixed groups",
    desc: "Resident DJs take the floor into overtime. Commercial, Punjabi bangers and deep house after eleven.",
    img: DJ_IMG,
  },
  {
    title: "Saturday Flow",
    tag: "Disco",
    when: "Every Saturday",
    time: "9:00 PM onwards",
    entry: "Full house party",
    desc: "The weekend flagship. Full light rig, packed floor, and the loudest night in Pathankot.",
    img: CROWD_IMG,
  },
  {
    title: "Unplugged Evenings",
    tag: "Live Music",
    when: "Sundays",
    time: "7:00 PM onwards",
    entry: "Open seating",
    desc: "Acoustic sets and live vocals over dinner. The slow burn before the week begins.",
    img: BAND_IMG,
  },
  {
    title: "Laugh Out Loud",
    tag: "Comedy",
    when: "Monthly special",
    time: "8:00 PM",
    entry: "Ticketed — watch Instagram",
    desc: "Touring stand-up comics on the Flow stage. Dinner service runs through the show.",
    img: DJ_IMG,
  },
];

const FILTERS = ["All", "DJ Night", "Disco", "Live Music", "Comedy"];

export default function Events() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? EVENTS : EVENTS.filter((e) => e.tag === filter);

  const rsvp = (title) => {
    window.dispatchEvent(new CustomEvent("fc:rsvp", { detail: title }));
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="events" data-testid="events-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ChapterHeading number="03" title="Nights & Lineup" subtitle="The week, choreographed." />

        <Reveal>
          <div className="flex flex-wrap gap-2 mb-12" data-testid="events-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`event-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                  filter === f
                    ? "bg-[#D4AF37] text-[#09090B] border-[#D4AF37] font-semibold"
                    : "border-amber-500/20 text-zinc-400 hover:border-amber-500/50 hover:text-[#F7F5F0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {list.map((e, i) => (
              <motion.article
                layout
                key={e.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}
                data-testid={`event-card-${e.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group bg-[#121215] border border-amber-500/10 overflow-hidden hover:border-amber-500/40 transition-colors duration-500"
              >
                <div className="relative h-52 sm:h-64 overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur text-[10px] font-mono-luxe tracking-[0.25em] text-[#D4AF37] uppercase">
                    {e.tag}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-syne font-bold text-xl sm:text-2xl tracking-wide text-[#F7F5F0] mb-3">
                    {e.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono-luxe text-[11px] tracking-wider text-zinc-400 mb-4">
                    <span className="flex items-center gap-1.5"><CalendarDays size={12} className="text-[#D4AF37]" />{e.when}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#D4AF37]" />{e.time}</span>
                    <span className="flex items-center gap-1.5"><Ticket size={12} className="text-[#D4AF37]" />{e.entry}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{e.desc}</p>
                  <button
                    data-testid={`event-rsvp-${e.title.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => rsvp(e.title)}
                    className="px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#09090B] transition-all duration-300"
                  >
                    RSVP This Night
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

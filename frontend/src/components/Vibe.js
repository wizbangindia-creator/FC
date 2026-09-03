import { Disc3, Crown, Martini, MoonStar } from "lucide-react";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const FEATURES = [
  {
    icon: Disc3,
    title: "High-Energy Disco Floor",
    desc: "A sculpted light rig and tuned sound system built for nights that peak past midnight.",
  },
  {
    icon: Crown,
    title: "Luxe VIP Booths",
    desc: "Velvet-draped private booths with dedicated service for celebrations that matter.",
  },
  {
    icon: Martini,
    title: "Artisanal Bar",
    desc: "Smoke, gold leaf and small-batch spirits — cocktails engineered like performances.",
  },
  {
    icon: MoonStar,
    title: "Ambient Terrace",
    desc: "A slower rhythm under open skies. Dinner first, the dance floor after.",
  },
];

export default function Vibe() {
  return (
    <section id="vibe" data-testid="vibe-section" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ChapterHeading number="01" title="The Experience" subtitle="A venue built for the nights Pathankot talks about." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <Reveal className="lg:col-span-7">
            <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
              Flow Club is where the city&rsquo;s energy collects after dark. Part disco,
              part gourmet kitchen, part live stage — it has hosted everything from
              weekend DJ takeovers to sold-out stand-up comedy. The room moves from
              candlelit dinners at eight to a full-throttle dance floor by ten.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
              Rated 4.4 on Google by nearly 300 guests, with a typical spend of
              ₹400–₹1,600 per person. Come for dinner, stay for the set — the night
              is designed to escalate.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-amber-500/25 px-5 py-3">
              <span className="font-mono-luxe text-[10px] sm:text-xs tracking-[0.25em] text-[#D4AF37]">
                OPEN DAILY · 12:00 PM — 12:00 AM
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.08 * i}>
              <div
                data-testid={`vibe-feature-${i}`}
                className="group h-full bg-[#121215] border border-amber-500/10 p-7 hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-500"
              >
                <f.icon size={26} strokeWidth={1.25} className="text-[#D4AF37] mb-5" />
                <h3 className="font-serif-luxe text-xl sm:text-2xl text-[#F7F5F0] mb-3">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

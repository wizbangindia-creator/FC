import { Star } from "lucide-react";

const ITEMS = [
  "FLOW CLUB PATHANKOT",
  "DISCO & GOURMET DINING",
  "LIVE MUSIC",
  "COMEDY NIGHTS",
  "VIP LOUNGES",
  "12 PM — 12 AM DAILY",
];

function Strip() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="font-serif-luxe italic text-2xl sm:text-3xl text-[#F7F5F0]/90 px-6 whitespace-nowrap">
            {item}
          </span>
          <Star size={12} className="text-[#D4AF37] fill-[#D4AF37] shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      data-testid="editorial-marquee"
      className="relative overflow-hidden border-y border-amber-500/15 bg-[#0D0D10] py-5"
    >
      <div className="animate-marquee flex w-max">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}

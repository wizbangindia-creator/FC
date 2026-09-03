import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, ChapterHeading, EASE } from "@/components/Reveal";

const IMG = "https://images.unsplash.com/photo-1700909591006-a78674596074?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBjb2NrdGFpbCUyMGJhciUyMGRyaW5rJTIwZ29sZCUyMGF0bW9zcGhlcmV8ZW58MHx8fHwxNzg4NDIzOTM2fDA&ixlib=rb-4.1.0&q=85";

const MENU = {
  "Signature Cocktails": [
    { name: "Gold Rush Old Fashioned", desc: "Bourbon, smoked honey, gold mist", price: "₹449" },
    { name: "Flow Signature Martini", desc: "Small-batch gin, champagne bitters", price: "₹499" },
    { name: "Smoked Whisky Sour", desc: "Oak smoke, amarena cherry, silk foam", price: "₹449" },
    { name: "Champagne Blossom Spritz", desc: "Elderflower, brut, edible petals", price: "₹549" },
  ],
  "Gourmet Mains": [
    { name: "Butter Chicken Royale", desc: "Char-grilled tikka, saffron makhani", price: "₹425" },
    { name: "Flow Tandoori Platter", desc: "The full fire of the clay oven, for two", price: "₹799" },
    { name: "Truffle Paneer Tikka", desc: "Malai paneer, truffle oil, mint dust", price: "₹475" },
    { name: "Chef's Lamb Rogan", desc: "Slow-braised, Kashmiri chilli, ghee roti", price: "₹525" },
  ],
  "Small Plates": [
    { name: "Peri Peri Fries", desc: "House spice blend, smoked aioli", price: "₹225" },
    { name: "Chilli Chicken Dry", desc: "Wok-tossed, burnt garlic, spring onion", price: "₹375" },
    { name: "Loaded Nachos", desc: "Queso, salsa roja, pickled jalapeño", price: "₹325" },
    { name: "Amritsari Fish Fingers", desc: "Ajwain crumb, tartare, lemon ash", price: "₹425" },
  ],
  "Premium Spirits": [
    { name: "Single Malt Selection", desc: "Rotating shelf of Scottish & Indian malts", price: "from ₹550" },
    { name: "Premium Vodka & Gin", desc: "Chilled, neat, or built to order", price: "from ₹350" },
    { name: "Champagne & Sparkling", desc: "For the booth, for the toast", price: "from ₹2,999" },
    { name: "Crafted Classics", desc: "IMFL favourites, poured generously", price: "from ₹250" },
  ],
};

export default function MenuHighlights() {
  const tabs = Object.keys(MENU);
  const [active, setActive] = useState(tabs[0]);

  return (
    <section id="dining" data-testid="dining-section" className="py-24 sm:py-32 bg-[#0D0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ChapterHeading number="02" title="Culinary & Cocktails" subtitle="Plated like art. Poured like theatre." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden spotlight-card h-80 sm:h-[480px] lg:sticky lg:top-28">
              <img src={IMG} alt="Signature gold cocktail at Flow Club" className="spotlight-frame w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/85 to-transparent" />
              <p className="absolute bottom-5 left-5 font-mono-luxe text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">
                The Artisanal Bar
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-10" data-testid="menu-tabs">
                {tabs.map((t) => (
                  <button
                    key={t}
                    data-testid={`menu-tab-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setActive(t)}
                    className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                      active === t
                        ? "bg-[#D4AF37] text-[#09090B] border-[#D4AF37] font-semibold"
                        : "border-amber-500/20 text-zinc-400 hover:border-amber-500/50 hover:text-[#F7F5F0]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.ul
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="divide-y divide-amber-500/10"
                data-testid="menu-items-list"
              >
                {MENU[active].map((item) => (
                  <li key={item.name} className="py-5 flex items-baseline justify-between gap-4 group">
                    <div>
                      <h3 className="font-serif-luxe text-xl sm:text-2xl text-[#F7F5F0] group-hover:text-[#D4AF37] transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-sm text-zinc-500 mt-1">{item.desc}</p>
                    </div>
                    <span className="font-mono-luxe text-sm text-[#D4AF37] whitespace-nowrap">{item.price}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <p className="mt-8 text-xs text-zinc-500 font-mono-luxe tracking-wider">
              FULL MENU AVAILABLE AT THE VENUE · PRICES INDICATIVE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

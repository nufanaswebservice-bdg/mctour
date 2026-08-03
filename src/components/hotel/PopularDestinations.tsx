"use client";

import { motion } from "framer-motion";

const destinations = [
  { name: "Bali", hotels: 2500, emoji: "🏝️", trending: true },
  { name: "Jakarta", hotels: 1800, emoji: "🏙️", trending: false },
  { name: "Bandung", hotels: 950, emoji: "🏔️", trending: true },
  { name: "Yogyakarta", hotels: 780, emoji: "🏯", trending: false },
  { name: "Singapore", hotels: 1200, emoji: "🇸🇬", trending: true },
  { name: "Bangkok", hotels: 3200, emoji: "🇹🇭", trending: false },
  { name: "Tokyo", hotels: 4100, emoji: "🇯🇵", trending: true },
  { name: "Seoul", hotels: 2800, emoji: "🇰🇷", trending: false },
];

export default function PopularDestinations() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Destinasi Populer</h2>
      <p className="text-xs text-muted mb-4">Temukan hotel terbaik di kota favorit</p>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x-mandatory">
        {destinations.map((dest, i) => (
          <motion.div key={dest.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex-shrink-0 w-[110px] snap-start">
            <div className="relative h-32 rounded-2xl bg-gradient-to-b from-primary/10 to-primary/5 flex flex-col items-center justify-center p-3 border border-primary/5 active:scale-95 transition-transform cursor-pointer">
              {dest.trending && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />}
              <span className="text-3xl mb-1.5">{dest.emoji}</span>
              <h3 className="text-[11px] font-bold text-dark-text">{dest.name}</h3>
              <p className="text-[9px] text-muted">{dest.hotels.toLocaleString()} hotel</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

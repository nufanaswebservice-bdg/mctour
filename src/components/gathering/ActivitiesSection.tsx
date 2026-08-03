"use client";

import { motion } from "framer-motion";

const activities = [
  { emoji: "🏕️", name: "Outbound" },
  { emoji: "🎯", name: "Paintball" },
  { emoji: "🚣", name: "Rafting" },
  { emoji: "⛺", name: "Camping" },
  { emoji: "🎲", name: "Fun Games" },
  { emoji: "🗺️", name: "Treasure Hunt" },
  { emoji: "🏃", name: "Amazing Race" },
  { emoji: "🍽️", name: "Dinner" },
  { emoji: "🎵", name: "Live Music" },
  { emoji: "🍖", name: "BBQ" },
  { emoji: "🏎️", name: "ATV" },
  { emoji: "🏹", name: "Archery" },
  { emoji: "🪂", name: "Flying Fox" },
  { emoji: "🚴", name: "Cycling" },
  { emoji: "🤿", name: "Snorkeling" },
  { emoji: "🧗", name: "Offroad" },
];

export default function ActivitiesSection() {
  return (
    <section className="px-4 py-8 bg-gradient-to-b from-[#0057B8]/[0.02] to-transparent rounded-3xl mx-2">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Aktivitas
      </h2>
      <p className="text-xs text-muted mb-4">Pilihan kegiatan seru untuk gathering</p>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {activities.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#0057B8]/5 flex items-center justify-center text-xl">
              {item.emoji}
            </div>
            <span className="text-[9px] font-medium text-dark-text/70 text-center">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

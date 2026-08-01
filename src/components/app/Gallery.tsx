"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const gallery = [
  { title: "Bali Trip", emoji: "🏝️", h: "h-32" },
  { title: "Bromo Sunrise", emoji: "🌋", h: "h-24" },
  { title: "Korea Tour", emoji: "🇰🇷", h: "h-28" },
  { title: "Gathering", emoji: "🏢", h: "h-24" },
  { title: "Jogja Culture", emoji: "🏯", h: "h-32" },
  { title: "Japan Trip", emoji: "🇯🇵", h: "h-28" },
];

export default function Gallery() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Galeri
          </h2>
          <p className="text-xs text-muted mt-0.5">Momen indah bersama pelanggan</p>
        </div>
        <button className="flex items-center gap-1 text-primary text-xs font-semibold active:opacity-70">
          Semua <ChevronRight size={14} />
        </button>
      </div>

      <div className="columns-2 gap-3 space-y-3">
        {gallery.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            className={`${item.h} rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden break-inside-avoid active:scale-[0.97] transition-transform`}
          >
            <span className="text-3xl opacity-50">{item.emoji}</span>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/30 to-transparent">
              <span className="text-[10px] text-white font-medium">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

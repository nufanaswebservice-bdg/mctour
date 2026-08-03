"use client";

import { motion } from "framer-motion";

const gallery = [
  { title: "Corporate Event", emoji: "🏢", h: "h-36" },
  { title: "Outbound Fun", emoji: "🏕️", h: "h-28" },
  { title: "Team Building", emoji: "🤝", h: "h-32" },
  { title: "Gala Dinner", emoji: "🍽️", h: "h-28" },
  { title: "Beach Party", emoji: "🏖️", h: "h-36" },
  { title: "Amazing Race", emoji: "🏃", h: "h-32" },
];

export default function GalleryGrid() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Galeri Event</h2>
      <p className="text-xs text-muted mb-4">Dokumentasi event kami</p>

      <div className="columns-2 gap-3 space-y-3">
        {gallery.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${item.h} rounded-2xl overflow-hidden bg-gradient-to-br from-[#0057B8]/15 to-[#00B4D8]/10 flex items-center justify-center relative break-inside-avoid active:scale-[0.97] transition-transform cursor-pointer`}
          >
            <span className="text-4xl opacity-50">{item.emoji}</span>
            <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-[#0057B8]/60 to-transparent">
              <span className="text-[10px] text-white font-medium">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

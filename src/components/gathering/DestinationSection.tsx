"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const destinations = [
  { name: "Bandung", packages: 25, emoji: "🏔️" },
  { name: "Bogor", packages: 18, emoji: "🌿" },
  { name: "Yogyakarta", packages: 15, emoji: "🏯" },
  { name: "Bali", packages: 32, emoji: "🏝️" },
  { name: "Malang", packages: 12, emoji: "🌸" },
  { name: "Lombok", packages: 10, emoji: "🏖️" },
  { name: "Bromo", packages: 8, emoji: "🌋" },
  { name: "Labuan Bajo", packages: 6, emoji: "⛵" },
];

export default function DestinationSection() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Destinasi Gathering
      </h2>
      <p className="text-xs text-muted mb-4">Lokasi terbaik untuk event Anda</p>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x-mandatory">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex-shrink-0 w-[130px] snap-start"
          >
            <div className="relative h-40 rounded-3xl overflow-hidden bg-gradient-to-b from-[#0057B8]/20 to-[#0057B8]/5 flex flex-col items-center justify-center p-3 active:scale-95 transition-transform cursor-pointer border border-[#0057B8]/5">
              <span className="text-4xl mb-2">{dest.emoji}</span>
              <h3 className="text-xs font-bold text-dark-text">{dest.name}</h3>
              <p className="flex items-center gap-0.5 text-[10px] text-muted mt-0.5">
                <MapPin size={9} /> {dest.packages} paket
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

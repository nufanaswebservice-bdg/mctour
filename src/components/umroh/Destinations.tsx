"use client";

import { motion } from "framer-motion";

const destinations = [
  { name: "Masjidil Haram", city: "Mekkah", emoji: "🕋", desc: "Kiblat umat Islam, tawaf & sholat" },
  { name: "Masjid Nabawi", city: "Madinah", emoji: "🕌", desc: "Makam Rasulullah ﷺ, Raudhah" },
  { name: "Jabal Rahmah", city: "Arafah", emoji: "⛰️", desc: "Bukit tempat bertemunya Adam & Hawa" },
  { name: "Gua Hira", city: "Mekkah", emoji: "🏔️", desc: "Tempat turunnya wahyu pertama" },
  { name: "Masjid Quba", city: "Madinah", emoji: "🏛️", desc: "Masjid pertama dalam Islam" },
  { name: "Uhud", city: "Madinah", emoji: "⚔️", desc: "Situs Perang Uhud bersejarah" },
];

export default function Destinations() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Destinasi Ziarah
      </h2>
      <p className="text-xs text-muted mb-4">Tempat-tempat suci yang akan dikunjungi</p>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x-mandatory">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex-shrink-0 w-[150px] snap-start"
          >
            <div className="h-44 rounded-3xl bg-gradient-to-b from-[#1B5E20]/10 to-[#1B5E20]/5 p-4 flex flex-col items-center justify-center text-center border border-[#1B5E20]/5">
              <span className="text-3xl mb-2">{dest.emoji}</span>
              <h3 className="text-[11px] font-bold text-dark-text">{dest.name}</h3>
              <p className="text-[9px] text-[#1B5E20] font-medium mt-0.5">{dest.city}</p>
              <p className="text-[8px] text-muted mt-1 leading-tight">{dest.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

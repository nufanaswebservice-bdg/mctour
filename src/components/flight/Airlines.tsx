"use client";

import { motion } from "framer-motion";

const airlines = [
  { name: "Garuda Indonesia", code: "GA", color: "bg-blue-50 text-blue-700" },
  { name: "Lion Air", code: "JT", color: "bg-red-50 text-red-700" },
  { name: "Citilink", code: "QG", color: "bg-green-50 text-green-700" },
  { name: "Batik Air", code: "ID", color: "bg-purple-50 text-purple-700" },
  { name: "AirAsia", code: "QZ", color: "bg-rose-50 text-rose-700" },
  { name: "Sriwijaya Air", code: "SJ", color: "bg-cyan-50 text-cyan-700" },
  { name: "Wings Air", code: "IW", color: "bg-amber-50 text-amber-700" },
  { name: "Super Air Jet", code: "IU", color: "bg-orange-50 text-orange-700" },
  { name: "Singapore Airlines", code: "SQ", color: "bg-indigo-50 text-indigo-700" },
  { name: "Malaysia Airlines", code: "MH", color: "bg-teal-50 text-teal-700" },
  { name: "Thai Airways", code: "TG", color: "bg-violet-50 text-violet-700" },
  { name: "Cathay Pacific", code: "CX", color: "bg-emerald-50 text-emerald-700" },
];

export default function Airlines() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-6"
    >
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Maskapai</h2>
      <p className="text-xs text-muted mb-4">Semua maskapai tersedia</p>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {airlines.map((airline, i) => (
          <motion.div
            key={airline.code}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className={`flex-shrink-0 px-3 py-2 rounded-2xl ${airline.color} whitespace-nowrap`}
          >
            <span className="text-[10px] font-bold">{airline.code}</span>
            <span className="text-[10px] font-medium ml-1">{airline.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

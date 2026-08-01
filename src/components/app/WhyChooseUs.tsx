"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Wallet, Headphones, Bus, Award } from "lucide-react";

const reasons = [
  { icon: Wallet, title: "Harga Transparan", desc: "Tanpa biaya tersembunyi", color: "text-green-600", bg: "bg-green-50" },
  { icon: Shield, title: "Aman & Terpercaya", desc: "Asuransi perjalanan", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Clock, title: "Tepat Waktu", desc: "Komitmen jadwal terjaga", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Headphones, title: "Support 24 Jam", desc: "Tim siap membantu", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Bus, title: "Armada Terbaik", desc: "Kendaraan bersih & terawat", color: "text-red-600", bg: "bg-red-50" },
  { icon: Award, title: "15+ Tahun", desc: "Pengalaman melayani", color: "text-cyan-600", bg: "bg-cyan-50" },
];

export default function WhyChooseUs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-6"
    >
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Mengapa mcTour?
      </h2>
      <p className="text-xs text-muted mb-4">Alasan 10.000+ pelanggan memilih kami</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {reasons.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            className="glass-card p-4 active:scale-[0.97] transition-transform"
          >
            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-2`}>
              <item.icon size={20} className={item.color} />
            </div>
            <h3 className="text-xs font-bold text-dark-text">{item.title}</h3>
            <p className="text-[10px] text-muted mt-0.5">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

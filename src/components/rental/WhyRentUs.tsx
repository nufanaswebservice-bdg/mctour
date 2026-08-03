"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Wallet, Car, Headphones, Award } from "lucide-react";

const reasons = [
  { icon: Car, title: "Armada Terawat", desc: "Semua kendaraan bersih & rutin servis", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Wallet, title: "Harga Transparan", desc: "Tanpa biaya tersembunyi", color: "text-green-600", bg: "bg-green-50" },
  { icon: Shield, title: "Asuransi", desc: "Semua rental tercover asuransi", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Clock, title: "24/7 Support", desc: "Tim standby kapan saja", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Headphones, title: "Driver Profesional", desc: "Sopir berpengalaman & ramah", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: Award, title: "15+ Tahun", desc: "Pengalaman melayani rental", color: "text-amber-600", bg: "bg-amber-50" },
];

export default function WhyRentUs() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Kenapa Rental di mcTour?</h2>
      <p className="text-xs text-muted mb-4">Keuntungan rental kendaraan bersama kami</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {reasons.map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass-card p-3">
            <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-2`}>
              <item.icon size={16} className={item.color} />
            </div>
            <h3 className="text-[11px] font-bold text-dark-text">{item.title}</h3>
            <p className="text-[9px] text-muted mt-0.5">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

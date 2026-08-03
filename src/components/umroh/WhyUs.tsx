"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Clock, Users, Heart, FileCheck } from "lucide-react";

const reasons = [
  { icon: FileCheck, title: "Izin Resmi Kemenag", desc: "Terdaftar & berizin lengkap" },
  { icon: Award, title: "15+ Tahun Pengalaman", desc: "Dipercaya ribuan jamaah" },
  { icon: ShieldCheck, title: "Berangkat Pasti", desc: "Garansi keberangkatan 100%" },
  { icon: Clock, title: "Tanpa Antri Lama", desc: "Haji Plus antrian cepat" },
  { icon: Users, title: "Pembimbing Berpengalaman", desc: "Ustadz & muthawwif ahli" },
  { icon: Heart, title: "Pelayanan Prima", desc: "24/7 customer support" },
];

export default function WhyUs() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Mengapa mcTour?
      </h2>
      <p className="text-xs text-muted mb-4">Alasan jamaah mempercayakan ibadah kepada kami</p>

      <div className="grid grid-cols-2 gap-3">
        {reasons.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-3 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B5E20]/10 flex items-center justify-center mx-auto mb-2">
              <item.icon size={18} className="text-[#2E7D32]" />
            </div>
            <h3 className="text-[11px] font-bold text-dark-text">{item.title}</h3>
            <p className="text-[9px] text-muted mt-0.5">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

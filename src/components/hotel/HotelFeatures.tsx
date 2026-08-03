"use client";

import { motion } from "framer-motion";
import { Shield, CreditCard, RotateCcw, Clock, BadgePercent, Headphones } from "lucide-react";

const features = [
  { icon: BadgePercent, title: "Harga Terbaik", desc: "Garansi harga termurah", color: "text-[#FF7A00]", bg: "bg-orange-50" },
  { icon: RotateCcw, title: "Free Cancellation", desc: "Batal gratis hingga H-1", color: "text-green-600", bg: "bg-green-50" },
  { icon: CreditCard, title: "Pay Later", desc: "Bayar saat check-in", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Shield, title: "Booking Aman", desc: "Data & pembayaran terenkripsi", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Clock, title: "Konfirmasi Instan", desc: "Voucher langsung diterima", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: Headphones, title: "Support 24/7", desc: "Tim kami siap membantu", color: "text-red-600", bg: "bg-red-50" },
];

export default function HotelFeatures() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Kenapa Booking di mcTour?</h2>
      <p className="text-xs text-muted mb-4">Keuntungan booking hotel bersama kami</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((item, i) => (
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

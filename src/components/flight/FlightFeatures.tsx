"use client";
import { motion } from "framer-motion";
import { Shield, CreditCard, RotateCcw, Zap, BadgePercent, Headphones } from "lucide-react";

const features = [
  { icon: BadgePercent, title: "Harga Termurah", desc: "Bandingkan semua maskapai", color: "text-[#FF7A00]", bg: "bg-orange-50" },
  { icon: Zap, title: "Booking Instan", desc: "E-ticket langsung diterima", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: RotateCcw, title: "Reschedule Mudah", desc: "Ubah jadwal tanpa ribet", color: "text-green-600", bg: "bg-green-50" },
  { icon: Shield, title: "Pembayaran Aman", desc: "Terenkripsi & terlindungi", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: CreditCard, title: "Bayar Fleksibel", desc: "Kartu kredit, e-wallet, VA", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: Headphones, title: "CS 24/7", desc: "Bantuan kapan saja", color: "text-red-600", bg: "bg-red-50" },
];

export default function FlightFeatures() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="px-4 py-6">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Kenapa Booking di mcTour?</h2>
      <p className="text-xs text-muted mb-4">Keuntungan beli tiket pesawat di sini</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass-card p-3">
            <div className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center mb-2`}><f.icon size={16} className={f.color} /></div>
            <h3 className="text-[11px] font-bold text-dark-text">{f.title}</h3>
            <p className="text-[9px] text-muted mt-0.5">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Plane, Building, UtensilsCrossed, ShieldCheck, Droplets, Shirt, Stethoscope, BookOpen } from "lucide-react";

const facilities = [
  { icon: Plane, title: "Penerbangan", desc: "Garuda Indonesia / Saudi Airlines", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Building, title: "Hotel", desc: "Bintang 3-5, dekat Masjid", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: UtensilsCrossed, title: "Makan", desc: "3x sehari menu Indonesia & Arab", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: ShieldCheck, title: "Asuransi", desc: "Asuransi perjalanan & kesehatan", color: "text-green-600", bg: "bg-green-50" },
  { icon: Droplets, title: "Air Zamzam", desc: "5-20 liter sesuai paket", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: Shirt, title: "Perlengkapan", desc: "Koper, ihram/mukena, buku doa", color: "text-pink-600", bg: "bg-pink-50" },
  { icon: Stethoscope, title: "Kesehatan", desc: "Pendamping medis & P3K", color: "text-red-600", bg: "bg-red-50" },
  { icon: BookOpen, title: "Bimbingan", desc: "Manasik 3-5x sebelum berangkat", color: "text-amber-600", bg: "bg-amber-50" },
];

export default function Facilities() {
  return (
    <section className="px-4 py-8 bg-gradient-to-b from-[#1B5E20]/[0.02] to-transparent rounded-3xl mx-2">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Fasilitas
      </h2>
      <p className="text-xs text-muted mb-4">Semua kebutuhan ibadah Anda terpenuhi</p>

      <div className="grid grid-cols-2 gap-3">
        {facilities.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="glass-card p-3 active:scale-[0.97] transition-transform"
          >
            <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-2`}>
              <item.icon size={18} className={item.color} />
            </div>
            <h3 className="text-[11px] font-bold text-dark-text">{item.title}</h3>
            <p className="text-[9px] text-muted mt-0.5">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

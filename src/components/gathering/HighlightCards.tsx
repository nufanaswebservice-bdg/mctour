"use client";

import { motion } from "framer-motion";
import { Building2, Users, Heart, Tent, Trophy, Sparkles, UtensilsCrossed, School, Flame, Crown } from "lucide-react";

const highlights = [
  { icon: Building2, title: "Company Gathering", desc: "Acara gathering perusahaan premium", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Heart, title: "Family Gathering", desc: "Quality time keluarga besar", color: "text-pink-600", bg: "bg-pink-50" },
  { icon: Users, title: "Employee Gathering", desc: "Apresiasi & bonding karyawan", color: "text-green-600", bg: "bg-green-50" },
  { icon: Tent, title: "Outbound", desc: "Aktivitas outdoor team building", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Trophy, title: "Team Building", desc: "Games & challenge kompak tim", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Sparkles, title: "Amazing Race", desc: "Kompetisi seru antar tim", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: UtensilsCrossed, title: "Gala Dinner", desc: "Makan malam eksklusif & elegant", color: "text-red-600", bg: "bg-red-50" },
  { icon: Crown, title: "Leadership Camp", desc: "Program kepemimpinan intensif", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: School, title: "School Trip", desc: "Wisata edukasi pelajar", color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: Flame, title: "Community Gathering", desc: "Event komunitas & organisasi", color: "text-teal-600", bg: "bg-teal-50" },
];

export default function HighlightCards() {
  return (
    <section className="px-4 py-8 -mt-8 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-4"
      >
        Layanan Gathering
      </motion.h2>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x-mandatory pb-2">
        {highlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex-shrink-0 w-[140px] snap-start"
          >
            <div className="glass-card p-4 text-center h-full hover:shadow-lg hover:shadow-[#0057B8]/5 transition-all active:scale-95">
              <div className={`w-11 h-11 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-2`}>
                <item.icon size={20} className={item.color} />
              </div>
              <h3 className="text-[11px] font-bold text-dark-text leading-tight">{item.title}</h3>
              <p className="text-[9px] text-muted mt-0.5 leading-tight">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  { icon: "💰", title: "Harga Transparan", desc: "Tanpa biaya tersembunyi, semuanya jelas dari awal" },
  { icon: "🚗", title: "Driver Profesional", desc: "Pengemudi berpengalaman dan ramah" },
  { icon: "👥", title: "Tim Tour Berpengalaman", desc: "Tour leader terlatih & sertifikasi" },
  { icon: "🇮🇩", title: "Layanan Seluruh Indonesia", desc: "Menjangkau seluruh destinasi Nusantara" },
  { icon: "📱", title: "Booking Mudah via WhatsApp", desc: "Cukup chat, kami siap melayani" },
  { icon: "🕐", title: "Customer Support 24 Jam", desc: "Tim kami siap membantu kapan saja" },
  { icon: "⏰", title: "Tepat Waktu", desc: "Komitmen jadwal yang kami jaga" },
  { icon: "🛡️", title: "Aman & Terpercaya", desc: "Asuransi perjalanan & standar keselamatan" },
  { icon: "✨", title: "Armada Bersih", desc: "Kendaraan terawat & selalu bersih" },
  { icon: "📋", title: "Legalitas Perusahaan", desc: "Terdaftar resmi & berizin lengkap" },
];

export default function WhyChooseUs() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Mengapa Memilih mcTour?"
        subtitle="10 alasan kenapa ribuan pelanggan mempercayakan perjalanan mereka kepada kami"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="glass-card p-5 text-center group cursor-pointer hover:bg-white/90 transition-all duration-300"
          >
            <motion.div
              className="text-3xl mb-3"
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              {reason.icon}
            </motion.div>
            <h3 className="text-sm font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
              {reason.title}
            </h3>
            <p className="text-xs text-dark-text/50 leading-relaxed">
              {reason.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

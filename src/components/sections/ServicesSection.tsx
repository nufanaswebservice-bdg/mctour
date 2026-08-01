"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    icon: "✈️",
    title: "Tiket Pesawat",
    description: "Booking tiket pesawat domestik & internasional dengan harga terbaik.",
  },
  {
    icon: "🏖️",
    title: "Paket Tour",
    description: "Paket wisata domestik & internasional lengkap dengan akomodasi.",
  },
  {
    icon: "🏕️",
    title: "Outbound",
    description: "Program outbound seru untuk team building perusahaan Anda.",
  },
  {
    icon: "🕋",
    title: "Umroh & Haji",
    description: "Perjalanan ibadah ke Tanah Suci dengan pembimbing berpengalaman.",
  },
  {
    icon: "📄",
    title: "Dokumen Perjalanan",
    description: "Pengurusan paspor, visa, KITAS, dan dokumen travel lainnya.",
  },
  {
    icon: "🎉",
    title: "Event Organizer",
    description: "Penyelenggara gathering, family day, dan corporate event.",
  },
];

export default function ServicesSection() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Layanan Kami"
        subtitle="Solusi lengkap untuk segala kebutuhan perjalanan dan event Anda"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl mb-4">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-dark-text/60 leading-relaxed">
              {service.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
              <span>Selengkapnya</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

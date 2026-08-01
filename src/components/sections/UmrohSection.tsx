"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const packages = [
  {
    title: "Paket Reguler",
    price: "Rp 28.000.000",
    duration: "9 Hari",
    airline: "Saudi Airlines",
    hotel: "Hotel Bintang 3",
    features: ["Makan 3x", "Pembimbing", "Handling", "Perlengkapan"],
    popular: false,
  },
  {
    title: "Paket Plus",
    price: "Rp 35.000.000",
    duration: "9 Hari",
    airline: "Garuda Indonesia",
    hotel: "Hotel Bintang 4",
    features: ["Makan 3x", "Pembimbing Senior", "City Tour", "Laundry"],
    popular: true,
  },
  {
    title: "Paket VIP",
    price: "Rp 55.000.000",
    duration: "12 Hari",
    airline: "Garuda Indonesia",
    hotel: "Hotel Bintang 5 (Dekat Masjid)",
    features: ["Makan 3x Buffet", "Pembimbing Ustadz", "Private Transport", "Souvenir Premium"],
    popular: false,
  },
];

export default function UmrohSection() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Umroh & Haji"
        subtitle="Perjalanan ibadah dengan pelayanan terbaik dan pembimbing berpengalaman"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
            className={`glass-card p-6 relative overflow-hidden ${
              pkg.popular ? "ring-2 ring-primary shadow-xl shadow-primary/10" : ""
            }`}
          >
            {pkg.popular && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                Populer
              </div>
            )}

            <div className="text-center mb-6">
              <span className="text-4xl">🕋</span>
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text mt-3">
                {pkg.title}
              </h3>
              <p className="text-3xl font-bold text-primary font-[family-name:var(--font-heading)] mt-2">
                {pkg.price}
              </p>
              <p className="text-sm text-dark-text/50">/ orang</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-dark-text/70">
                <span>📅</span> {pkg.duration}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-text/70">
                <span>✈️</span> {pkg.airline}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-text/70">
                <span>🏨</span> {pkg.hotel}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {pkg.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-dark-text/60">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo%20mcTour%2C%20saya%20tertarik%20paket%20umroh."
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                pkg.popular
                  ? "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30"
                  : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }`}
            >
              Daftar Sekarang
            </a>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

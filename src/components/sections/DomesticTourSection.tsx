"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const tours = [
  {
    id: 1,
    title: "Bali Paradise Tour",
    image: "/images/tours/bali.jpg",
    duration: "4 Hari 3 Malam",
    price: "Rp 2.500.000",
    rating: 4.9,
    badge: "Best Seller",
    facilities: ["Hotel", "Transport", "Makan", "Guide"],
  },
  {
    id: 2,
    title: "Lombok Adventure",
    image: "/images/tours/lombok.jpg",
    duration: "3 Hari 2 Malam",
    price: "Rp 2.200.000",
    rating: 4.8,
    badge: "Popular",
    facilities: ["Hotel", "Transport", "Makan", "Snorkeling"],
  },
  {
    id: 3,
    title: "Jogja Heritage",
    image: "/images/tours/jogja.jpg",
    duration: "3 Hari 2 Malam",
    price: "Rp 1.800.000",
    rating: 4.9,
    badge: "Best Seller",
    facilities: ["Hotel", "Transport", "Makan", "Tiket Wisata"],
  },
  {
    id: 4,
    title: "Dieng Plateau",
    image: "/images/tours/dieng.jpg",
    duration: "2 Hari 1 Malam",
    price: "Rp 1.200.000",
    rating: 4.7,
    badge: null,
    facilities: ["Hotel", "Transport", "Makan"],
  },
  {
    id: 5,
    title: "Bromo Sunrise",
    image: "/images/tours/bromo.jpg",
    duration: "2 Hari 1 Malam",
    price: "Rp 1.500.000",
    rating: 4.8,
    badge: "Popular",
    facilities: ["Hotel", "Jeep", "Makan", "Guide"],
  },
];

export default function DomesticTourSection() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Paket Tour Domestik"
        subtitle="Jelajahi keindahan Indonesia dengan paket tour terbaik kami"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
              {tour.badge && (
                <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-secondary text-white text-xs font-semibold">
                  {tour.badge}
                </span>
              )}
              <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                <span className="text-yellow-500 text-xs">⭐</span>
                <span className="text-xs font-semibold">{tour.rating}</span>
              </div>
              {/* Placeholder for image */}
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-5xl opacity-50">🏝️</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-2">
                {tour.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-dark-text/60 mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tour.duration}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tour.facilities.map((f) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 rounded-md bg-primary/5 text-primary text-xs font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-dark-text/50">Mulai dari</p>
                  <p className="text-lg font-bold text-primary font-[family-name:var(--font-heading)]">
                    {tour.price}
                  </p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                  Detail
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <a
          href="/paket-tour-domestik"
          className="btn-primary inline-flex items-center gap-2"
        >
          Lihat Semua Paket
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </AnimatedSection>
  );
}

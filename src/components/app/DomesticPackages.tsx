"use client";

import { motion } from "framer-motion";
import { Star, MapPin, ChevronRight } from "lucide-react";

const packages = [
  { id: 1, name: "Bali Paradise", location: "Bali", rating: 4.9, price: "2.5jt", originalPrice: "3.2jt", duration: "4D3N", emoji: "🏝️", badge: "Best Seller" },
  { id: 2, name: "Jogja Heritage", location: "Yogyakarta", rating: 4.9, price: "1.8jt", originalPrice: "2.3jt", duration: "3D2N", emoji: "🏯", badge: "Popular" },
  { id: 3, name: "Bromo Sunrise", location: "Jawa Timur", rating: 4.8, price: "1.5jt", originalPrice: "1.9jt", duration: "2D1N", emoji: "🌋", badge: null },
  { id: 4, name: "Lombok Adventure", location: "NTB", rating: 4.8, price: "2.2jt", originalPrice: "2.8jt", duration: "3D2N", emoji: "🏖️", badge: "New" },
  { id: 5, name: "Dieng Plateau", location: "Jawa Tengah", rating: 4.7, price: "1.2jt", originalPrice: "1.5jt", duration: "2D1N", emoji: "🌄", badge: null },
];

export default function DomesticPackages() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="py-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Paket Tour Domestik
          </h2>
          <p className="text-xs text-muted mt-0.5">Jelajahi keindahan Indonesia</p>
        </div>
        <button className="flex items-center gap-1 text-primary text-xs font-semibold active:opacity-70">
          Lihat Semua <ChevronRight size={14} />
        </button>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 snap-x-mandatory">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex-shrink-0 w-[200px] md:w-[220px] snap-start"
          >
            <div className="glass-card overflow-hidden active:scale-[0.98] transition-transform">
              {/* Image */}
              <div className="relative h-32 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                <span className="text-5xl">{pkg.emoji}</span>
                {pkg.badge && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-secondary text-white text-[10px] font-bold">
                    {pkg.badge}
                  </span>
                )}
                <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold">{pkg.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-dark-text font-[family-name:var(--font-heading)] truncate">
                  {pkg.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={11} className="text-muted" />
                  <span className="text-[11px] text-muted">{pkg.location}</span>
                  <span className="text-[11px] text-muted ml-auto">{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted line-through">Rp {pkg.originalPrice}</span>
                  <span className="text-sm font-bold text-primary">Rp {pkg.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

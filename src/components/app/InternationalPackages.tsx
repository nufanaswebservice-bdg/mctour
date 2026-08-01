"use client";

import { motion } from "framer-motion";
import { Star, ChevronRight } from "lucide-react";

const packages = [
  { id: 1, name: "Bangkok Exotic", flag: "🇹🇭", rating: 4.9, price: "5.5jt", duration: "4D3N", airline: "Thai Airways" },
  { id: 2, name: "Korea Autumn", flag: "🇰🇷", rating: 4.9, price: "15jt", duration: "6D5N", airline: "Korean Air" },
  { id: 3, name: "Japan Sakura", flag: "🇯🇵", rating: 4.9, price: "22jt", duration: "7D6N", airline: "ANA" },
  { id: 4, name: "China Discovery", flag: "🇨🇳", rating: 4.8, price: "9.8jt", duration: "5D4N", airline: "China Southern" },
  { id: 5, name: "Europe Wonder", flag: "🇪🇺", rating: 4.9, price: "35jt", duration: "10D9N", airline: "Emirates" },
];

export default function InternationalPackages() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="py-5"
    >
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Tour Luar Negeri
          </h2>
          <p className="text-xs text-muted mt-0.5">Eksplorasi dunia bersama kami</p>
        </div>
        <button className="flex items-center gap-1 text-primary text-xs font-semibold active:opacity-70">
          Lihat Semua <ChevronRight size={14} />
        </button>
      </div>

      {/* Horizontal cards */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 snap-x-mandatory">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
          >
            <div className="glass-card p-4 active:scale-[0.98] transition-transform h-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{pkg.flag}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-dark-text font-[family-name:var(--font-heading)]">
                    {pkg.name}
                  </h3>
                  <p className="text-[11px] text-muted">{pkg.duration} · {pkg.airline}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">{pkg.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-primary/5">
                <div>
                  <p className="text-[10px] text-muted">Mulai dari</p>
                  <p className="text-base font-bold text-primary font-[family-name:var(--font-heading)]">
                    Rp {pkg.price}
                  </p>
                </div>
                <a
                  href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20tertarik%20paket%20${encodeURIComponent(pkg.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold active:scale-95 transition-transform"
                >
                  Booking
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

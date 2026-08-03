"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock, Users, ChevronRight } from "lucide-react";

const packages = [
  { id: 1, name: "Silver Package", location: "Bogor / Puncak", duration: "1 Hari", minPax: "30 orang", price: "Rp 350.000", priceNote: "/orang", rating: 4.8, reviews: 124, badge: null, activities: ["Ice Breaking", "Fun Games", "Lunch", "Doorprize"] },
  { id: 2, name: "Gold Package", location: "Bandung / Lembang", duration: "2H1M", minPax: "50 orang", price: "Rp 750.000", priceNote: "/orang", rating: 4.9, reviews: 287, badge: "Best Seller", activities: ["Outbound", "Team Building", "BBQ Dinner", "Campfire", "Games"] },
  { id: 3, name: "Platinum Package", location: "Bali / Lombok", duration: "3H2M", minPax: "30 orang", price: "Rp 2.500.000", priceNote: "/orang", rating: 4.9, reviews: 156, badge: "Premium", activities: ["Resort Stay", "Amazing Race", "Gala Dinner", "Watersport", "Team Building"] },
  { id: 4, name: "Diamond Package", location: "Labuan Bajo", duration: "4H3M", minPax: "20 orang", price: "Rp 5.500.000", priceNote: "/orang", rating: 5.0, reviews: 89, badge: "Exclusive", activities: ["Live on Board", "Snorkeling", "Island Hopping", "Sunset Dinner", "Private Beach"] },
];

export default function PackageSection() {
  return (
    <section id="paket" className="px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">Paket Gathering</h2>
          <p className="text-xs text-muted mt-0.5">Pilih paket sesuai kebutuhan</p>
        </div>
      </div>

      <div className="space-y-4">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card overflow-hidden active:scale-[0.99] transition-transform"
          >
            {/* Top color bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#0057B8] to-[#00B4D8]" />

            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-dark-text font-[family-name:var(--font-heading)]">{pkg.name}</h3>
                    {pkg.badge && (
                      <span className="px-2 py-0.5 rounded-lg bg-[#FFD166] text-[#0057B8] text-[9px] font-bold">{pkg.badge}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-muted">
                    <span className="flex items-center gap-0.5"><MapPin size={10} /> {pkg.location}</span>
                    <span className="flex items-center gap-0.5"><Clock size={10} /> {pkg.duration}</span>
                    <span className="flex items-center gap-0.5"><Users size={10} /> Min. {pkg.minPax}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">{pkg.rating}</span>
                  <span className="text-[10px] text-muted">({pkg.reviews})</span>
                </div>
              </div>

              {/* Activities */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pkg.activities.map((a) => (
                  <span key={a} className="px-2 py-0.5 rounded-lg bg-[#0057B8]/5 text-[#0057B8] text-[10px] font-medium">{a}</span>
                ))}
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-3 border-t border-[#0057B8]/5">
                <div>
                  <p className="text-[10px] text-muted">Mulai dari</p>
                  <p className="text-lg font-bold text-[#0057B8] font-[family-name:var(--font-heading)]">
                    {pkg.price}<span className="text-xs font-normal text-muted">{pkg.priceNote}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20tertarik%20${encodeURIComponent(pkg.name)}%20gathering.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-green-500 text-white text-[11px] font-bold active:scale-95 transition-transform"
                  >
                    WhatsApp
                  </a>
                  <button className="px-3 py-2 rounded-xl bg-[#0057B8] text-white text-[11px] font-bold active:scale-95 transition-transform">
                    Booking
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

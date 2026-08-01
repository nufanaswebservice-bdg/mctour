"use client";

import { motion } from "framer-motion";
import { Star, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Budi S.", role: "HR Manager", review: "Gathering perusahaan berjalan lancar. Pelayanan luar biasa!", rating: 5, avatar: "BS" },
  { name: "Siti N.", role: "Ibu Rumah Tangga", review: "Liburan keluarga ke Bali sangat menyenangkan. Recommended!", rating: 5, avatar: "SN" },
  { name: "Ahmad R.", role: "CEO Startup", review: "Team building di Puncak sangat berkesan. Tim jadi kompak!", rating: 5, avatar: "AR" },
  { name: "Diana P.", role: "Traveler", review: "Tour Korea sangat well-organized. Hotel bagus, itinerary pas!", rating: 5, avatar: "DP" },
  { name: "Hendra W.", role: "Direktur", review: "Sudah 3x pakai mcTour. Selalu puas. Harga kompetitif.", rating: 5, avatar: "HW" },
];

export default function Testimonials() {
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
            Kata Mereka
          </h2>
          <p className="text-xs text-muted mt-0.5">Testimoni pelanggan kami</p>
        </div>
        <button className="flex items-center gap-1 text-primary text-xs font-semibold active:opacity-70">
          Semua <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 snap-x-mandatory">
        {testimonials.map((t) => (
          <div key={t.name} className="flex-shrink-0 w-[260px] md:w-[280px] snap-start">
            <div className="glass-card p-4 h-full">
              {/* Stars */}
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Review */}
              <p className="text-xs text-dark-text/70 leading-relaxed mb-3 line-clamp-3">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 pt-3 border-t border-primary/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-dark-text">{t.name}</p>
                  <p className="text-[10px] text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

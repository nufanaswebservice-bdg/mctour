"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "PT Bank Mandiri", person: "Budi HR", rating: 5, review: "Gathering 200 karyawan berjalan sempurna. Sangat profesional dan well-organized!", avatar: "BM" },
  { name: "PT Telkom", person: "Sari Admin", rating: 5, review: "Team building di Bandung luar biasa seru. Semua peserta antusias. Tim mcTour the best!", avatar: "TK" },
  { name: "PT Astra", person: "Rudi GA", rating: 5, review: "Sudah 4x pakai mcTour untuk event kantor. Selalu puas, harga fair, pelayanan top!", avatar: "AS" },
  { name: "Sekolah Al-Azhar", person: "Bu Dewi", rating: 5, review: "Study tour 300 siswa aman dan menyenangkan. Anak-anak sangat senang. Terima kasih!", avatar: "AA" },
  { name: "PT Unilever", person: "Diana HR", rating: 5, review: "Amazing race paling seru yang pernah kami ikuti. Konsep kreatif dan inovatif!", avatar: "UL" },
];

export default function TestimonialSlider() {
  return (
    <section className="py-8">
      <div className="px-4 mb-4">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">Testimoni</h2>
        <p className="text-xs text-muted mt-0.5">Apa kata klien tentang kami</p>
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-2 snap-x-mandatory">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 w-[270px] snap-start"
          >
            <div className="glass-card p-4 h-full border border-[#0057B8]/5">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-xs text-dark-text/70 leading-relaxed mb-3 line-clamp-3">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-[#0057B8]/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057B8] to-[#00B4D8] flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-dark-text">{t.name}</p>
                  <p className="text-[9px] text-muted">{t.person}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "H. Ahmad S.", review: "Alhamdulillah umroh bersama mcTour sangat nyaman. Hotel dekat, pembimbing sabar dan ilmunya banyak. Insya Allah tahun depan berangkat lagi.", rating: 5 },
  { name: "Hj. Fatimah", review: "Pelayanan luar biasa dari awal sampai akhir. Makan enak, hotel bersih, dan bimbingan manasiknya sangat membantu.", rating: 5 },
  { name: "Keluarga Bpk. Dodi", review: "Berangkat sekeluarga 6 orang. Semuanya ditangani dengan baik. Anak-anak juga senang. Terima kasih mcTour!", rating: 5 },
  { name: "Ibu Yuni", review: "Sudah 2x umroh bareng mcTour. Yang pertama reguler, kedua VIP. Dua-duanya memuaskan. Recommended banget!", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-8">
      <div className="px-4 mb-4">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">Testimoni Jamaah</h2>
        <p className="text-xs text-muted mt-0.5">Cerita jamaah yang sudah berangkat</p>
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 snap-x-mandatory">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex-shrink-0 w-[260px] snap-start"
          >
            <div className="glass-card p-4 h-full border border-[#1B5E20]/5">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={11} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-[11px] text-dark-text/70 leading-relaxed mb-3 line-clamp-4">&ldquo;{t.review}&rdquo;</p>
              <p className="text-[11px] font-bold text-dark-text pt-2 border-t border-[#1B5E20]/5">{t.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

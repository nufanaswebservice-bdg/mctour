"use client";

import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative h-[85vh] min-h-[500px] max-h-[700px] overflow-hidden rounded-b-[32px]">
      {/* Background slideshow simulation with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0057B8] via-[#003F8A] to-[#001F4D]" />
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-gathering.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0057B8]/90 via-[#0057B8]/40 to-[#0057B8]/20" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#00B4D8]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-10 w-40 h-40 bg-[#FFD166]/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-5 pb-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#FFD166] text-[11px] font-bold mb-4 border border-white/10">
            ⭐ #1 Event Organizer Partner
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight mb-3">
            Corporate Gathering<br />
            <span className="text-[#00B4D8]">&amp; Team Building</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed mb-6">
            Ciptakan kebersamaan tim dengan pengalaman gathering terbaik. 500+ event sukses, 30.000+ peserta puas.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20konsultasi%20gathering."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-[#FFD166] text-[#0057B8] font-bold text-sm shadow-lg shadow-[#FFD166]/30 active:scale-95 transition-transform"
            >
              Konsultasi Sekarang
            </a>
            <a
              href="#paket"
              className="px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm text-white font-semibold text-sm border border-white/20 active:scale-95 transition-transform"
            >
              Lihat Paket
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative h-[75vh] min-h-[450px] max-h-[650px] overflow-hidden rounded-b-[32px]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#004D40]" />
      <div className="absolute inset-0 opacity-20 bg-[url('/banner-umroh.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/90 via-[#1B5E20]/30 to-transparent" />

      {/* Decorative */}
      <div className="absolute top-16 right-8 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-8 w-40 h-40 bg-[#FFD700]/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-5 pb-10 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-[11px] font-bold mb-4 border border-[#FFD700]/20">
            🕋 Izin Resmi Kemenag RI
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight mb-3">
            Umroh &amp; Haji<br />
            <span className="text-[#FFD700]">Plus</span>
          </h1>
          <p className="text-white/70 text-sm max-w-md leading-relaxed mb-6">
            Perjalanan ibadah dengan pelayanan terbaik, pembimbing berpengalaman, hotel dekat Masjidil Haram, dan maskapai premium.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20info%20paket%20umroh."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-[#FFD700] text-[#1B5E20] font-bold text-sm shadow-lg shadow-[#FFD700]/30 active:scale-95 transition-transform"
            >
              Daftar Sekarang
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

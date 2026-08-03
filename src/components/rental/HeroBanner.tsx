"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative h-[55vh] min-h-[320px] max-h-[450px] overflow-hidden rounded-b-[32px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#0d47a1]" />
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-rental.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e]/90 via-[#1a237e]/40 to-[#1a237e]/20" />

      {/* Decorative */}
      <div className="absolute top-16 right-6 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl" />
      <div className="absolute bottom-16 left-6 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl" />

      <div className="relative h-full flex flex-col justify-end px-5 pb-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Car size={16} className="text-white" />
            </div>
            <span className="text-[11px] text-white/70 font-medium">mcTour & Travel</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight mb-2">
            Rental Mobil<br /><span className="text-blue-300">&amp; Bus</span>
          </h1>
          <p className="text-white/60 text-xs max-w-sm leading-relaxed mb-5">
            Sewa mobil & bus pariwisata dengan harga terbaik. Armada bersih, driver profesional, booking mudah.
          </p>
          <div className="flex gap-2">
            <a href="#armada" className="px-4 py-2.5 rounded-xl bg-white text-[#1a237e] text-xs font-bold active:scale-95 transition-transform shadow-lg">
              Lihat Armada
            </a>
            <a
              href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20rental%20kendaraan."
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-xs font-semibold border border-white/20 active:scale-95 transition-transform"
            >
              Hubungi Admin
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

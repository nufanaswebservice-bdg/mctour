"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative h-[40vh] min-h-[240px] max-h-[320px] overflow-hidden rounded-b-[32px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0057B8] via-[#1565C0] to-[#0D47A1]" />
      <div className="absolute inset-0 opacity-10 bg-[url('/bg-hero.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0057B8]/80 to-transparent" />
      <div className="absolute top-12 right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

      <div className="relative h-full flex flex-col justify-end px-5 pb-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Plane size={16} className="text-white/70" />
            <span className="text-[11px] text-white/60 font-medium">Flight Booking</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-heading)] leading-tight mb-1">
            Tiket <span className="text-[#FF7A00]">Pesawat</span>
          </h1>
          <p className="text-white/60 text-xs max-w-sm">
            Cari penerbangan termurah ke seluruh dunia. Semua maskapai, harga terbaik.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

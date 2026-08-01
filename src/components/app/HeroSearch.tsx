"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Users } from "lucide-react";

export default function HeroSearch() {
  return (
    <section className="relative px-4 pt-2 pb-6 overflow-hidden">
      {/* Gradient background blobs */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-secondary/10 rounded-full blur-3xl" />

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative mb-5"
      >
        <p className="text-muted text-sm font-medium">Hai, Selamat Datang 👋</p>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-dark-text mt-1">
          Mau Liburan <span className="gradient-text">Kemana?</span>
        </h1>
      </motion.div>

      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="relative glass-card p-4 space-y-3"
      >
        {/* Destination */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-background/80 border border-primary/5">
          <Search size={18} className="text-primary shrink-0" />
          <input
            type="text"
            placeholder="Cari destinasi, paket tour..."
            className="w-full bg-transparent outline-none text-sm text-dark-text placeholder:text-muted/60"
          />
        </div>

        {/* Date & People row */}
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 p-3 rounded-2xl bg-background/80 border border-primary/5">
            <Calendar size={16} className="text-primary shrink-0" />
            <span className="text-sm text-muted/60">Pilih tanggal</span>
          </div>
          <div className="flex-1 flex items-center gap-2 p-3 rounded-2xl bg-background/80 border border-primary/5">
            <Users size={16} className="text-primary shrink-0" />
            <span className="text-sm text-muted/60">Jumlah</span>
          </div>
        </div>

        {/* Search Button */}
        <button className="btn-primary w-full text-sm gap-2">
          <Search size={16} />
          Cari Paket Tour
        </button>
      </motion.div>
    </section>
  );
}

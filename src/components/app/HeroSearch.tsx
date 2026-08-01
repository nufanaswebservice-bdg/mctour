"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSearch() {
  return (
    <section className="relative px-4 pt-2 pb-4 overflow-hidden">
      {/* Gradient background blobs */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-secondary/10 rounded-full blur-3xl" />

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative mb-4"
      >
        <p className="text-muted text-sm font-medium">Hai, Selamat Datang 👋</p>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-dark-text mt-1">
          Mau Liburan <span className="gradient-text">Kemana?</span>
        </h1>
      </motion.div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/banner-mctour.png"
          alt="mcTour & Travel Banner"
          className="w-full h-auto rounded-3xl"
          loading="eager"
        />
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="mt-4"
      >
        <Link href="/paket-tour-domestik" className="btn-primary w-full text-sm">
          Cari Paket Tour
        </Link>
      </motion.div>
    </section>
  );
}

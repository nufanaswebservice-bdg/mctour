"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-6"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-light to-primary-dark p-6 text-center">
        {/* Decorative */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] mb-2">
            Siap Berangkat?
          </h2>
          <p className="text-white/70 text-xs mb-5 max-w-xs mx-auto">
            Dapatkan penawaran terbaik untuk perjalanan impian Anda. Chat kami sekarang!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary font-bold text-sm shadow-lg active:scale-95 transition-transform"
            >
              <MessageCircle size={18} className="text-green-500" />
              Chat WhatsApp
            </a>
            <a
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm text-white font-semibold text-sm border border-white/20 active:scale-95 transition-transform"
            >
              Booking Sekarang
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

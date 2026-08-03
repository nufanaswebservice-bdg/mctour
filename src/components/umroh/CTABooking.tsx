"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

export default function CTABooking() {
  return (
    <section className="px-4 py-6 mb-4">
      {/* CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#004D40] p-6 text-center relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#FFD700]/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <span className="text-3xl mb-2 block">🕋</span>
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] mb-2">
            Siap Berangkat Ibadah?
          </h2>
          <p className="text-white/70 text-xs mb-5 max-w-xs mx-auto">
            Daftarkan diri Anda sekarang. Konsultasi gratis, tanpa commitment.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20daftar%20umroh%2Fhaji.%20Mohon%20info%20jadwal%20dan%20harga."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#FFD700] text-[#1B5E20] font-bold text-sm shadow-lg active:scale-95 transition-transform"
            >
              <MessageCircle size={16} />
              Daftar via WhatsApp
            </a>
            <a
              href="tel:+62818548833"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm text-white font-semibold text-sm border border-white/20 active:scale-95 transition-transform"
            >
              <Phone size={16} />
              Hubungi 0818-548-833
            </a>
          </div>
        </div>
      </motion.div>

      {/* Sticky Booking Bar */}
      <div className="sticky bottom-20 md:bottom-4 z-30 mt-4">
        <div className="flex gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-[#1B5E20]/10">
          <div className="flex-1">
            <p className="text-[10px] text-muted">Umroh mulai</p>
            <p className="text-base font-bold text-[#1B5E20] font-[family-name:var(--font-heading)]">
              Rp 28jt<span className="text-[10px] font-normal text-muted">/jamaah</span>
            </p>
          </div>
          <a
            href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20daftar%20umroh."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-500 text-white text-xs font-bold active:scale-95 transition-transform"
          >
            <MessageCircle size={14} />
            Daftar
          </a>
          <a
            href="#paket"
            className="px-4 py-2.5 rounded-xl bg-[#1B5E20] text-white text-xs font-bold active:scale-95 transition-transform"
          >
            Lihat Paket
          </a>
        </div>
      </div>
    </section>
  );
}

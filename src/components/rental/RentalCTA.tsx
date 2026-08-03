"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Car } from "lucide-react";

export default function RentalCTA() {
  return (
    <section className="px-4 py-6 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#0d47a1] p-6 text-center relative overflow-hidden"
      >
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <Car size={28} className="text-blue-300 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-white font-[family-name:var(--font-heading)] mb-1">
            Butuh Bantuan Memilih?
          </h2>
          <p className="text-white/60 text-xs mb-5 max-w-xs mx-auto">
            Tim kami siap membantu Anda memilih kendaraan yang tepat sesuai kebutuhan dan budget.
          </p>
          <div className="flex flex-col gap-2">
            <a href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20butuh%20bantuan%20memilih%20rental%20kendaraan." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-[#1a237e] font-bold text-sm active:scale-95 transition-transform">
              <MessageCircle size={16} /> Chat WhatsApp
            </a>
            <a href="tel:+62818548833" className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/10 text-white font-semibold text-sm border border-white/20 active:scale-95 transition-transform">
              <Phone size={16} /> 0818-548-833
            </a>
          </div>
        </div>
      </motion.div>

      {/* Sticky bar */}
      <div className="sticky bottom-20 md:bottom-4 z-30 mt-4">
        <div className="flex gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-primary/10">
          <div className="flex-1">
            <p className="text-[10px] text-muted">Mulai dari</p>
            <p className="text-base font-bold text-primary font-[family-name:var(--font-heading)]">Rp 300rb<span className="text-[10px] font-normal text-muted">/hari</span></p>
          </div>
          <a href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20rental%20kendaraan." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-500 text-white text-xs font-bold active:scale-95 transition-transform">
            <MessageCircle size={14} /> Chat
          </a>
          <a href="#armada" className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold active:scale-95 transition-transform">
            Pilih Armada
          </a>
        </div>
      </div>
    </section>
  );
}

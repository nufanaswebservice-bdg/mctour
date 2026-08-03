"use client";

import { motion } from "framer-motion";
import { MessageCircle, Building } from "lucide-react";

export default function HotelCTA() {
  return (
    <section className="px-4 py-6 mb-4">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-gradient-to-br from-[#0057B8] via-[#1565C0] to-[#0D47A1] p-6 text-center relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#FF7A00]/10 rounded-full" />
        <div className="relative z-10">
          <Building size={28} className="text-blue-300 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-white font-[family-name:var(--font-heading)] mb-1">Butuh Bantuan?</h2>
          <p className="text-white/60 text-xs mb-5 max-w-xs mx-auto">Tim hotel specialist kami siap membantu Anda menemukan hotel terbaik.</p>
          <a href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20butuh%20bantuan%20booking%20hotel." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-[#0057B8] font-bold text-sm mx-auto max-w-xs active:scale-95 transition-transform">
            <MessageCircle size={16} /> Chat Hotel Specialist
          </a>
        </div>
      </motion.div>

      {/* Sticky */}
      <div className="sticky bottom-20 md:bottom-4 z-30 mt-4">
        <div className="flex gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-primary/10">
          <div className="flex-1">
            <p className="text-[10px] text-muted">Hotel mulai</p>
            <p className="text-base font-bold text-primary font-[family-name:var(--font-heading)]">Rp 350rb<span className="text-[10px] font-normal text-muted">/malam</span></p>
          </div>
          <a href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20booking%20hotel." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-500 text-white text-xs font-bold active:scale-95 transition-transform">
            <MessageCircle size={14} /> Chat
          </a>
          <a href="#" className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold active:scale-95 transition-transform">
            Cari Hotel
          </a>
        </div>
      </div>
    </section>
  );
}

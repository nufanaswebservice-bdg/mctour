"use client";

import { MessageCircle } from "lucide-react";

export default function StickyBooking() {
  return (
    <div className="sticky bottom-20 md:bottom-4 z-30 px-4 pt-3">
      <div className="flex gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-[#0057B8]/10">
        <div className="flex-1">
          <p className="text-[10px] text-muted">Mulai dari</p>
          <p className="text-base font-bold text-[#0057B8] font-[family-name:var(--font-heading)]">
            Rp 350rb<span className="text-[10px] font-normal text-muted">/orang</span>
          </p>
        </div>
        <a
          href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20konsultasi%20gathering."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-500 text-white text-xs font-bold active:scale-95 transition-transform shadow-sm"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        <button className="px-4 py-2.5 rounded-xl bg-[#0057B8] text-white text-xs font-bold active:scale-95 transition-transform shadow-sm">
          Booking
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/**
 * Booking.com Affiliate Widget Integration
 * 
 * Untuk mendapatkan Affiliate ID:
 * 1. Daftar di https://www.booking.com/affiliate-program.html
 * 2. Setelah approve, dapatkan Affiliate ID (aid)
 * 3. Ganti AFFILIATE_ID di bawah dengan ID Anda
 * 
 * Komisi: 25-40% dari fee Booking.com per booking
 */

const AFFILIATE_ID = "2607284"; // Ganti dengan affiliate ID Anda setelah daftar

export default function BookingWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Booking.com affiliate script
    const script = document.createElement("script");
    script.src = "https://www.booking.com/affiliate/script.html";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="booking.com/affiliate"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Booking Hotel Online
          </h2>
          <p className="text-xs text-muted mt-0.5">Powered by Booking.com — Harga terbaik, bayar di hotel</p>
        </div>
        <a
          href={`https://www.booking.com/index.html?aid=${AFFILIATE_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-primary font-semibold flex items-center gap-0.5"
        >
          Booking.com <ExternalLink size={10} />
        </a>
      </div>

      {/* Booking.com Search Widget */}
      <div className="glass-card p-4 rounded-3xl overflow-hidden">
        <div ref={widgetRef}>
          {/* Booking.com Searchbox Widget */}
          <ins
            className="bookingaff"
            data-aid={AFFILIATE_ID}
            data-target_aid={AFFILIATE_ID}
            data-prod="searchbox"
            data-width="100%"
            data-lang="id"
            data-dest_type="city"
            data-currency="IDR"
            data-checkin=""
            data-checkout=""
            data-num_adults="2"
            data-num_rooms="1"
            data-num_children="0"
          >
            {/* Fallback while loading */}
            <div className="space-y-3">
              <div className="skeleton h-12 w-full" />
              <div className="grid grid-cols-2 gap-2">
                <div className="skeleton h-10 w-full" />
                <div className="skeleton h-10 w-full" />
              </div>
              <div className="skeleton h-10 w-full" />
              <div className="skeleton h-12 w-full" />
            </div>
          </ins>
        </div>
      </div>

      {/* Direct Search Links by City */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-dark-text mb-3">Cari Hotel Populer:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { city: "Bali", dest_id: "-2701757" },
            { city: "Jakarta", dest_id: "-2679652" },
            { city: "Bandung", dest_id: "-2679013" },
            { city: "Yogyakarta", dest_id: "-2701944" },
            { city: "Surabaya", dest_id: "-2700856" },
            { city: "Malang", dest_id: "-2690783" },
            { city: "Singapore", dest_id: "-73635" },
            { city: "Bangkok", dest_id: "-3414440" },
          ].map((item) => (
            <a
              key={item.city}
              href={`https://www.booking.com/searchresults.html?aid=${AFFILIATE_ID}&ss=${encodeURIComponent(item.city)}&lang=id&selected_currency=IDR`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-primary/5 active:bg-primary/10 active:scale-[0.98] transition-all"
            >
              <span className="text-xs font-medium text-dark-text">{item.city}</span>
              <ExternalLink size={10} className="text-primary ml-auto" />
            </a>
          ))}
        </div>
      </div>

      {/* Deals Widget */}
      <div className="mt-6">
        <h3 className="text-sm font-bold font-[family-name:var(--font-heading)] text-dark-text mb-3">
          🔥 Deals Hari Ini
        </h3>
        <div className="rounded-3xl overflow-hidden border border-primary/5">
          <ins
            className="bookingaff"
            data-aid={AFFILIATE_ID}
            data-target_aid={AFFILIATE_ID}
            data-prod="dfl2"
            data-width="100%"
            data-lang="id"
            data-currency="IDR"
            data-dest_type="city"
            data-dest_id="-2701757"
            data-num_properties="4"
          >
            <div className="p-4 space-y-3">
              <div className="skeleton h-24 w-full" />
              <div className="skeleton h-24 w-full" />
            </div>
          </ins>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 rounded-2xl bg-blue-50/50 border border-blue-100">
        <p className="text-[10px] text-blue-800 leading-relaxed">
          💡 Anda akan diarahkan ke Booking.com untuk menyelesaikan pemesanan. Harga yang ditampilkan sudah termasuk pajak. Banyak hotel menawarkan gratis pembatalan dan bayar di hotel.
        </p>
      </div>
    </motion.section>
  );
}

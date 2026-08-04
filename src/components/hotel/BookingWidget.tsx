"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, MapPin } from "lucide-react";

/**
 * Booking.com Affiliate Integration - Fast Loading Version
 * Menggunakan direct affiliate links (tanpa widget script yang lambat)
 * 
 * Affiliate ID: 2607284 (ganti dengan ID Anda setelah daftar)
 * Komisi: 25-40% dari fee Booking.com
 */

const AFFILIATE_ID = "2607284";

const featuredHotels = [
  { name: "The Mulia Bali", location: "Nusa Dua, Bali", rating: 9.4, price: "2.850.000", discount: 32, stars: 5, search: "Nusa+Dua" },
  { name: "Padma Resort Ubud", location: "Ubud, Bali", rating: 9.2, price: "1.950.000", discount: 30, stars: 5, search: "Ubud" },
  { name: "Ayana Resort", location: "Jimbaran, Bali", rating: 9.3, price: "2.100.000", discount: 40, stars: 5, search: "Jimbaran" },
  { name: "The Trans Luxury", location: "Bandung", rating: 9.1, price: "1.200.000", discount: 33, stars: 5, search: "Bandung" },
  { name: "Hotel Tentrem", location: "Yogyakarta", rating: 9.5, price: "1.650.000", discount: 25, stars: 5, search: "Yogyakarta" },
  { name: "The Westin Jakarta", location: "Jakarta", rating: 8.9, price: "1.450.000", discount: 31, stars: 5, search: "Jakarta" },
];

const quickCities = [
  { city: "Bali", emoji: "🏝️" },
  { city: "Jakarta", emoji: "🏙️" },
  { city: "Bandung", emoji: "🏔️" },
  { city: "Yogyakarta", emoji: "🏯" },
  { city: "Singapore", emoji: "🇸🇬" },
  { city: "Bangkok", emoji: "🇹🇭" },
  { city: "Tokyo", emoji: "🇯🇵" },
  { city: "Seoul", emoji: "🇰🇷" },
];

export default function BookingWidget() {
  const affiliateLink = (search: string) =>
    `https://www.booking.com/searchresults.html?aid=${AFFILIATE_ID}&ss=${encodeURIComponent(search)}&lang=id&selected_currency=IDR`;

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
            Booking Hotel
          </h2>
          <p className="text-xs text-muted mt-0.5">Harga terbaik, bayar di hotel</p>
        </div>
        <a
          href={`https://www.booking.com/index.html?aid=${AFFILIATE_ID}&lang=id`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-primary font-semibold flex items-center gap-0.5"
        >
          Lihat Semua <ExternalLink size={10} />
        </a>
      </div>

      {/* Quick City Search */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 pb-1">
        {quickCities.map((item) => (
          <a
            key={item.city}
            href={affiliateLink(item.city)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-primary/5 whitespace-nowrap active:scale-95 transition-transform"
          >
            <span className="text-sm">{item.emoji}</span>
            <span className="text-[11px] font-medium text-dark-text">{item.city}</span>
          </a>
        ))}
      </div>

      {/* Hotel Cards - Instant Load */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featuredHotels.map((hotel, i) => (
          <motion.a
            key={hotel.name}
            href={affiliateLink(hotel.search)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-3 active:scale-[0.98] transition-transform block"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-dark-text truncate">{hotel.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={9} className="text-muted shrink-0" />
                  <span className="text-[10px] text-muted truncate">{hotel.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-primary/10 shrink-0 ml-2">
                <Star size={9} className="text-primary fill-primary" />
                <span className="text-[10px] font-bold text-primary">{hotel.rating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary">Rp {hotel.price}</span>
                <span className="text-[9px] text-muted ml-1">/malam</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 text-[9px] font-bold">-{hotel.discount}%</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Info */}
      <div className="mt-3 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
        <p className="text-[9px] text-blue-700 leading-relaxed text-center">
          💡 Klik hotel untuk melihat harga & ketersediaan di Booking.com. Gratis pembatalan & bayar di hotel.
        </p>
      </div>
    </motion.section>
  );
}

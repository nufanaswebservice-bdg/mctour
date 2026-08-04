"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star, MapPin, Heart } from "lucide-react";
import { useState } from "react";

const AFFILIATE_ID = "2607284";

const featuredHotels = [
  { name: "The Mulia Bali", location: "Nusa Dua, Bali", rating: 9.4, price: "2.850.000", originalPrice: "4.200.000", discount: 32, stars: 5, search: "Nusa+Dua", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop" },
  { name: "Padma Resort Ubud", location: "Ubud, Bali", rating: 9.2, price: "1.950.000", originalPrice: "2.800.000", discount: 30, stars: 5, search: "Ubud", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop" },
  { name: "Ayana Resort", location: "Jimbaran, Bali", rating: 9.3, price: "2.100.000", originalPrice: "3.500.000", discount: 40, stars: 5, search: "Jimbaran+Bali", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop" },
  { name: "The Trans Luxury", location: "Bandung", rating: 9.1, price: "1.200.000", originalPrice: "1.800.000", discount: 33, stars: 5, search: "Bandung", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop" },
  { name: "Hotel Tentrem", location: "Yogyakarta", rating: 9.5, price: "1.650.000", originalPrice: "2.200.000", discount: 25, stars: 5, search: "Yogyakarta", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop" },
  { name: "The Westin Jakarta", location: "Jakarta", rating: 8.9, price: "1.450.000", originalPrice: "2.100.000", discount: 31, stars: 5, search: "Jakarta", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop" },
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
  const [liked, setLiked] = useState<Record<string, boolean>>({});

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
          <p className="text-xs text-muted mt-0.5">Harga terbaik, gratis pembatalan</p>
        </div>
        <a
          href={`https://www.booking.com/index.html?aid=${AFFILIATE_ID}&lang=id`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-primary font-semibold flex items-center gap-0.5"
        >
          Semua <ExternalLink size={10} />
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

      {/* Hotel Cards with Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {featuredHotels.map((hotel, i) => (
          <motion.a
            key={hotel.name}
            href={affiliateLink(hotel.search)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card overflow-hidden active:scale-[0.98] transition-transform block"
          >
            {/* Image */}
            <div className="relative h-28 sm:h-32 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Discount badge */}
              <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-lg bg-red-500 text-white text-[9px] font-bold">
                -{hotel.discount}%
              </span>
              {/* Rating */}
              <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm">
                <Star size={9} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[9px] font-bold">{hotel.rating}</span>
              </div>
              {/* Wishlist */}
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked((p) => ({ ...p, [hotel.name]: !p[hotel.name] })); }}
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart size={12} className={liked[hotel.name] ? "text-red-500 fill-red-500" : "text-dark-text/30"} />
              </button>
            </div>

            {/* Content */}
            <div className="p-2.5">
              <h3 className="text-[11px] font-bold text-dark-text truncate">{hotel.name}</h3>
              <div className="flex items-center gap-0.5 mt-0.5">
                <MapPin size={8} className="text-muted" />
                <span className="text-[9px] text-muted truncate">{hotel.location}</span>
              </div>
              <div className="mt-1.5">
                <span className="text-[9px] text-muted line-through">Rp {hotel.originalPrice}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-primary">Rp {hotel.price}</span>
                  <span className="text-[8px] text-muted">/malam</span>
                </div>
              </div>
              <div className="flex gap-1 mt-1.5">
                <span className="px-1.5 py-0.5 rounded-md bg-green-50 text-green-700 text-[8px] font-medium">Free Cancel</span>
                <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[8px] font-medium">Bayar di Hotel</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Info */}
      <div className="mt-3 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
        <p className="text-[9px] text-blue-700 leading-relaxed text-center">
          💡 Klik hotel → lihat harga & ketersediaan di Booking.com. Gratis pembatalan & bayar di hotel.
        </p>
      </div>
    </motion.section>
  );
}

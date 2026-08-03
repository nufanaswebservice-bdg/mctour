"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, Fuel, Settings, Heart, MessageCircle } from "lucide-react";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/store";
import { getStoredAuth } from "@/lib/auth";
import { createBooking } from "@/lib/store";

const vehicles = [
  { id: "avanza", name: "Toyota Avanza", price: "350.000", capacity: 7, transmission: "Manual", fuel: "Bensin", category: "MPV", badge: null, rating: 4.8, reviews: 124 },
  { id: "new-avanza", name: "Toyota New Avanza", price: "400.000", capacity: 7, transmission: "Automatic", fuel: "Bensin", category: "MPV", badge: null, rating: 4.8, reviews: 98 },
  { id: "xenia", name: "Daihatsu Xenia", price: "350.000", capacity: 7, transmission: "Manual", fuel: "Bensin", category: "MPV", badge: null, rating: 4.7, reviews: 87 },
  { id: "innova-reborn", name: "Toyota Innova Reborn", price: "700.000", capacity: 7, transmission: "Automatic", fuel: "Solar", category: "MPV", badge: "Best Seller", rating: 4.9, reviews: 256 },
  { id: "innova-zenix", name: "Innova Zenix", price: "950.000", capacity: 7, transmission: "Automatic", fuel: "Bensin", category: "MPV", badge: "New", rating: 4.9, reviews: 67 },
  { id: "fortuner", name: "Toyota Fortuner", price: "1.600.000", capacity: 7, transmission: "Automatic", fuel: "Solar", category: "SUV", badge: "Luxury", rating: 4.9, reviews: 145 },
  { id: "pajero", name: "Mitsubishi Pajero Sport", price: "1.800.000", capacity: 7, transmission: "Automatic", fuel: "Solar", category: "SUV", badge: "Luxury", rating: 4.9, reviews: 112 },
  { id: "brio", name: "Honda Brio", price: "300.000", capacity: 5, transmission: "Automatic", fuel: "Bensin", category: "City Car", badge: null, rating: 4.7, reviews: 203 },
  { id: "hrv", name: "Honda HRV", price: "700.000", capacity: 5, transmission: "Automatic", fuel: "Bensin", category: "SUV", badge: null, rating: 4.8, reviews: 78 },
  { id: "alphard", name: "Toyota Alphard", price: "3.000.000", capacity: 7, transmission: "Automatic", fuel: "Bensin", category: "Luxury", badge: "Premium", rating: 5.0, reviews: 89 },
  { id: "hiace-commuter", name: "Toyota Hiace Commuter", price: "1.300.000", capacity: 15, transmission: "Manual", fuel: "Solar", category: "Hiace", badge: null, rating: 4.8, reviews: 167 },
  { id: "hiace-premio", name: "Hiace Premio", price: "1.500.000", capacity: 15, transmission: "Automatic", fuel: "Solar", category: "Hiace", badge: "Premium", rating: 4.9, reviews: 94 },
  { id: "elf-short", name: "Isuzu Elf Short", price: "1.200.000", capacity: 16, transmission: "Manual", fuel: "Solar", category: "Elf", badge: null, rating: 4.7, reviews: 132 },
  { id: "elf-long", name: "Isuzu Elf Long", price: "1.500.000", capacity: 20, transmission: "Manual", fuel: "Solar", category: "Elf", badge: null, rating: 4.8, reviews: 108 },
  { id: "medium-bus", name: "Medium Bus 31 Seat", price: "2.500.000", capacity: 31, transmission: "Manual", fuel: "Solar", category: "Bus", badge: null, rating: 4.8, reviews: 76 },
  { id: "big-bus", name: "Big Bus 50 Seat", price: "3.500.000", capacity: 50, transmission: "Manual", fuel: "Solar", category: "Bus", badge: "Popular", rating: 4.9, reviews: 143 },
  { id: "luxury-bus", name: "Luxury Bus 50 Seat", price: "5.500.000", capacity: 50, transmission: "Automatic", fuel: "Solar", category: "Bus", badge: "Exclusive", rating: 5.0, reviews: 54 },
];

const categories = ["Semua", "MPV", "SUV", "City Car", "Luxury", "Hiace", "Elf", "Bus"];

export default function VehicleGrid() {
  const [filter, setFilter] = useState("Semua");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [bookedMsg, setBookedMsg] = useState("");

  const filtered = filter === "Semua" ? vehicles : vehicles.filter((v) => v.category === filter);

  const toggleWishlist = (v: typeof vehicles[0]) => {
    if (wishlist[v.id] || isInWishlist(v.id)) {
      removeFromWishlist(v.id);
      setWishlist((p) => ({ ...p, [v.id]: false }));
    } else {
      addToWishlist({ id: v.id, name: v.name, price: `Rp ${v.price}/hari`, emoji: "🚗", type: "domestic" });
      setWishlist((p) => ({ ...p, [v.id]: true }));
    }
  };

  const handleBooking = (v: typeof vehicles[0]) => {
    const auth = getStoredAuth();
    if (!auth.isAuthenticated) {
      window.open(`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20rental%20${encodeURIComponent(v.name)}%20Rp${v.price}%2Fhari`, "_blank");
      return;
    }
    createBooking(`Rental ${v.name}`, `Rp ${v.price}/hari`, "Fleksibel", 1);
    setBookedMsg(`Booking ${v.name} berhasil! Cek Pembayaran.`);
    setTimeout(() => setBookedMsg(""), 3000);
  };

  const badgeColors: Record<string, string> = {
    "Best Seller": "bg-orange-500", "New": "bg-green-500", "Luxury": "bg-purple-500",
    "Premium": "bg-amber-500", "Popular": "bg-blue-500", "Exclusive": "bg-rose-500",
  };

  return (
    <section id="armada" className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Armada Kami</h2>
      <p className="text-xs text-muted mb-4">Pilih kendaraan sesuai kebutuhan</p>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
              filter === cat ? "bg-primary text-white shadow-sm" : "bg-primary/5 text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Booking success */}
      {bookedMsg && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-3 p-3 rounded-2xl bg-green-50 border border-green-100 text-xs text-green-700 font-medium">
          ✅ {bookedMsg}
        </motion.div>
      )}

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="glass-card p-4 active:scale-[0.99] transition-transform"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-dark-text">{v.name}</h3>
                  {v.badge && <span className={`px-1.5 py-0.5 rounded-md text-white text-[8px] font-bold ${badgeColors[v.badge] || "bg-gray-500"}`}>{v.badge}</span>}
                </div>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold">{v.rating}</span>
                  <span className="text-[10px] text-muted">({v.reviews})</span>
                </div>
              </div>
              <button onClick={() => toggleWishlist(v)} className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center active:scale-90 transition-transform">
                <Heart size={14} className={wishlist[v.id] || isInWishlist(v.id) ? "text-red-500 fill-red-500" : "text-red-300"} />
              </button>
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="flex items-center gap-1 text-[10px] text-muted"><Users size={10} /> {v.capacity} seat</span>
              <span className="flex items-center gap-1 text-[10px] text-muted"><Settings size={10} /> {v.transmission}</span>
              <span className="flex items-center gap-1 text-[10px] text-muted"><Fuel size={10} /> {v.fuel}</span>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-primary/5">
              <div>
                <p className="text-base font-bold text-primary font-[family-name:var(--font-heading)]">Rp {v.price}</p>
                <p className="text-[9px] text-muted">/hari (dengan driver)</p>
              </div>
              <div className="flex gap-1.5">
                <a
                  href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20rental%20${encodeURIComponent(v.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <MessageCircle size={14} className="text-green-600" />
                </a>
                <button
                  onClick={() => handleBooking(v)}
                  className="px-3 py-2 rounded-xl bg-primary text-white text-[10px] font-bold active:scale-95 transition-transform"
                >
                  Booking
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, Wifi, Car, Coffee, Waves, MessageCircle } from "lucide-react";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/store";
import { getStoredAuth, } from "@/lib/auth";
import { createBooking } from "@/lib/store";

const hotels = [
  { id: "h1", name: "The Mulia Resort & Villas", location: "Nusa Dua, Bali", star: 5, rating: 9.4, reviews: 2847, price: "2.850.000", originalPrice: "4.200.000", discount: 32, perNight: true, badge: "MC Choice", breakfast: true, freeCancellation: true, facilities: ["wifi", "pool", "parking", "coffee"] },
  { id: "h2", name: "Padma Resort Ubud", location: "Ubud, Bali", star: 5, rating: 9.2, reviews: 1923, price: "1.950.000", originalPrice: "2.800.000", discount: 30, perNight: true, badge: "Best Seller", breakfast: true, freeCancellation: true, facilities: ["wifi", "pool", "coffee"] },
  { id: "h3", name: "Ayana Resort Bali", location: "Jimbaran, Bali", star: 5, rating: 9.3, reviews: 3241, price: "2.100.000", originalPrice: "3.500.000", discount: 40, perNight: true, badge: "Flash Sale", breakfast: true, freeCancellation: false, facilities: ["wifi", "pool", "parking", "coffee"] },
  { id: "h4", name: "The Trans Luxury Hotel", location: "Bandung", star: 5, rating: 9.1, reviews: 1567, price: "1.200.000", originalPrice: "1.800.000", discount: 33, perNight: true, badge: "Top Rated", breakfast: true, freeCancellation: true, facilities: ["wifi", "pool", "parking"] },
  { id: "h5", name: "Hotel Tentrem Yogyakarta", location: "Yogyakarta", star: 5, rating: 9.5, reviews: 2134, price: "1.650.000", originalPrice: "2.200.000", discount: 25, perNight: true, badge: "Recommended", breakfast: true, freeCancellation: true, facilities: ["wifi", "pool", "parking", "coffee"] },
  { id: "h6", name: "The Westin Jakarta", location: "Jakarta Selatan", star: 5, rating: 8.9, reviews: 1876, price: "1.450.000", originalPrice: "2.100.000", discount: 31, perNight: true, badge: null, breakfast: false, freeCancellation: true, facilities: ["wifi", "pool", "parking"] },
  { id: "h7", name: "Villa Seminyak Estate", location: "Seminyak, Bali", star: 4, rating: 9.0, reviews: 892, price: "950.000", originalPrice: "1.400.000", discount: 32, perNight: true, badge: "Limited", breakfast: true, freeCancellation: false, facilities: ["wifi", "pool"] },
  { id: "h8", name: "Fairmont Jakarta", location: "Jakarta Pusat", star: 5, rating: 9.1, reviews: 1456, price: "1.800.000", originalPrice: "2.600.000", discount: 30, perNight: true, badge: null, breakfast: true, freeCancellation: true, facilities: ["wifi", "pool", "parking", "coffee"] },
];

const facilityIcons: Record<string, typeof Wifi> = { wifi: Wifi, pool: Waves, parking: Car, coffee: Coffee };

const badgeColors: Record<string, string> = {
  "MC Choice": "bg-primary text-white", "Best Seller": "bg-[#FF7A00] text-white", "Flash Sale": "bg-red-500 text-white",
  "Top Rated": "bg-green-600 text-white", "Recommended": "bg-purple-600 text-white", "Limited": "bg-amber-600 text-white",
};

export default function HotelGrid() {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [bookedMsg, setBookedMsg] = useState("");

  const toggleWishlist = (h: typeof hotels[0]) => {
    if (wishlist[h.id] || isInWishlist(h.id)) {
      removeFromWishlist(h.id);
      setWishlist((p) => ({ ...p, [h.id]: false }));
    } else {
      addToWishlist({ id: h.id, name: h.name, price: `Rp ${h.price}/malam`, emoji: "🏨", type: "domestic" });
      setWishlist((p) => ({ ...p, [h.id]: true }));
    }
  };

  const handleBook = (h: typeof hotels[0]) => {
    const auth = getStoredAuth();
    if (!auth.isAuthenticated) {
      window.open(`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20booking%20${encodeURIComponent(h.name)}`, "_blank");
      return;
    }
    createBooking(`Hotel: ${h.name}`, `Rp ${h.price}/malam`, "Fleksibel", 1);
    setBookedMsg(`Booking ${h.name} berhasil! Cek Pembayaran.`);
    setTimeout(() => setBookedMsg(""), 3000);
  };

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">Hotel Pilihan</h2>
          <p className="text-xs text-muted mt-0.5">Promo terbaik untuk Anda</p>
        </div>
      </div>

      {bookedMsg && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-3 p-3 rounded-2xl bg-green-50 border border-green-100 text-xs text-green-700 font-medium">✅ {bookedMsg}</motion.div>
      )}

      <div className="space-y-4">
        {hotels.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card overflow-hidden active:scale-[0.995] transition-transform">
            {/* Image placeholder + badges */}
            <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <span className="text-5xl opacity-30">🏨</span>
              {h.badge && <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-lg text-[9px] font-bold ${badgeColors[h.badge] || "bg-gray-500 text-white"}`}>{h.badge}</span>}
              <div className="absolute top-3 right-3 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm">
                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-bold">{h.rating}</span>
                <span className="text-[8px] text-muted">({h.reviews.toLocaleString()})</span>
              </div>
              <button onClick={() => toggleWishlist(h)} className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform">
                <Heart size={14} className={wishlist[h.id] || isInWishlist(h.id) ? "text-red-500 fill-red-500" : "text-dark-text/30"} />
              </button>
              {/* Star badges */}
              <div className="absolute bottom-3 left-3 flex gap-0.5">
                {Array.from({ length: h.star }).map((_, j) => <Star key={j} size={9} className="text-yellow-400 fill-yellow-400" />)}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-bold text-dark-text font-[family-name:var(--font-heading)] mb-0.5">{h.name}</h3>
              <div className="flex items-center gap-1 text-[11px] text-muted mb-2">
                <MapPin size={10} /> {h.location}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {h.breakfast && <span className="px-1.5 py-0.5 rounded-md bg-green-50 text-green-700 text-[9px] font-medium">☕ Breakfast</span>}
                {h.freeCancellation && <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[9px] font-medium">✓ Free Cancel</span>}
                {h.facilities.map((f) => {
                  const Icon = facilityIcons[f];
                  return Icon ? <span key={f} className="px-1.5 py-0.5 rounded-md bg-primary/5 text-primary text-[9px]"><Icon size={9} className="inline" /></span> : null;
                })}
              </div>

              {/* Price & CTA */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted line-through">Rp {h.originalPrice}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 text-[9px] font-bold">-{h.discount}%</span>
                  </div>
                  <p className="text-lg font-bold text-primary font-[family-name:var(--font-heading)]">Rp {h.price}</p>
                  <p className="text-[9px] text-muted">/malam termasuk pajak</p>
                </div>
                <div className="flex gap-1.5">
                  <a href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20booking%20${encodeURIComponent(h.name)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center active:scale-90">
                    <MessageCircle size={14} className="text-green-600" />
                  </a>
                  <button onClick={() => handleBook(h)} className="px-3.5 py-2 rounded-xl bg-primary text-white text-[10px] font-bold active:scale-95 transition-transform shadow-sm shadow-primary/20">
                    Booking
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

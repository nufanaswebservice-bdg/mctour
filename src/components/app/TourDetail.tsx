"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, CheckCircle, XCircle, Heart, Share2 } from "lucide-react";
import { addToWishlist, isInWishlist, removeFromWishlist, createBooking } from "@/lib/store";
import { getStoredAuth } from "@/lib/auth";

interface TourProps {
  tour: {
    name: string;
    location: string;
    duration: string;
    price: string;
    originalPrice: string;
    rating: number;
    image: string;
    description: string;
    itinerary: string[];
    facilities: string[];
    includes: string[];
    excludes: string[];
  };
  slug: string;
}

export default function TourDetail({ tour, slug }: TourProps) {
  const [liked, setLiked] = useState(() => isInWishlist(slug));
  const [booked, setBooked] = useState(false);

  const handleWishlist = () => {
    if (liked) {
      removeFromWishlist(slug);
    } else {
      addToWishlist({ id: slug, name: tour.name, price: tour.price, emoji: "🏝️", type: "domestic" });
    }
    setLiked(!liked);
  };

  const handleBooking = () => {
    const auth = getStoredAuth();
    if (!auth.isAuthenticated) {
      window.open(`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20booking%20paket%20${encodeURIComponent(tour.name)}%20${encodeURIComponent(tour.price)}`, "_blank");
      return;
    }
    createBooking(tour.name, tour.price, "Fleksibel", 2);
    setBooked(true);
  };

  return (
    <div className="pb-6">
      {/* Hero Image */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-56 md:h-72 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleWishlist}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform shadow-sm"
          >
            <Heart size={18} className={liked ? "text-red-500 fill-red-500" : "text-dark-text/60"} />
          </button>
          <button
            onClick={() => navigator.share?.({ title: tour.name, url: window.location.href })}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform shadow-sm"
          >
            <Share2 size={18} className="text-dark-text/60" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="glass-strong p-5 rounded-3xl">
          {/* Title & Rating */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-heading)] text-dark-text">
                {tour.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={13} className="text-muted" />
                <span className="text-xs text-muted">{tour.location}</span>
                <Clock size={13} className="text-muted ml-1" />
                <span className="text-xs text-muted">{tour.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-50">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-yellow-700">{tour.rating}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">{tour.price}</span>
            <span className="text-sm text-muted line-through">{tour.originalPrice}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-red-50 text-red-600 font-bold">HEMAT</span>
          </div>

          {/* Description */}
          <p className="text-sm text-dark-text/70 leading-relaxed mb-5">{tour.description}</p>

          {/* Facilities */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-dark-text mb-2">Fasilitas</h3>
            <div className="flex flex-wrap gap-2">
              {tour.facilities.map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-xl bg-primary/5 text-primary text-[11px] font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-dark-text mb-2">Itinerary</h3>
            <div className="space-y-2">
              {tour.itinerary.map((item, i) => (
                <div key={i} className="flex gap-2 text-xs text-dark-text/70">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Includes / Excludes */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <h3 className="text-xs font-bold text-dark-text mb-2">Termasuk</h3>
              {tour.includes.map((item) => (
                <div key={item} className="flex items-center gap-1.5 mb-1">
                  <CheckCircle size={12} className="text-green-500 shrink-0" />
                  <span className="text-[11px] text-dark-text/70">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xs font-bold text-dark-text mb-2">Tidak Termasuk</h3>
              {tour.excludes.map((item) => (
                <div key={item} className="flex items-center gap-1.5 mb-1">
                  <XCircle size={12} className="text-red-400 shrink-0" />
                  <span className="text-[11px] text-dark-text/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-20 md:bottom-4 px-4 mt-4 z-30">
        {booked ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full py-4 rounded-2xl bg-green-500 text-white font-bold text-sm text-center shadow-lg"
          >
            ✅ Booking berhasil! Cek halaman Pembayaran
          </motion.div>
        ) : (
          <div className="flex gap-3">
            <a
              href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20tanya%20tentang%20paket%20${encodeURIComponent(tour.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 rounded-2xl bg-green-500 text-white font-bold text-sm text-center shadow-lg shadow-green-500/30 active:scale-95 transition-transform"
            >
              WhatsApp
            </a>
            <button
              onClick={handleBooking}
              className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-sm text-center shadow-lg shadow-primary/30 active:scale-95 transition-transform"
            >
              Booking Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

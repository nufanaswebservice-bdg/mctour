"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, ChevronRight, Heart } from "lucide-react";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/store";

const packages = [
  { id: "bali-1", slug: "bali-paradise", name: "Bali Paradise", location: "Bali", rating: 4.9, price: "Rp 2.5jt", originalPrice: "Rp 3.2jt", duration: "4D3N", image: "/tour-bali.png", badge: "Best Seller" },
  { id: "jogja-1", slug: "jogja-heritage", name: "Jogja Heritage", location: "Yogyakarta", rating: 4.9, price: "Rp 1.8jt", originalPrice: "Rp 2.3jt", duration: "3D2N", image: "/tour-jogja.png", badge: "Popular" },
  { id: "bromo-1", slug: "bromo-sunrise", name: "Bromo Sunrise", location: "Jawa Timur", rating: 4.8, price: "Rp 1.5jt", originalPrice: "Rp 1.9jt", duration: "2D1N", image: "/tour-bromo.png", badge: null },
  { id: "lombok-1", slug: "lombok-adventure", name: "Lombok Adventure", location: "NTB", rating: 4.8, price: "Rp 2.2jt", originalPrice: "Rp 2.8jt", duration: "3D2N", image: "/tour-lombok.png", badge: "New" },
  { id: "dieng-1", slug: "dieng-plateau", name: "Dieng Plateau", location: "Jawa Tengah", rating: 4.7, price: "Rp 1.2jt", originalPrice: "Rp 1.5jt", duration: "2D1N", image: "/tour-dieng.png", badge: null },
];

export default function DomesticPackages() {
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const state: Record<string, boolean> = {};
    packages.forEach((p) => { state[p.id] = isInWishlist(p.id); });
    setWishlistState(state);
  }, []);

  const toggleWishlist = (pkg: typeof packages[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlistState[pkg.id]) {
      removeFromWishlist(pkg.id);
    } else {
      addToWishlist({ id: pkg.id, name: pkg.name, price: pkg.price, emoji: "🏝️", type: "domestic" });
    }
    setWishlistState((prev) => ({ ...prev, [pkg.id]: !prev[pkg.id] }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="py-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Paket Tour Domestik
          </h2>
          <p className="text-xs text-muted mt-0.5">Jelajahi keindahan Indonesia</p>
        </div>
        <Link href="/paket-tour-domestik" className="flex items-center gap-1 text-primary text-xs font-semibold active:opacity-70">
          Semua <ChevronRight size={14} />
        </Link>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 snap-x-mandatory">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex-shrink-0 w-[200px] md:w-[220px] snap-start">
            <Link href={`/tour/${pkg.slug}`} className="block">
              <div className="glass-card overflow-hidden active:scale-[0.98] transition-transform">
                {/* Image */}
                <div className="relative h-32 overflow-hidden rounded-t-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {pkg.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-secondary text-white text-[10px] font-bold">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm">
                    <Star size={10} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold">{pkg.rating}</span>
                  </div>
                  {/* Wishlist button */}
                  <button
                    onClick={(e) => toggleWishlist(pkg, e)}
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Heart
                      size={14}
                      className={wishlistState[pkg.id] ? "text-red-500 fill-red-500" : "text-dark-text/40"}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-dark-text font-[family-name:var(--font-heading)] truncate">
                    {pkg.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-muted" />
                    <span className="text-[11px] text-muted">{pkg.location}</span>
                    <span className="text-[11px] text-muted ml-auto">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-muted line-through">{pkg.originalPrice}</span>
                    <span className="text-sm font-bold text-primary">{pkg.price}</span>
                  </div>
                  <div className="mt-2 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold text-center">
                    Lihat Detail
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

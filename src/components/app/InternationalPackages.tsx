"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronRight, Heart, MapPin, Clock } from "lucide-react";
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/store";

const packages = [
  { id: "bangkok-1", slug: "bangkok-exotic", name: "Bangkok Exotic", flag: "🇹🇭", location: "Thailand", rating: 4.9, price: "Rp 5.5jt", originalPrice: "Rp 7jt", duration: "4D3N", airline: "Thai Airways", image: "/tour-bangkok.png", badge: "Popular" },
  { id: "korea-1", slug: "korea-autumn", name: "Korea Autumn", flag: "🇰🇷", location: "Korea Selatan", rating: 4.9, price: "Rp 15jt", originalPrice: "Rp 18jt", duration: "6D5N", airline: "Korean Air", image: "/tour-korea.png", badge: "Best Seller" },
  { id: "japan-1", slug: "japan-sakura", name: "Japan Sakura", flag: "🇯🇵", location: "Jepang", rating: 4.9, price: "Rp 22jt", originalPrice: "Rp 26jt", duration: "7D6N", airline: "ANA", image: "/tour-japan.png", badge: null },
  { id: "china-1", slug: "china-discovery", name: "China Discovery", flag: "🇨🇳", location: "China", rating: 4.8, price: "Rp 9.8jt", originalPrice: "Rp 12jt", duration: "5D4N", airline: "China Southern", image: "/tour-china.png", badge: null },
  { id: "europe-1", slug: "europe-wonder", name: "Europe Wonder", flag: "🇪🇺", location: "Eropa", rating: 4.9, price: "Rp 35jt", originalPrice: "Rp 42jt", duration: "10D9N", airline: "Emirates", image: "/tour-europe.png", badge: "Premium" },
];

export default function InternationalPackages() {
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
      addToWishlist({ id: pkg.id, name: pkg.name, price: pkg.price, emoji: pkg.flag, type: "international" });
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
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Tour Luar Negeri
          </h2>
          <p className="text-xs text-muted mt-0.5">Eksplorasi dunia bersama kami</p>
        </div>
        <Link href="/paket-tour-luar-negeri" className="flex items-center gap-1 text-primary text-xs font-semibold active:opacity-70">
          Semua <ChevronRight size={14} />
        </Link>
      </div>

      {/* Horizontal cards */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 snap-x-mandatory">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex-shrink-0 w-[220px] md:w-[240px] snap-start">
            <Link href={`/tour-intl/${pkg.slug}`} className="block">
              <div className="glass-card overflow-hidden active:scale-[0.98] transition-transform">
                {/* Image */}
                <div className="relative h-36 overflow-hidden rounded-t-[24px]">
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
                  <button
                    onClick={(e) => toggleWishlist(pkg, e)}
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Heart size={14} className={wishlistState[pkg.id] ? "text-red-500 fill-red-500" : "text-dark-text/40"} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{pkg.flag}</span>
                    <h3 className="text-sm font-bold text-dark-text font-[family-name:var(--font-heading)] truncate">
                      {pkg.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted mb-2">
                    <span className="flex items-center gap-0.5"><Clock size={10} /> {pkg.duration}</span>
                    <span>·</span>
                    <span>{pkg.airline}</span>
                  </div>
                  <div className="flex items-center gap-2">
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

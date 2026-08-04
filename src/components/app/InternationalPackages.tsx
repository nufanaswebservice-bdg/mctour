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

      {/* Cards Grid - 2 columns on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {packages.map((pkg) => (
          <div key={pkg.id}>
            <Link href={`/tour-intl/${pkg.slug}`} className="block">
              <div className="glass-card overflow-hidden active:scale-[0.98] transition-transform h-full">
                {/* Image */}
                <div className="relative h-28 sm:h-36 overflow-hidden rounded-t-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {pkg.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-secondary text-white text-[9px] font-bold">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm">
                    <Star size={9} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[9px] font-bold">{pkg.rating}</span>
                  </div>
                  <button
                    onClick={(e) => toggleWishlist(pkg, e)}
                    className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Heart size={12} className={wishlistState[pkg.id] ? "text-red-500 fill-red-500" : "text-dark-text/40"} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-2.5">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-sm">{pkg.flag}</span>
                    <h3 className="text-xs font-bold text-dark-text font-[family-name:var(--font-heading)] truncate">
                      {pkg.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted">
                    <Clock size={9} /> {pkg.duration} · {pkg.airline}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[9px] text-muted line-through">{pkg.originalPrice}</span>
                    <span className="text-xs font-bold text-primary">{pkg.price}</span>
                  </div>
                  <div className="mt-2 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-bold text-center">
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

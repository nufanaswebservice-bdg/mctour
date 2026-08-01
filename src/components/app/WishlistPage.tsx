"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { getWishlist, removeFromWishlist, WishlistItem } from "@/lib/store";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setItems(getWishlist());
  }, []);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setItems(getWishlist());
  };

  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        Wishlist <span className="gradient-text">Saya</span>
      </h1>
      <p className="text-sm text-muted mb-5">Paket tour yang Anda simpan</p>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={40} className="text-muted/20 mx-auto mb-3" />
          <p className="text-sm font-semibold text-dark-text mb-1">Wishlist Kosong</p>
          <p className="text-xs text-muted mb-5">Tambahkan paket tour favorit Anda</p>
          <a href="/paket-tour-domestik" className="btn-primary text-sm">
            Lihat Paket Tour
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-dark-text truncate">{item.name}</h3>
                <p className="text-xs text-primary font-semibold">{item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

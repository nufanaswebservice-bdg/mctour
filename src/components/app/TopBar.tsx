"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bell, Heart, User } from "lucide-react";

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? "glass-strong shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <Image
          src="/logo-mctour.png"
          alt="mcTour & Travel"
          width={110}
          height={40}
          className="h-8 w-auto object-contain"
          priority
        />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/5 active:scale-95 transition-all"
            aria-label="Notifikasi"
          >
            <Bell size={20} className="text-dark-text/70" />
          </button>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/5 active:scale-95 transition-all"
            aria-label="Wishlist"
          >
            <Heart size={20} className="text-dark-text/70" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center active:scale-95 transition-all"
            aria-label="Profile"
          >
            <User size={18} className="text-primary" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

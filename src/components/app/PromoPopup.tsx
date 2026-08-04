"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export default function PromoPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on mobile and after splash screen
    const isMobile = window.innerWidth < 768;
    const seen = sessionStorage.getItem("mctour_promo_seen");
    if (isMobile && !seen) {
      // Show after 2 seconds (after splash dismisses)
      const timer = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("mctour_promo_seen", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 md:hidden"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
            >
              <X size={16} />
            </button>

            {/* Promo Image - clickable */}
            <Link href="/event-organizer" onClick={handleClose}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/promo-gathering.png"
                alt="Promo Gathering mcTour & Travel"
                className="w-full h-auto"
              />
            </Link>

            {/* CTA Button */}
            <div className="p-4 bg-white">
              <Link
                href="/event-organizer"
                onClick={handleClose}
                className="block w-full py-3 rounded-2xl bg-gradient-to-r from-[#0057B8] to-[#00B4D8] text-white font-bold text-sm text-center active:scale-95 transition-transform shadow-lg shadow-blue-500/20"
              >
                Lihat Paket Gathering
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

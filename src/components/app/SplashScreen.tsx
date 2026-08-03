"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if user already saw splash this session
    const seen = sessionStorage.getItem("mctour_splash_seen");
    if (seen) {
      setShow(false);
    }
  }, []);

  const handleStart = () => {
    sessionStorage.setItem("mctour_splash_seen", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] md:hidden"
        >
          {/* Full screen background image */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/splash-screen.png"
              alt="mcTour & Travel"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom gradient overlay for button */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0D2B6B]/90 via-[#0D2B6B]/50 to-transparent" />

          {/* Button area */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 safe-bottom">
            <motion.button
              onClick={handleStart}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="relative w-full py-4 rounded-2xl overflow-hidden text-white font-bold text-base font-[family-name:var(--font-heading)] shadow-xl shadow-blue-900/40 active:scale-95 transition-transform"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_100%] bg-gradient-to-r from-[#0A2E7A] via-[#1565FF] to-[#4D8AFF]" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Your Journey
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

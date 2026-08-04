"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Ticket, ChevronRight } from "lucide-react";

export default function ActivitiesWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Klook/Travelpayouts widget script
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://tpwdg.com/content?currency=IDR&trs=558445&shmarker=760307&locale=id&city_id=45&category=2&amount=6&powered_by=true&campaign_id=137&promo_id=4497";
    
    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Ticket size={16} className="text-primary" />
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
              Aktivitas & Tour
            </h2>
          </div>
          <p className="text-xs text-muted mt-0.5">Temukan aktivitas seru di destinasi Anda</p>
        </div>
      </div>

      {/* Widget Container */}
      <div ref={widgetRef} className="rounded-2xl overflow-hidden min-h-[200px]" />
    </motion.section>
  );
}

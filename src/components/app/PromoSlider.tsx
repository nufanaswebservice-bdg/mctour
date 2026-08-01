"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const promos = [
  {
    id: 1,
    title: "Diskon 20% Paket Bali",
    subtitle: "Berlaku hingga akhir bulan",
    gradient: "from-primary to-primary-light",
    emoji: "🏝️",
  },
  {
    id: 2,
    title: "Company Gathering Hemat",
    subtitle: "Mulai Rp 500rb/orang",
    gradient: "from-secondary to-secondary-light",
    emoji: "🏢",
  },
  {
    id: 3,
    title: "Tour Korea Autumn 2026",
    subtitle: "Slot terbatas, booking sekarang!",
    gradient: "from-primary-dark to-primary",
    emoji: "🇰🇷",
  },
  {
    id: 4,
    title: "Umroh Reguler Desember",
    subtitle: "Berangkat pasti, seat terbatas",
    gradient: "from-[#2E7D32] to-[#4CAF50]",
    emoji: "🕋",
  },
];

export default function PromoSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="py-4"
      id="promo"
    >
      <div ref={emblaRef} className="overflow-hidden px-4">
        <div className="flex gap-3">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-[45%] lg:w-[30%]"
            >
              <div
                className={`relative h-36 md:h-40 rounded-3xl bg-gradient-to-br ${promo.gradient} p-5 flex flex-col justify-between overflow-hidden`}
              >
                {/* Decorative circle */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/5 rounded-full" />

                <div className="relative z-10">
                  <p className="text-white/80 text-xs font-medium">PROMO</p>
                  <h3 className="text-white text-base font-bold mt-1 font-[family-name:var(--font-heading)]">
                    {promo.title}
                  </h3>
                  <p className="text-white/70 text-xs mt-1">{promo.subtitle}</p>
                </div>

                <span className="absolute bottom-4 right-5 text-4xl opacity-30">
                  {promo.emoji}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {promos.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === selectedIndex ? "w-5 bg-primary" : "w-1.5 bg-primary/20"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
}

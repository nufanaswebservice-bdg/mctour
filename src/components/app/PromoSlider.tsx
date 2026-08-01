"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const promos = [
  { id: 1, image: "/banner-bali.png", alt: "Promo Paket Bali" },
  { id: 2, image: "/banner-gathering.png", alt: "Promo Gathering Perusahaan" },
  { id: 3, image: "/banner-korea.png", alt: "Promo Tour Korea" },
  { id: 4, image: "/banner-umroh.png", alt: "Promo Paket Umroh" },
];

export default function PromoSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={promo.image}
                alt={promo.alt}
                className="w-full h-auto rounded-3xl object-cover"
                loading="lazy"
              />
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

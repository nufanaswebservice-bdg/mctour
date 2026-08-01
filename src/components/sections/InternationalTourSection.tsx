"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const tours = [
  {
    id: 1,
    title: "Bangkok Exotic",
    flag: "🇹🇭",
    duration: "4D3N",
    price: "Rp 5.500.000",
    airline: "Thai Airways",
    hotel: "4 Star Hotel",
    highlight: "Grand Palace, Wat Arun, Floating Market",
  },
  {
    id: 2,
    title: "Korea Autumn",
    flag: "🇰🇷",
    duration: "6D5N",
    price: "Rp 15.000.000",
    airline: "Korean Air",
    hotel: "4 Star Hotel",
    highlight: "Nami Island, Gyeongbokgung, Myeongdong",
  },
  {
    id: 3,
    title: "Japan Sakura",
    flag: "🇯🇵",
    duration: "7D6N",
    price: "Rp 22.000.000",
    airline: "ANA / JAL",
    hotel: "4 Star Hotel",
    highlight: "Tokyo, Osaka, Kyoto, Mt. Fuji",
  },
  {
    id: 4,
    title: "China Discovery",
    flag: "🇨🇳",
    duration: "5D4N",
    price: "Rp 9.800.000",
    airline: "China Southern",
    hotel: "4 Star Hotel",
    highlight: "Beijing, Great Wall, Forbidden City",
  },
  {
    id: 5,
    title: "Europe Wonder",
    flag: "🇪🇺",
    duration: "10D9N",
    price: "Rp 35.000.000",
    airline: "Emirates",
    hotel: "4-5 Star Hotel",
    highlight: "Paris, Amsterdam, Swiss, Rome",
  },
];

export default function InternationalTourSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <AnimatedSection className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          title="Paket Tour Luar Negeri"
          subtitle="Eksplorasi dunia bersama kami dengan paket lengkap dan guide berpengalaman"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 group cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              {/* Flag & Title */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{tour.flag}</span>
                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-dark-text/50">{tour.duration}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-dark-text/60">
                  <span>✈️</span>
                  <span>{tour.airline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark-text/60">
                  <span>🏨</span>
                  <span>{tour.hotel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark-text/60">
                  <span>📍</span>
                  <span>{tour.highlight}</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                <div>
                  <p className="text-xs text-dark-text/50">Mulai dari</p>
                  <p className="text-xl font-bold text-primary font-[family-name:var(--font-heading)]">
                    {tour.price}
                  </p>
                </div>
                <a
                  href={`https://wa.me/6281234567890?text=Halo%20mcTour%2C%20saya%20tertarik%20paket%20${encodeURIComponent(tour.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  Booking
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Star, Clock, Luggage, Plane } from "lucide-react";

const AFFILIATE_ID = "760307";

const deals = [
  { from: "Jakarta", fromCode: "CGK", to: "Bali", toCode: "DPS", price: "550.000", airline: "Citilink", time: "1j 45m", baggage: "20kg", rating: 4.5, direct: true },
  { from: "Jakarta", fromCode: "CGK", to: "Yogyakarta", toCode: "JOG", price: "420.000", airline: "Garuda", time: "1j 10m", baggage: "20kg", rating: 4.8, direct: true },
  { from: "Jakarta", fromCode: "CGK", to: "Singapore", toCode: "SIN", price: "980.000", airline: "Scoot", time: "1j 50m", baggage: "20kg", rating: 4.3, direct: true },
  { from: "Jakarta", fromCode: "CGK", to: "Surabaya", toCode: "SUB", price: "380.000", airline: "Lion Air", time: "1j 30m", baggage: "15kg", rating: 4.2, direct: true },
  { from: "Jakarta", fromCode: "CGK", to: "Seoul", toCode: "ICN", price: "3.200.000", airline: "Batik Air", time: "7j 10m", baggage: "30kg", rating: 4.6, direct: true },
  { from: "Jakarta", fromCode: "CGK", to: "Tokyo", toCode: "NRT", price: "3.800.000", airline: "Garuda", time: "7j 30m", baggage: "23kg", rating: 4.9, direct: true },
];

export default function FlightDeals() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-6"
    >
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">🔥 Flash Deals</h2>
      <p className="text-xs text-muted mb-4">Harga promo terbatas hari ini</p>

      <div className="space-y-3">
        {deals.map((deal, i) => (
          <motion.a
            key={`${deal.fromCode}-${deal.toCode}-${i}`}
            href={`https://www.wego.co.id/flights/search?origin=${deal.fromCode}&destination=${deal.toCode}&adults=1&currency=IDR&locale=id`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="block glass-card p-4 active:scale-[0.99] transition-transform"
          >
            {/* Route */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Plane size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-dark-text">{deal.from} → {deal.to}</p>
                  <p className="text-[10px] text-muted">{deal.airline}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-primary font-[family-name:var(--font-heading)]">Rp {deal.price}</p>
                <p className="text-[9px] text-muted">/orang</p>
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center gap-3 pt-2 border-t border-primary/5">
              <span className="flex items-center gap-1 text-[10px] text-muted"><Clock size={10} /> {deal.time}</span>
              <span className="flex items-center gap-1 text-[10px] text-muted"><Luggage size={10} /> {deal.baggage}</span>
              <span className="flex items-center gap-1 text-[10px] text-muted"><Star size={10} className="text-yellow-500 fill-yellow-500" /> {deal.rating}</span>
              {deal.direct && <span className="px-1.5 py-0.5 rounded-md bg-green-50 text-green-700 text-[9px] font-medium ml-auto">Direct</span>}
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}

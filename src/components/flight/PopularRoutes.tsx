"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const AFFILIATE_ID = "760307";

const routes = [
  { from: "Jakarta", fromCode: "CGK", to: "Bali", toCode: "DPS", price: "650.000", airline: "Citilink" },
  { from: "Jakarta", fromCode: "CGK", to: "Surabaya", toCode: "SUB", price: "480.000", airline: "Lion Air" },
  { from: "Jakarta", fromCode: "CGK", to: "Yogyakarta", toCode: "JOG", price: "520.000", airline: "Garuda" },
  { from: "Jakarta", fromCode: "CGK", to: "Makassar", toCode: "UPG", price: "780.000", airline: "Batik Air" },
  { from: "Jakarta", fromCode: "CGK", to: "Medan", toCode: "KNO", price: "850.000", airline: "Lion Air" },
  { from: "Jakarta", fromCode: "CGK", to: "Lombok", toCode: "LOP", price: "720.000", airline: "Wings Air" },
  { from: "Jakarta", fromCode: "CGK", to: "Singapore", toCode: "SIN", price: "1.200.000", airline: "AirAsia" },
  { from: "Jakarta", fromCode: "CGK", to: "Bangkok", toCode: "BKK", price: "1.800.000", airline: "Thai Lion" },
  { from: "Jakarta", fromCode: "CGK", to: "Tokyo", toCode: "NRT", price: "4.500.000", airline: "AirAsia X" },
  { from: "Jakarta", fromCode: "CGK", to: "Seoul", toCode: "ICN", price: "3.800.000", airline: "Batik Air" },
  { from: "Bali", fromCode: "DPS", to: "Singapore", toCode: "SIN", price: "1.100.000", airline: "Scoot" },
  { from: "Surabaya", fromCode: "SUB", to: "Bali", toCode: "DPS", price: "450.000", airline: "Citilink" },
];

export default function PopularRoutes() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-6"
    >
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">Rute Populer</h2>
      <p className="text-xs text-muted mb-4">Harga mulai dari (sekali jalan)</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {routes.map((route, i) => (
          <motion.a
            key={`${route.fromCode}-${route.toCode}`}
            href={`https://www.wego.co.id/flights/${route.fromCode}-${route.toCode}?adults=1`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-primary/5 active:scale-[0.98] active:bg-primary/5 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Plane size={14} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-dark-text">
                <span>{route.from}</span>
                <span className="text-muted">→</span>
                <span>{route.to}</span>
              </div>
              <span className="text-[9px] text-muted">{route.airline}</span>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-bold text-primary">Rp {route.price}</p>
              <p className="text-[8px] text-muted">/orang</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}

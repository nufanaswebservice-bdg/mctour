"use client";

import { motion } from "framer-motion";
import { Check, Crown, Plane, Building, Clock } from "lucide-react";

const hajiPackages = [
  {
    name: "Haji Plus Reguler",
    price: "Rp 150.000.000",
    waiting: "5-8 Tahun",
    duration: "26 Hari",
    airline: "Garuda Indonesia",
    hotel: "Hotel Bintang 4 (±300m)",
    features: ["Bimbingan Manasik 5x", "Pembimbing Ustadz", "Makan 3x Buffet", "Laundry", "Air Zamzam 10L", "Handling Full", "Asuransi Jiwa", "Perlengkapan Haji"],
  },
  {
    name: "Haji Plus VIP",
    price: "Rp 250.000.000",
    waiting: "3-5 Tahun",
    duration: "26 Hari",
    airline: "Garuda Indonesia (Business)",
    hotel: "Hotel Bintang 5 (Depan Masjid)",
    features: ["Bimbingan Manasik Premium", "Ustadz Terkenal", "Makan Fine Dining", "Suite Room", "Private Transport", "Personal Assistant", "Medical Checkup", "Souvenir Premium", "Video Full"],
  },
];

export default function HajiPlus() {
  return (
    <section className="px-4 py-8">
      <div className="flex items-center gap-2 mb-1">
        <Crown size={18} className="text-[#FFD700]" />
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">Haji Plus</h2>
      </div>
      <p className="text-xs text-muted mb-5">Ibadah haji dengan pelayanan eksklusif & antrian lebih cepat</p>

      <div className="space-y-4">
        {hajiPackages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl overflow-hidden border-2 border-[#FFD700]/30 bg-gradient-to-br from-white to-[#FFD700]/5"
          >
            <div className="h-2 bg-gradient-to-r from-[#FFD700] to-[#FFA000]" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-base font-bold text-dark-text font-[family-name:var(--font-heading)]">{pkg.name}</h3>
                <span className="px-2 py-0.5 rounded-lg bg-[#FFD700]/20 text-[#8B6914] text-[9px] font-bold">PREMIUM</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-muted">
                <span className="flex items-center gap-1"><Plane size={11} className="text-[#1B5E20]" /> {pkg.airline}</span>
                <span className="flex items-center gap-1"><Clock size={11} className="text-[#1B5E20]" /> {pkg.duration}</span>
                <span className="flex items-center gap-1"><Building size={11} className="text-[#1B5E20]" /> {pkg.hotel}</span>
                <span className="flex items-center gap-1">⏳ Antrian: {pkg.waiting}</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {pkg.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <Check size={10} className="text-[#FFD700] shrink-0" />
                    <span className="text-[10px] text-dark-text/70">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#FFD700]/20">
                <div>
                  <p className="text-[10px] text-muted">Biaya</p>
                  <p className="text-xl font-bold text-[#1B5E20] font-[family-name:var(--font-heading)]">{pkg.price}</p>
                </div>
                <a
                  href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20info%20${encodeURIComponent(pkg.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#1B5E20] text-xs font-bold shadow-lg shadow-[#FFD700]/20 active:scale-95 transition-transform"
                >
                  Konsultasi Sekarang
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

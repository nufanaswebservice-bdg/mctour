"use client";

import { motion } from "framer-motion";
import { Star, Plane, Building, Clock, Users, Check } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Umroh Reguler",
    duration: "9 Hari",
    price: "Rp 28.000.000",
    priceNote: "/jamaah",
    airline: "Saudi Airlines",
    hotel: "Hotel Bintang 3 (±500m dari Masjid)",
    rating: 4.8,
    reviews: 342,
    badge: null,
    popular: false,
    features: ["Makan 3x Prasmanan", "Pembimbing Ibadah", "Handling Bandara", "Perlengkapan Umroh", "Ziarah Madinah", "Air Zamzam 5L"],
    schedule: ["Januari 2027", "Maret 2027", "Mei 2027", "September 2027"],
  },
  {
    id: 2,
    name: "Umroh Plus",
    duration: "9 Hari",
    price: "Rp 35.000.000",
    priceNote: "/jamaah",
    airline: "Garuda Indonesia",
    hotel: "Hotel Bintang 4 (±200m dari Masjid)",
    rating: 4.9,
    reviews: 518,
    badge: "Best Seller",
    popular: true,
    features: ["Makan 3x Buffet International", "Pembimbing Senior", "City Tour Mekkah & Madinah", "Laundry 5kg", "Perlengkapan Premium", "Air Zamzam 10L", "Foto Profesional"],
    schedule: ["Setiap Bulan (Jadwal Pasti)"],
  },
  {
    id: 3,
    name: "Umroh VIP",
    duration: "12 Hari",
    price: "Rp 55.000.000",
    priceNote: "/jamaah",
    airline: "Garuda Indonesia (Business)",
    hotel: "Hotel Bintang 5 (Depan Masjidil Haram)",
    rating: 5.0,
    reviews: 156,
    badge: "Exclusive",
    popular: false,
    features: ["Makan 3x Fine Dining", "Ustadz Pembimbing Terkenal", "Private Transport", "Suite Room", "City Tour Premium", "Shopping Tour", "Souvenir Exclusive", "Air Zamzam 20L", "Video Dokumentasi"],
    schedule: ["Ramadhan 2027", "Desember 2027"],
  },
  {
    id: 4,
    name: "Umroh Ramadhan",
    duration: "14 Hari",
    price: "Rp 45.000.000",
    priceNote: "/jamaah",
    airline: "Garuda Indonesia",
    hotel: "Hotel Bintang 4 (Dekat Masjid)",
    rating: 4.9,
    reviews: 203,
    badge: "Spesial",
    popular: false,
    features: ["Iktikaf 10 Hari Terakhir", "Makan 3x Buffet", "Pembimbing Senior", "Lailatul Qadar Experience", "Sahur & Iftar Masjid", "Perlengkapan Lengkap"],
    schedule: ["Ramadhan 2027 (Maret)"],
  },
];

export default function PackageCards() {
  return (
    <section id="paket" className="px-4 py-8 -mt-6 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1"
      >
        Paket Umroh
      </motion.h2>
      <p className="text-xs text-muted mb-5">Pilih paket sesuai kebutuhan ibadah Anda</p>

      <div className="space-y-4">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card overflow-hidden ${pkg.popular ? "ring-2 ring-[#2E7D32]" : ""}`}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#1B5E20] to-[#4CAF50]" />
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-dark-text font-[family-name:var(--font-heading)]">{pkg.name}</h3>
                    {pkg.badge && (
                      <span className="px-2 py-0.5 rounded-lg bg-[#FFD700] text-[#1B5E20] text-[9px] font-bold">{pkg.badge}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted flex-wrap">
                    <span className="flex items-center gap-0.5"><Plane size={10} /> {pkg.airline}</span>
                    <span className="flex items-center gap-0.5"><Clock size={10} /> {pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-muted">
                    <Building size={10} /> <span>{pkg.hotel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">{pkg.rating}</span>
                  <span className="text-[9px] text-muted">({pkg.reviews})</span>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {pkg.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <Check size={10} className="text-[#2E7D32] shrink-0" />
                    <span className="text-[10px] text-dark-text/70">{f}</span>
                  </div>
                ))}
              </div>

              {/* Schedule */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pkg.schedule.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-lg bg-[#1B5E20]/5 text-[#1B5E20] text-[9px] font-medium">{s}</span>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1B5E20]/5">
                <div>
                  <p className="text-[10px] text-muted">Mulai dari</p>
                  <p className="text-lg font-bold text-[#1B5E20] font-[family-name:var(--font-heading)]">
                    {pkg.price}<span className="text-[10px] font-normal text-muted">{pkg.priceNote}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20daftar%20${encodeURIComponent(pkg.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-xl bg-green-500 text-white text-[11px] font-bold active:scale-95 transition-transform"
                  >
                    Daftar
                  </a>
                  <a
                    href={`https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20info%20lengkap%20${encodeURIComponent(pkg.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-xl bg-[#1B5E20]/10 text-[#1B5E20] text-[11px] font-bold active:scale-95 transition-transform"
                  >
                    Info Detail
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

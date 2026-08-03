"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Apa saja syarat rental kendaraan?", a: "KTP, SIM (A untuk mobil, B untuk bus), dan DP 30% saat booking. Untuk lepas kunci tambah deposit Rp 1-5 juta." },
  { q: "Apakah bisa lepas kunci (tanpa driver)?", a: "Bisa untuk mobil penumpang (Avanza, Xenia, Innova, dll). Untuk Hiace, Elf, dan Bus wajib pakai driver." },
  { q: "Apakah sudah termasuk BBM?", a: "Rental dengan driver sudah termasuk BBM dalam kota. Untuk luar kota, BBM ditanggung penyewa." },
  { q: "Berapa jam overtime?", a: "Overtime dihitung per jam (10% dari harga harian). Lebih dari 3 jam overtime dihitung 1 hari penuh." },
  { q: "Bisa antar-jemput bandara?", a: "Bisa! Kami melayani airport transfer ke semua bandara di Indonesia. Harga mulai Rp 200.000." },
  { q: "Bagaimana kebijakan pembatalan?", a: "H-3 refund 100%, H-2 refund 75%, H-1 refund 50%, hari H tidak ada refund." },
  { q: "Apakah ada asuransi?", a: "Ya, semua kendaraan sudah tercover asuransi all risk. Penumpang juga mendapat asuransi kecelakaan." },
  { q: "Bisa rental jangka panjang?", a: "Bisa! Kami melayani rental bulanan dengan harga spesial. Hubungi admin untuk penawaran." },
];

export default function RentalFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">FAQ Rental</h2>
      <p className="text-xs text-muted mb-4">Pertanyaan seputar rental kendaraan</p>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-primary/5 overflow-hidden bg-white/80">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left active:bg-primary/5">
              <span className="text-xs font-medium text-dark-text pr-3">{faq.q}</span>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-primary shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <p className="px-4 pb-4 text-[11px] text-muted leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

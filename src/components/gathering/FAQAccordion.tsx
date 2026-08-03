"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Berapa minimal peserta untuk gathering?", a: "Minimal 20 orang untuk paket standar. Untuk private gathering bisa mulai 10 orang dengan harga custom." },
  { q: "Apakah bisa custom tema dan konsep?", a: "Tentu! Kami memiliki tim kreatif yang siap merancang konsep sesuai kebutuhan dan budget perusahaan Anda." },
  { q: "Berapa lama waktu persiapan yang dibutuhkan?", a: "Idealnya 2-4 minggu sebelum hari H. Namun untuk event besar disarankan 1-2 bulan sebelumnya." },
  { q: "Apakah sudah termasuk MC dan sound system?", a: "Ya, paket Gold ke atas sudah termasuk MC profesional dan sound system. Paket Silver bisa ditambahkan." },
  { q: "Bagaimana jika cuaca buruk saat outdoor?", a: "Kami selalu menyiapkan backup plan indoor. Keselamatan peserta adalah prioritas utama." },
  { q: "Apakah ada dokumentasi foto dan video?", a: "Ya, semua paket sudah termasuk dokumentasi. Paket premium mendapat video cinematic editing." },
  { q: "Bisa gathering di luar kota?", a: "Bisa! Kami melayani gathering ke seluruh Indonesia. Bandung, Bali, Jogja, Malang, Lombok, dan lainnya." },
  { q: "Bagaimana sistem pembayaran?", a: "DP 30% saat booking, pelunasan H-7. Bisa transfer bank, e-wallet, atau cicilan untuk korporat." },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">FAQ</h2>
      <p className="text-xs text-muted mb-4">Pertanyaan seputar gathering</p>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-[#0057B8]/5 overflow-hidden bg-white/70 backdrop-blur-sm">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left active:bg-[#0057B8]/5 transition-colors"
            >
              <span className="text-xs font-medium text-dark-text pr-3">{faq.q}</span>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-[#0057B8] shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Berapa lama proses pendaftaran umroh?", a: "Proses pendaftaran 1-2 minggu. Setelah dokumen lengkap dan DP dibayar, seat Anda dijamin." },
  { q: "Apa saja dokumen yang diperlukan?", a: "Paspor (min. 8 bulan berlaku), pas foto 4x6 latar putih, KTP, buku kuning vaksin Meningitis, dan surat mahram (untuk wanita < 45 tahun)." },
  { q: "Apakah bisa berangkat tanpa mahram?", a: "Wanita di atas 45 tahun bisa berangkat tanpa mahram dengan surat pernyataan. Di bawah 45 tahun wajib ada mahram." },
  { q: "Bagaimana jika visa ditolak?", a: "Kami memiliki success rate 99.5% untuk visa umroh. Jika ditolak, uang kembali 100% (minus biaya admin visa)." },
  { q: "Berapa lama antrian haji plus?", a: "Haji Plus reguler 5-8 tahun, Haji Plus VIP 3-5 tahun. Jauh lebih cepat dari haji reguler (20-30 tahun)." },
  { q: "Apakah bisa dicicil?", a: "Bisa! Kami menyediakan program cicilan hingga 12 bulan untuk umroh dan 24 bulan untuk haji plus." },
  { q: "Kapan bimbingan manasik dilakukan?", a: "Manasik dilakukan 3-5x sebelum keberangkatan. Jadwal fleksibel (weekday/weekend) di kantor kami atau online via Zoom." },
  { q: "Apakah ada asuransi perjalanan?", a: "Ya, semua jamaah mendapat asuransi perjalanan dan kesehatan. Paket VIP mendapat asuransi jiwa tambahan." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">FAQ Umroh & Haji</h2>
      <p className="text-xs text-muted mb-4">Pertanyaan yang sering ditanyakan jamaah</p>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-[#1B5E20]/8 overflow-hidden bg-white/80">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left active:bg-[#1B5E20]/5"
            >
              <span className="text-xs font-medium text-dark-text pr-3">{faq.q}</span>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-[#1B5E20] shrink-0" />
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

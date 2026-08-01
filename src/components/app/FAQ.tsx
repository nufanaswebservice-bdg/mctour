"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara memesan paket tour?", a: "Cukup hubungi kami via WhatsApp di 0818-548-833 atau klik tombol booking. Tim kami akan merespons dalam 30 menit." },
  { q: "Bisa custom paket sesuai keinginan?", a: "Tentu! Kami melayani custom tour sesuai budget, destinasi, dan kebutuhan Anda. Konsultasi gratis." },
  { q: "Berapa minimal peserta gathering?", a: "Minimal 20 orang untuk paket gathering. Semakin banyak peserta, harga semakin kompetitif." },
  { q: "Apakah termasuk asuransi perjalanan?", a: "Ya, semua paket sudah termasuk asuransi perjalanan untuk keamanan Anda." },
  { q: "Bagaimana sistem pembayaran?", a: "Transfer bank, kartu kredit, atau cicilan 0%. DP minimal 30% dari total." },
  { q: "Ada tour guide di setiap perjalanan?", a: "Ya, setiap paket dilengkapi tour guide profesional yang berpengalaman." },
  { q: "Bagaimana kebijakan pembatalan?", a: "H-30 refund 80%, H-14 refund 50%, H-7 tidak ada refund. Bisa reschedule." },
  { q: "Apakah armada milik sendiri?", a: "Ya, kami memiliki armada bus pariwisata sendiri yang selalu terawat." },
  { q: "Ada garansi keberangkatan?", a: "Ya, garansi berangkat sesuai jadwal atau uang kembali 100%." },
  { q: "Diskon untuk rombongan besar?", a: "Ada harga spesial untuk minimal 50 orang. Hubungi kami untuk penawaran." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-5"
    >
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
        FAQ
      </h2>
      <p className="text-xs text-muted mb-4">Pertanyaan yang sering diajukan</p>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left active:bg-primary/5 transition-colors"
            >
              <span className="text-xs font-medium text-dark-text pr-3">{faq.q}</span>
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-primary shrink-0" />
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
                  <p className="px-4 pb-4 text-[11px] text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

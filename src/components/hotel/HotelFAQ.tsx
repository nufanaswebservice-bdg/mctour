"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara booking hotel di mcTour?", a: "Cari hotel, pilih tanggal, pilih kamar, dan lakukan pembayaran. Voucher langsung dikirim via email & WhatsApp." },
  { q: "Apakah bisa free cancellation?", a: "Ya, banyak hotel menyediakan opsi free cancellation hingga H-1 check-in. Cek policy di setiap hotel." },
  { q: "Bagaimana jika saya perlu early check-in / late check-out?", a: "Anda bisa request melalui kolom permintaan khusus. Kami akan konfirmasi dengan pihak hotel." },
  { q: "Apakah harga sudah termasuk pajak?", a: "Ya, semua harga yang ditampilkan sudah termasuk pajak dan service charge. Tidak ada biaya tersembunyi." },
  { q: "Bisa bayar di hotel (pay later)?", a: "Beberapa hotel mendukung pay at hotel. Cari filter 'Pay Later' saat pencarian." },
  { q: "Bagaimana jika hotel overbooked?", a: "Kami akan mencarikan hotel pengganti dengan kualitas sama atau lebih baik, atau refund penuh." },
];

export default function HotelFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 py-8">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">FAQ Hotel</h2>
      <p className="text-xs text-muted mb-4">Pertanyaan seputar booking hotel</p>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-primary/5 overflow-hidden bg-white/80">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left active:bg-primary/5">
              <span className="text-xs font-medium text-dark-text pr-3">{faq.q}</span>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown size={16} className="text-primary shrink-0" /></motion.div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
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

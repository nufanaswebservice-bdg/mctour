"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara booking tiket pesawat?", a: "Pilih rute, tanggal, dan penumpang. Klik 'Cari Penerbangan' untuk melihat harga dari semua maskapai. Pilih yang terbaik dan bayar." },
  { q: "Apakah harga sudah termasuk bagasi?", a: "Tergantung maskapai. Full-service (Garuda, Batik Air) biasanya sudah termasuk. Low-cost (Lion Air, AirAsia) bisa tambah bagasi saat booking." },
  { q: "Bisa reschedule atau refund?", a: "Kebijakan berbeda per maskapai dan tipe tiket. Umumnya tiket refundable bisa dibatalkan, tiket promo tidak bisa." },
  { q: "Kapan waktu terbaik booking tiket murah?", a: "Idealnya 2-3 minggu sebelum keberangkatan untuk domestik, 1-2 bulan untuk internasional. Booking di hari Selasa-Rabu biasanya lebih murah." },
  { q: "Dokumen apa yang diperlukan?", a: "Domestik: KTP. Internasional: Paspor (min. 6 bulan berlaku) + Visa (jika diperlukan). Anak: Akta lahir." },
  { q: "Bagaimana jika penerbangan delay atau cancel?", a: "Maskapai wajib memberikan kompensasi sesuai regulasi. Hubungi kami jika butuh bantuan re-booking." },
];

export default function FlightFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="px-4 py-6">
      <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">FAQ Tiket Pesawat</h2>
      <p className="text-xs text-muted mb-4">Pertanyaan seputar penerbangan</p>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-primary/5 overflow-hidden bg-white/80">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left active:bg-primary/5">
              <span className="text-xs font-medium text-dark-text pr-3">{faq.q}</span>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown size={16} className="text-primary shrink-0" /></motion.div>
            </button>
            <AnimatePresence>
              {open === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="px-4 pb-4 text-[11px] text-muted leading-relaxed">{faq.a}</p></motion.div>)}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

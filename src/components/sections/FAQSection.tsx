"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  { q: "Bagaimana cara memesan paket tour di mcTour & Travel?", a: "Anda bisa memesan langsung melalui WhatsApp kami di +62 812-3456-7890 atau mengisi form booking di website. Tim kami akan merespons dalam waktu kurang dari 30 menit." },
  { q: "Apakah bisa custom paket tour sesuai keinginan?", a: "Tentu! Kami melayani custom tour sesuai budget, destinasi, dan kebutuhan Anda. Hubungi kami untuk konsultasi gratis." },
  { q: "Berapa minimal peserta untuk company gathering?", a: "Minimal 20 orang untuk paket gathering perusahaan. Semakin banyak peserta, semakin kompetitif harganya." },
  { q: "Apakah harga sudah termasuk asuransi perjalanan?", a: "Ya, semua paket tour kami sudah termasuk asuransi perjalanan untuk keamanan dan kenyamanan Anda." },
  { q: "Bagaimana sistem pembayaran di mcTour?", a: "Kami menerima transfer bank, kartu kredit, dan cicilan 0%. DP minimal 30% dari total biaya." },
  { q: "Apakah ada tour guide di setiap perjalanan?", a: "Ya, setiap paket tour dilengkapi tour guide/leader profesional yang berpengalaman." },
  { q: "Berapa lama proses pengurusan visa?", a: "Proses visa umumnya 5-14 hari kerja tergantung negara tujuan. Kami akan membantu dari awal hingga visa terbit." },
  { q: "Apakah mcTour melayani private tour?", a: "Ya, kami melayani private tour untuk keluarga, couple, maupun solo traveler dengan itinerary yang bisa disesuaikan." },
  { q: "Bagaimana jika terjadi pembatalan perjalanan?", a: "Kebijakan pembatalan bergantung pada waktu pembatalan. H-30 refund 80%, H-14 refund 50%, H-7 tidak ada refund." },
  { q: "Apakah armada transportasi milik sendiri?", a: "Kami memiliki armada bus pariwisata sendiri yang terawat dan selalu dalam kondisi prima untuk kenyamanan perjalanan Anda." },
  { q: "Bagaimana cara mendaftar umroh di mcTour?", a: "Hubungi kami via WhatsApp untuk info jadwal keberangkatan, lalu lengkapi dokumen yang diperlukan. Tim kami akan membantu prosesnya." },
  { q: "Apakah ada jaminan keberangkatan?", a: "Ya, kami memberikan garansi keberangkatan sesuai jadwal yang telah ditentukan atau uang kembali 100%." },
  { q: "Fasilitas apa saja yang didapat di paket tour?", a: "Fasilitas standar meliputi transportasi, hotel, makan, tiket wisata, tour guide, dan asuransi. Detail bisa berbeda per paket." },
  { q: "Apakah bisa request menu makanan khusus?", a: "Bisa. Kami bisa mengakomodasi kebutuhan diet khusus seperti vegetarian, halal, atau alergi tertentu." },
  { q: "Bagaimana jika saya ingin memperpanjang stay?", a: "Kami bisa membantu extend hotel dan itinerary dengan biaya tambahan. Informasikan saat booking." },
  { q: "Apakah ada paket honeymoon?", a: "Ya, kami memiliki paket honeymoon romantis ke berbagai destinasi domestik dan internasional." },
  { q: "Berapa usia minimal peserta tour?", a: "Tidak ada batas usia minimal, namun peserta di bawah 17 tahun wajib didampingi orang tua/wali." },
  { q: "Apakah mcTour melayani tiket pesawat saja?", a: "Ya, kami juga melayani pembelian tiket pesawat saja (tanpa paket tour) dengan harga kompetitif." },
  { q: "Bagaimana standar hotel yang digunakan?", a: "Kami menggunakan hotel minimal bintang 3 yang bersih, strategis, dan memiliki rating baik." },
  { q: "Apakah ada diskon untuk rombongan besar?", a: "Ya, kami memberikan harga spesial untuk rombongan minimal 50 orang. Hubungi kami untuk penawaran terbaik." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SectionHeading
        title="Pertanyaan Umum (FAQ)"
        subtitle="Temukan jawaban atas pertanyaan yang sering diajukan"
      />

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="glass-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-sm font-medium text-dark-text pr-4">
                {faq.q}
              </span>
              <motion.svg
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-primary shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 text-sm text-dark-text/60 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

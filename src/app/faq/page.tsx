import { Metadata } from "next";
import dynamic from "next/dynamic";

const FAQPageContent = dynamic(() => import("@/components/pages/FAQPageContent"));

export const metadata: Metadata = {
  title: "FAQ - Pertanyaan yang Sering Diajukan",
  description:
    "Temukan jawaban atas pertanyaan umum tentang layanan mcTour & Travel, mulai dari paket tour, gathering, booking, hingga pembayaran.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bagaimana cara memesan paket tour di mcTour & Travel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anda bisa memesan langsung melalui WhatsApp kami di +62 812-3456-7890 atau mengisi form booking di website. Tim kami akan merespons dalam waktu kurang dari 30 menit.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah bisa custom paket tour sesuai keinginan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tentu! Kami melayani custom tour sesuai budget, destinasi, dan kebutuhan Anda. Hubungi kami untuk konsultasi gratis.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa minimal peserta untuk company gathering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimal 20 orang untuk paket gathering perusahaan. Semakin banyak peserta, semakin kompetitif harganya.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah harga sudah termasuk asuransi perjalanan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, semua paket tour kami sudah termasuk asuransi perjalanan untuk keamanan dan kenyamanan Anda.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPageContent />
    </>
  );
}

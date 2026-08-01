import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const FAQ = dynamic(() => import("@/components/app/FAQ"));

export const metadata: Metadata = {
  title: "FAQ - Pertanyaan yang Sering Diajukan",
  description: "Temukan jawaban atas pertanyaan umum tentang layanan mcTour & Travel.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Bagaimana cara memesan paket tour?", acceptedAnswer: { "@type": "Answer", text: "Hubungi WhatsApp 0818-548-833 atau klik tombol booking di website." } },
    { "@type": "Question", name: "Bisa custom paket tour?", acceptedAnswer: { "@type": "Answer", text: "Tentu! Kami melayani custom tour sesuai budget dan kebutuhan." } },
    { "@type": "Question", name: "Berapa minimal peserta gathering?", acceptedAnswer: { "@type": "Answer", text: "Minimal 20 orang untuk paket gathering perusahaan." } },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AppShell>
        <TopBar />
        <FAQ />
      </AppShell>
    </>
  );
}

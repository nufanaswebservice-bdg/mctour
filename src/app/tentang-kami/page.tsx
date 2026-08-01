import { Metadata } from "next";
import dynamic from "next/dynamic";

const AboutContent = dynamic(() => import("@/components/pages/AboutContent"));

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "mcTour & Travel adalah perusahaan travel terpercaya dengan pengalaman lebih dari 15 tahun melayani perjalanan wisata, gathering, dan event organizer di seluruh Indonesia.",
  openGraph: {
    title: "Tentang Kami - mcTour & Travel",
    description:
      "mcTour & Travel adalah perusahaan travel terpercaya dengan pengalaman lebih dari 15 tahun.",
  },
};

export default function TentangKamiPage() {
  return <AboutContent />;
}

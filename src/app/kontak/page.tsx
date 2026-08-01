import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactContent = dynamic(() => import("@/components/pages/ContactContent"));

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi mcTour & Travel untuk konsultasi dan booking perjalanan. Tersedia WhatsApp, telepon, email, dan kunjungan langsung ke kantor kami.",
};

export default function KontakPage() {
  return <ContactContent />;
}

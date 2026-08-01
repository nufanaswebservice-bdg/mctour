import { Metadata } from "next";
import dynamic from "next/dynamic";

const DomesticTourSection = dynamic(() => import("@/components/sections/DomesticTourSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export const metadata: Metadata = {
  title: "Paket Tour Domestik - Wisata Bali, Lombok, Jogja, Bromo, Dieng",
  description:
    "Paket tour domestik terbaik ke Bali, Lombok, Jogja, Bromo, dan Dieng. Harga terjangkau, fasilitas lengkap, tour guide profesional.",
};

export default function PaketTourDomestikPage() {
  return (
    <div className="pt-24">
      <DomesticTourSection />
      <CTASection />
    </div>
  );
}

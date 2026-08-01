import { Metadata } from "next";
import dynamic from "next/dynamic";

const InternationalTourSection = dynamic(() => import("@/components/sections/InternationalTourSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export const metadata: Metadata = {
  title: "Paket Tour Luar Negeri - Korea, Jepang, Thailand, China, Eropa",
  description:
    "Paket tour luar negeri ke Korea, Jepang, Thailand, China, dan Eropa. Lengkap dengan tiket pesawat, hotel, guide, dan itinerary.",
};

export default function PaketTourLuarNegeriPage() {
  return (
    <div className="pt-24">
      <InternationalTourSection />
      <CTASection />
    </div>
  );
}

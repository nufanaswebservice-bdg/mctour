import { Metadata } from "next";
import dynamic from "next/dynamic";

const UmrohSection = dynamic(() => import("@/components/sections/UmrohSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export const metadata: Metadata = {
  title: "Paket Umroh & Haji - Perjalanan Ibadah Terpercaya",
  description:
    "Paket umroh dan haji terpercaya dengan pembimbing berpengalaman, hotel dekat Masjidil Haram, dan pelayanan prima. Reguler, Plus, dan VIP.",
};

export default function UmrohHajiPage() {
  return (
    <div className="pt-24">
      <UmrohSection />
      <CTASection />
    </div>
  );
}

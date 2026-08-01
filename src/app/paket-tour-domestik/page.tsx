import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const DomesticPackages = dynamic(() => import("@/components/app/DomesticPackages"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Paket Tour Domestik - Wisata Bali, Lombok, Jogja, Bromo, Dieng",
  description:
    "Paket tour domestik terbaik ke Bali, Lombok, Jogja, Bromo, dan Dieng. Harga terjangkau, fasilitas lengkap, tour guide profesional.",
};

export default function PaketTourDomestikPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="pt-4 px-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Paket Tour <span className="gradient-text">Domestik</span>
        </h1>
        <p className="text-sm text-muted mb-4">Jelajahi keindahan Indonesia bersama kami</p>
      </div>
      <DomesticPackages />
      <CTABanner />
    </AppShell>
  );
}

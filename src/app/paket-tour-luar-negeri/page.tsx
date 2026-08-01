import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const InternationalPackages = dynamic(() => import("@/components/app/InternationalPackages"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Paket Tour Luar Negeri - Korea, Jepang, Thailand, China, Eropa",
  description:
    "Paket tour luar negeri ke Korea, Jepang, Thailand, China, dan Eropa. Lengkap dengan tiket pesawat, hotel, guide, dan itinerary.",
};

export default function PaketTourLuarNegeriPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="pt-4 px-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Tour <span className="gradient-text">Luar Negeri</span>
        </h1>
        <p className="text-sm text-muted mb-4">Eksplorasi dunia bersama mcTour & Travel</p>
      </div>
      <InternationalPackages />
      <CTABanner />
    </AppShell>
  );
}

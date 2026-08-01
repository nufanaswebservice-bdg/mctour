import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const WhyChooseUs = dynamic(() => import("@/components/app/WhyChooseUs"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Outbound & Team Building",
  description: "Program outbound dan team building profesional untuk perusahaan, sekolah, dan komunitas.",
};

export default function OutboundPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="pt-4 px-4">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Outbound & <span className="gradient-text">Team Building</span>
        </h1>
        <p className="text-sm text-muted mb-4">Program seru untuk membangun tim Anda</p>
      </div>
      <WhyChooseUs />
      <CTABanner />
    </AppShell>
  );
}

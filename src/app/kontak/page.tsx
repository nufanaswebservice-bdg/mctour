import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const ContactPage = dynamic(() => import("@/components/app/ContactPage"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi mcTour & Travel untuk konsultasi dan booking perjalanan. WhatsApp 0818-548-833.",
};

export default function KontakPage() {
  return (
    <AppShell>
      <TopBar />
      <ContactPage />
      <CTABanner />
    </AppShell>
  );
}

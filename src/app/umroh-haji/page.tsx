import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const UmrohHajiPage = dynamic(() => import("@/components/umroh/UmrohHajiPage"));

export const metadata: Metadata = {
  title: "Paket Umroh & Haji Plus - Perjalanan Ibadah Terpercaya",
  description:
    "Paket umroh reguler, plus, VIP dan haji plus terpercaya. Pembimbing berpengalaman, hotel dekat Masjidil Haram, maskapai terbaik. Berangkat pasti!",
  openGraph: {
    title: "Paket Umroh & Haji Plus - mcTour & Travel",
    description: "Perjalanan ibadah dengan pelayanan terbaik dan pembimbing berpengalaman.",
  },
};

export default function UmrohHaji() {
  return (
    <AppShell>
      <TopBar />
      <UmrohHajiPage />
    </AppShell>
  );
}

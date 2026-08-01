import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const Gallery = dynamic(() => import("@/components/app/Gallery"));

export const metadata: Metadata = {
  title: "Galeri Perjalanan",
  description: "Galeri foto perjalanan mcTour & Travel. Momen indah bersama pelanggan kami.",
};

export default function GaleriPage() {
  return (
    <AppShell>
      <TopBar />
      <Gallery />
    </AppShell>
  );
}

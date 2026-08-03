import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const RentalPage = dynamic(() => import("@/components/rental/RentalPage"));

export const metadata: Metadata = {
  title: "Rental Mobil & Bus Pariwisata - Armada Bersih, Driver Profesional",
  description:
    "Sewa mobil & bus pariwisata dengan harga terbaik. Toyota Avanza, Innova, Fortuner, Alphard, Hiace, Elf, Medium Bus, Big Bus. Booking mudah, driver profesional.",
  openGraph: {
    title: "Rental Mobil & Bus - mcTour & Travel",
    description: "Sewa kendaraan pariwisata terbaik. Armada bersih, driver profesional, harga kompetitif.",
  },
};

export default function RentalKendaraanPage() {
  return (
    <AppShell>
      <TopBar />
      <RentalPage />
    </AppShell>
  );
}

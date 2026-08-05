import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const FlightPage = dynamic(() => import("@/components/flight/FlightPage"));

export const metadata: Metadata = {
  title: "Tiket Pesawat - Booking Penerbangan Domestik & Internasional",
  description:
    "Booking tiket pesawat murah domestik dan internasional. Garuda, Lion Air, Citilink, AirAsia, Singapore Airlines, dan maskapai lainnya. Harga terbaik, booking mudah.",
  openGraph: {
    title: "Tiket Pesawat - mcTour & Travel",
    description: "Cari & booking tiket pesawat murah ke seluruh dunia.",
  },
};

export default function TiketPesawatPage() {
  return (
    <AppShell>
      <TopBar />
      <FlightPage />
    </AppShell>
  );
}

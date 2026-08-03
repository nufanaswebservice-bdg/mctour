import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const HotelPage = dynamic(() => import("@/components/hotel/HotelPage"));

export const metadata: Metadata = {
  title: "Booking Hotel - Penginapan Terbaik Domestik & Internasional",
  description:
    "Booking hotel murah di seluruh dunia. Bintang 3-5, resort, villa, apartment. Free cancellation, pay later, harga terbaik. mcTour & Travel.",
  openGraph: {
    title: "Booking Hotel - mcTour & Travel",
    description: "Temukan hotel terbaik dengan harga kompetitif. Free cancellation & pay later.",
  },
};

export default function Hotel() {
  return (
    <AppShell>
      <TopBar />
      <HotelPage />
    </AppShell>
  );
}

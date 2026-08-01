import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const WishlistPage = dynamic(() => import("@/components/app/WishlistPage"));

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Paket tour favorit Anda di mcTour & Travel.",
};

export default function Wishlist() {
  return (
    <AppShell>
      <TopBar />
      <WishlistPage />
    </AppShell>
  );
}

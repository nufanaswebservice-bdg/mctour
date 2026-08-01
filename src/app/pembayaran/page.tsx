import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const PaymentPage = dynamic(() => import("@/components/app/PaymentPage"));

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "Halaman pembayaran mcTour & Travel.",
};

export default function Pembayaran() {
  return (
    <AppShell>
      <TopBar />
      <PaymentPage />
    </AppShell>
  );
}

import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const AccountPage = dynamic(() => import("@/components/app/AccountPage"));

export const metadata: Metadata = {
  title: "Akun Saya",
  description: "Kelola akun Anda di mcTour & Travel.",
};

export default function Akun() {
  return (
    <AppShell>
      <TopBar />
      <AccountPage />
    </AppShell>
  );
}

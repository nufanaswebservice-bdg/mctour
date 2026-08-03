import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const LoginPage = dynamic(() => import("@/components/auth/LoginPage"));

export const metadata: Metadata = {
  title: "Login - Masuk ke Akun Anda",
  description: "Login ke mcTour & Travel menggunakan akun Google Anda.",
};

export default function Login() {
  return (
    <AppShell>
      <TopBar />
      <LoginPage />
    </AppShell>
  );
}

import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Tiket Pesawat - Booking Murah",
  description: "Booking tiket pesawat murah domestik dan internasional. Semua maskapai tersedia.",
};

export default function TiketPesawatPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Tiket <span className="gradient-text">Pesawat</span>
        </h1>
        <p className="text-sm text-muted mb-6">Booking tiket domestik & internasional</p>

        <div className="glass-card p-5 space-y-3">
          <div className="p-3 rounded-2xl bg-background/80 border border-primary/5">
            <p className="text-[10px] text-muted mb-0.5">Dari</p>
            <p className="text-sm font-semibold text-dark-text">Jakarta (CGK)</p>
          </div>
          <div className="p-3 rounded-2xl bg-background/80 border border-primary/5">
            <p className="text-[10px] text-muted mb-0.5">Ke</p>
            <p className="text-sm font-semibold text-dark-text">Bali (DPS)</p>
          </div>
          <a
            href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20cek%20harga%20tiket%20pesawat."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-sm"
          >
            Cek Harga via WhatsApp
          </a>
        </div>
      </div>
      <CTABanner />
    </AppShell>
  );
}

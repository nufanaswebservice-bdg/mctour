import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Rental Bus Pariwisata - Sewa Bus untuk Perjalanan",
  description: "Sewa bus pariwisata untuk gathering, tour, study tour, dan perjalanan rombongan. Armada bersih, driver profesional.",
};

const fleets = [
  { emoji: "🚐", title: "Minibus 12-15 Seat", desc: "Cocok untuk keluarga & rombongan kecil", price: "Mulai Rp 1.5jt/hari" },
  { emoji: "🚌", title: "Medium Bus 25-30 Seat", desc: "Ideal untuk grup menengah & kantor", price: "Mulai Rp 2.5jt/hari" },
  { emoji: "🚍", title: "Big Bus 40-50 Seat", desc: "Untuk rombongan besar & gathering", price: "Mulai Rp 3.5jt/hari" },
  { emoji: "✨", title: "Bus Executive 35 Seat", desc: "Premium seat dengan leg room luas", price: "Mulai Rp 5jt/hari" },
  { emoji: "🎉", title: "Bus Suite Class 25 Seat", desc: "Seat mewah untuk VIP tour", price: "Mulai Rp 7jt/hari" },
];

export default function RentalBusPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Rental <span className="gradient-text">Bus</span>
        </h1>
        <p className="text-sm text-muted mb-6">Armada bersih, driver profesional, harga kompetitif</p>

        <div className="space-y-3 mb-6">
          {fleets.map((item) => (
            <div key={item.title} className="glass-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1">
                <h2 className="text-sm font-bold text-dark-text">{item.title}</h2>
                <p className="text-[11px] text-muted">{item.desc}</p>
                <p className="text-xs text-primary font-bold mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20sewa%20bus."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full text-sm"
        >
          Cek Ketersediaan via WhatsApp
        </a>
      </div>
      <CTABanner />
    </AppShell>
  );
}

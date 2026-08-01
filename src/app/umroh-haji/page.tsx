import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Paket Umroh & Haji - Perjalanan Ibadah Terpercaya",
  description: "Paket umroh dan haji terpercaya dengan pembimbing berpengalaman dan pelayanan prima.",
};

const packages = [
  { title: "Reguler", price: "Rp 28jt", duration: "9 Hari", hotel: "Bintang 3", airline: "Saudi Airlines", popular: false },
  { title: "Plus", price: "Rp 35jt", duration: "9 Hari", hotel: "Bintang 4", airline: "Garuda", popular: true },
  { title: "VIP", price: "Rp 55jt", duration: "12 Hari", hotel: "Bintang 5", airline: "Garuda", popular: false },
];

export default function UmrohHajiPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Umroh & <span className="gradient-text">Haji</span>
        </h1>
        <p className="text-sm text-muted mb-6">Perjalanan ibadah dengan pelayanan terbaik</p>

        <div className="space-y-3">
          {packages.map((pkg) => (
            <div key={pkg.title} className={`glass-card p-5 ${pkg.popular ? "ring-2 ring-primary" : ""}`}>
              {pkg.popular && (
                <span className="inline-block px-2 py-0.5 rounded-lg bg-primary text-white text-[10px] font-bold mb-2">Populer</span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-dark-text">
                    Paket {pkg.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    {pkg.duration} · {pkg.airline} · {pkg.hotel}
                  </p>
                </div>
                <p className="text-lg font-bold text-primary font-[family-name:var(--font-heading)]">
                  {pkg.price}
                </p>
              </div>
              <a
                href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20tertarik%20paket%20umroh."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full text-xs mt-3"
              >
                Daftar Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
      <CTABanner />
    </AppShell>
  );
}

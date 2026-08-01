import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Pengurusan Visa - Cepat & Terpercaya",
  description: "Jasa pengurusan visa ke berbagai negara. Proses cepat, dokumen lengkap, tingkat keberhasilan tinggi.",
};

const visas = [
  { emoji: "🇯🇵", title: "Visa Jepang", desc: "Tourist & Business Visa", time: "5-10 hari kerja" },
  { emoji: "🇰🇷", title: "Visa Korea Selatan", desc: "Tourist & Multiple Entry", time: "5-7 hari kerja" },
  { emoji: "🇨🇳", title: "Visa China", desc: "Tourist, Business, Transit", time: "5-7 hari kerja" },
  { emoji: "🇪🇺", title: "Visa Schengen (Eropa)", desc: "Akses 26 negara Eropa", time: "10-15 hari kerja" },
  { emoji: "🇺🇸", title: "Visa Amerika Serikat", desc: "Tourist B1/B2", time: "Jadwal interview" },
  { emoji: "🇦🇺", title: "Visa Australia", desc: "Tourist & Visitor Visa", time: "7-14 hari kerja" },
  { emoji: "🇬🇧", title: "Visa Inggris (UK)", desc: "Standard Visitor Visa", time: "10-15 hari kerja" },
  { emoji: "🇮🇳", title: "Visa India", desc: "Tourist & E-Visa", time: "3-5 hari kerja" },
];

export default function VisaPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Pengurusan <span className="gradient-text">Visa</span>
        </h1>
        <p className="text-sm text-muted mb-6">Proses cepat, tingkat keberhasilan tinggi</p>

        <div className="space-y-3 mb-6">
          {visas.map((item) => (
            <div key={item.title} className="glass-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <h2 className="text-sm font-bold text-dark-text">{item.title}</h2>
                <p className="text-[11px] text-muted">{item.desc}</p>
              </div>
              <span className="text-[10px] text-primary font-semibold whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20konsultasi%20pengurusan%20visa."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full text-sm"
        >
          Konsultasi Visa via WhatsApp
        </a>
      </div>
      <CTABanner />
    </AppShell>
  );
}

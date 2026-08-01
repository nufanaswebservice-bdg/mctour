import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Dokumen Perjalanan - Paspor, Visa, KITAS",
  description: "Jasa pengurusan dokumen perjalanan: paspor, visa, KITAS. Proses cepat dan terpercaya.",
};

const docs = [
  { emoji: "📕", title: "Paspor", desc: "Pembuatan & perpanjangan", time: "3-5 hari" },
  { emoji: "📋", title: "Visa", desc: "Pengurusan ke berbagai negara", time: "5-14 hari" },
  { emoji: "🪪", title: "KITAS", desc: "Izin tinggal terbatas WNA", time: "7-21 hari" },
  { emoji: "📄", title: "Dokumen Travel", desc: "Surat perjalanan lainnya", time: "Bervariasi" },
];

export default function DokumenPerjalananPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Dokumen <span className="gradient-text">Perjalanan</span>
        </h1>
        <p className="text-sm text-muted mb-6">Pengurusan dokumen cepat & terpercaya</p>

        <div className="space-y-3">
          {docs.map((doc) => (
            <div key={doc.title} className="glass-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
              <span className="text-2xl">{doc.emoji}</span>
              <div className="flex-1">
                <h2 className="text-sm font-bold text-dark-text">{doc.title}</h2>
                <p className="text-[11px] text-muted">{doc.desc}</p>
              </div>
              <span className="text-[10px] text-primary font-semibold">{doc.time}</span>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20butuh%20bantuan%20pengurusan%20dokumen."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full text-sm mt-5"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
      <CTABanner />
    </AppShell>
  );
}

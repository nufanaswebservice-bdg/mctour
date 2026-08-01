import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Study Tour - Wisata Edukasi Pelajar",
  description: "Paket study tour dan wisata edukasi untuk pelajar SD, SMP, SMA, dan mahasiswa. Aman, edukatif, dan berkesan.",
};

const packages = [
  { emoji: "🏫", title: "Study Tour SD", desc: "Wisata edukasi untuk siswa Sekolah Dasar", duration: "1-2 Hari" },
  { emoji: "📚", title: "Study Tour SMP", desc: "Perjalanan belajar tingkat menengah pertama", duration: "2-3 Hari" },
  { emoji: "🎓", title: "Study Tour SMA", desc: "Eksplorasi kampus & destinasi edukasi", duration: "3-4 Hari" },
  { emoji: "🏛️", title: "Study Tour Kampus", desc: "Kunjungan universitas & industri", duration: "3-5 Hari" },
  { emoji: "🏭", title: "Kunjungan Industri", desc: "Field trip ke pabrik & perusahaan", duration: "1 Hari" },
  { emoji: "🌿", title: "Wisata Alam Edukasi", desc: "Belajar di alam terbuka", duration: "2 Hari" },
];

export default function StudyTourPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Study <span className="gradient-text">Tour</span>
        </h1>
        <p className="text-sm text-muted mb-6">Wisata edukasi aman & berkesan untuk pelajar</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {packages.map((pkg) => (
            <div key={pkg.title} className="glass-card p-4 flex items-start gap-3 active:scale-[0.98] transition-transform">
              <span className="text-2xl">{pkg.emoji}</span>
              <div className="flex-1">
                <h2 className="text-sm font-bold text-dark-text">{pkg.title}</h2>
                <p className="text-[11px] text-muted mt-0.5">{pkg.desc}</p>
                <p className="text-[10px] text-primary font-semibold mt-1">⏱ {pkg.duration}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20info%20paket%20study%20tour."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full text-sm"
        >
          Konsultasi Study Tour via WhatsApp
        </a>
      </div>
      <CTABanner />
    </AppShell>
  );
}

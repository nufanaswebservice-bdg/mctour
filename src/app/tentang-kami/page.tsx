import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "mcTour & Travel adalah perusahaan travel terpercaya dengan pengalaman lebih dari 15 tahun melayani perjalanan wisata, gathering, dan event organizer.",
};

export default function TentangKamiPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Tentang <span className="gradient-text">Kami</span>
        </h1>
        <p className="text-sm text-muted mb-6">15+ tahun melayani Indonesia</p>

        <div className="space-y-4">
          <div className="glass-card p-5">
            <p className="text-sm text-dark-text/70 leading-relaxed">
              mcTour & Travel didirikan dengan visi menjadi mitra perjalanan terpercaya. Berawal dari kecintaan terhadap dunia pariwisata, kami tumbuh melayani ribuan pelanggan setiap tahunnya.
            </p>
            <p className="text-sm text-dark-text/70 leading-relaxed mt-3">
              Dengan tim profesional, armada berkualitas, dan jaringan partnership yang luas, kami berkomitmen memberikan layanan perjalanan terbaik dengan harga kompetitif.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">15+</p>
              <p className="text-[11px] text-muted">Tahun Pengalaman</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">10K+</p>
              <p className="text-[11px] text-muted">Pelanggan Puas</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">250+</p>
              <p className="text-[11px] text-muted">Gathering Sukses</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary font-[family-name:var(--font-heading)]">4.9/5</p>
              <p className="text-[11px] text-muted">Rating</p>
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="text-base font-bold font-[family-name:var(--font-heading)] text-dark-text mb-3">📍 Alamat</h2>
            <p className="text-sm text-dark-text/70 leading-relaxed">
              Mall Ambasador, Jl. Prof. DR. Satrio Lantai LG Blok A69, RT.11/RW.4, Kuningan, Karet Kuningan, Kec. Setiabudi, Kota Jakarta Selatan, DKI Jakarta 12940
            </p>
            <p className="text-sm text-dark-text/70 mt-2">📱 WhatsApp: 0818-548-833</p>
            <p className="text-sm text-dark-text/70">🕐 Senin - Sabtu, 08:00 - 20:00</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

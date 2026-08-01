import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));

export const metadata: Metadata = {
  title: "Booking Hotel - Penginapan Terbaik",
  description: "Booking hotel dan penginapan di seluruh Indonesia dan internasional. Harga terbaik, lokasi strategis.",
};

const hotels = [
  { emoji: "⭐⭐⭐", title: "Hotel Bintang 3", desc: "Bersih, nyaman, harga terjangkau", price: "Mulai Rp 350rb/malam" },
  { emoji: "⭐⭐⭐⭐", title: "Hotel Bintang 4", desc: "Fasilitas lengkap, lokasi strategis", price: "Mulai Rp 600rb/malam" },
  { emoji: "⭐⭐⭐⭐⭐", title: "Hotel Bintang 5", desc: "Premium, mewah, pelayanan terbaik", price: "Mulai Rp 1.2jt/malam" },
  { emoji: "🏡", title: "Villa & Resort", desc: "Private villa untuk keluarga & grup", price: "Mulai Rp 800rb/malam" },
  { emoji: "🏨", title: "Homestay & Guest House", desc: "Budget friendly, suasana lokal", price: "Mulai Rp 200rb/malam" },
];

export default function HotelPage() {
  return (
    <AppShell>
      <TopBar />
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-text mb-1">
          Booking <span className="gradient-text">Hotel</span>
        </h1>
        <p className="text-sm text-muted mb-6">Penginapan terbaik di seluruh Indonesia</p>

        <div className="space-y-3 mb-6">
          {hotels.map((item) => (
            <div key={item.title} className="glass-card p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.emoji}</span>
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-dark-text">{item.title}</h2>
                  <p className="text-[11px] text-muted">{item.desc}</p>
                </div>
              </div>
              <p className="text-xs text-primary font-bold mt-2">{item.price}</p>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/62818548833?text=Halo%20mcTour%2C%20saya%20ingin%20booking%20hotel."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full text-sm"
        >
          Cek Harga Hotel via WhatsApp
        </a>
      </div>
      <CTABanner />
    </AppShell>
  );
}

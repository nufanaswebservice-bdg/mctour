import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const TourDetail = dynamic(() => import("@/components/app/TourDetail"));

const tours: Record<string, {
  name: string;
  location: string;
  duration: string;
  price: string;
  originalPrice: string;
  rating: number;
  image: string;
  description: string;
  itinerary: string[];
  facilities: string[];
  includes: string[];
  excludes: string[];
}> = {
  "bali-paradise": {
    name: "Bali Paradise",
    location: "Bali",
    duration: "4 Hari 3 Malam",
    price: "Rp 2.500.000",
    originalPrice: "Rp 3.200.000",
    rating: 4.9,
    image: "/tour-bali.png",
    description: "Jelajahi keindahan Pulau Dewata dengan paket lengkap. Kunjungi pantai eksotis, pura bersejarah, sawah terasering, dan nikmati sunset terbaik di dunia.",
    itinerary: [
      "Hari 1: Bandara - Hotel Check-in - Pantai Kuta - Tanah Lot (Sunset)",
      "Hari 2: Ubud - Tegallalang Rice Terrace - Monkey Forest - Tirta Empul",
      "Hari 3: Nusa Penida / Watersport - Uluwatu - Jimbaran Dinner",
      "Hari 4: Belanja Oleh-oleh - Airport Transfer",
    ],
    facilities: ["Hotel Bintang 3/4", "Transport AC", "Tour Guide", "Tiket Wisata", "Makan 3x/hari"],
    includes: ["Asuransi Perjalanan", "Air Mineral", "Dokumentasi", "P3K"],
    excludes: ["Tiket Pesawat", "Pengeluaran Pribadi", "Tips Guide"],
  },
  "jogja-heritage": {
    name: "Jogja Heritage",
    location: "Yogyakarta",
    duration: "3 Hari 2 Malam",
    price: "Rp 1.800.000",
    originalPrice: "Rp 2.300.000",
    rating: 4.9,
    image: "/tour-jogja.png",
    description: "Wisata budaya dan sejarah di kota pelajar. Kunjungi candi megah, keraton, dan nikmati kuliner khas Jogja yang legendaris.",
    itinerary: [
      "Hari 1: Bandara/Stasiun - Candi Prambanan - Malioboro - Hotel",
      "Hari 2: Borobudur Sunrise - Keraton - Taman Sari - Alun-alun Kidul",
      "Hari 3: Pantai Parangtritis - Oleh-oleh - Airport Transfer",
    ],
    facilities: ["Hotel Bintang 3", "Transport AC", "Tour Guide", "Tiket Wisata", "Makan 3x/hari"],
    includes: ["Asuransi Perjalanan", "Air Mineral", "Dokumentasi"],
    excludes: ["Tiket Pesawat/Kereta", "Pengeluaran Pribadi", "Tips Guide"],
  },
  "bromo-sunrise": {
    name: "Bromo Sunrise",
    location: "Jawa Timur",
    duration: "2 Hari 1 Malam",
    price: "Rp 1.500.000",
    originalPrice: "Rp 1.900.000",
    rating: 4.8,
    image: "/tour-bromo.png",
    description: "Saksikan sunrise spektakuler dari puncak Gunung Bromo. Jelajahi lautan pasir, kawah aktif, dan pemandangan alam yang menakjubkan.",
    itinerary: [
      "Hari 1: Meeting Point Surabaya/Malang - Penginapan Bromo - Free Time",
      "Hari 2: Sunrise Viewpoint (03:00) - Jeep Tour - Kawah Bromo - Pasir Berbisik - Kembali",
    ],
    facilities: ["Penginapan", "Jeep 4WD", "Tour Guide", "Tiket Masuk"],
    includes: ["Asuransi", "Masker", "Jaket (pinjam)", "Air Mineral"],
    excludes: ["Transportasi ke Meeting Point", "Sewa Kuda", "Pengeluaran Pribadi"],
  },
  "lombok-adventure": {
    name: "Lombok Adventure",
    location: "NTB",
    duration: "3 Hari 2 Malam",
    price: "Rp 2.200.000",
    originalPrice: "Rp 2.800.000",
    rating: 4.8,
    image: "/tour-lombok.png",
    description: "Petualangan di Lombok dengan pantai berpasir putih, Gili Trawangan yang eksotis, dan pemandangan Gunung Rinjani yang megah.",
    itinerary: [
      "Hari 1: Bandara Lombok - Pantai Kuta Lombok - Tanjung Aan - Hotel",
      "Hari 2: Gili Trawangan - Snorkeling - Glass Bottom Boat - Sunset Point",
      "Hari 3: Sendang Gile Waterfall - Sasak Village - Airport Transfer",
    ],
    facilities: ["Hotel Bintang 3", "Transport AC", "Boat Transfer", "Snorkeling Gear", "Makan 3x/hari"],
    includes: ["Asuransi Perjalanan", "Air Mineral", "Dokumentasi"],
    excludes: ["Tiket Pesawat", "Diving", "Pengeluaran Pribadi"],
  },
  "dieng-plateau": {
    name: "Dieng Plateau",
    location: "Jawa Tengah",
    duration: "2 Hari 1 Malam",
    price: "Rp 1.200.000",
    originalPrice: "Rp 1.500.000",
    rating: 4.7,
    image: "/tour-dieng.png",
    description: "Negeri di atas awan dengan golden sunrise, telaga warna yang memukau, dan candi Hindu tertua di Jawa. Udara sejuk pegunungan yang menyegarkan.",
    itinerary: [
      "Hari 1: Meeting Point - Telaga Warna - Kawah Sikidang - Candi Arjuna - Penginapan",
      "Hari 2: Golden Sunrise Sikunir (03:30) - Bukit Sikunir - Kembali",
    ],
    facilities: ["Penginapan", "Transport AC", "Tour Guide", "Tiket Masuk"],
    includes: ["Asuransi", "Jaket", "Air Mineral", "Snack"],
    excludes: ["Transportasi ke Meeting Point", "Makan di luar paket", "Pengeluaran Pribadi"],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours[slug];
  if (!tour) return { title: "Tour Tidak Ditemukan" };
  return {
    title: `${tour.name} - Paket Tour ${tour.location}`,
    description: tour.description,
  };
}

export function generateStaticParams() {
  return Object.keys(tours).map((slug) => ({ slug }));
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = tours[slug];

  if (!tour) {
    return (
      <AppShell>
        <TopBar />
        <div className="px-4 pt-10 text-center">
          <p className="text-lg font-bold text-dark-text">Tour tidak ditemukan</p>
          <a href="/paket-tour-domestik" className="btn-primary inline-block mt-4 text-sm">Kembali</a>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopBar />
      <TourDetail tour={tour} slug={slug} />
    </AppShell>
  );
}

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
  "bangkok-exotic": {
    name: "Bangkok Exotic",
    location: "Thailand",
    duration: "4 Hari 3 Malam",
    price: "Rp 5.500.000",
    originalPrice: "Rp 7.000.000",
    rating: 4.9,
    image: "/tour-bangkok.png",
    description: "Jelajahi kota Bangkok yang eksotis dengan kuil-kuil megah, street food legendaris, floating market, dan kehidupan malam yang semarak. Perpaduan sempurna budaya dan modernitas.",
    itinerary: [
      "Hari 1: Tiba di Bangkok - Hotel Check-in - Khao San Road - Asiatique Night Market",
      "Hari 2: Grand Palace - Wat Pho - Wat Arun - Chao Phraya River Cruise",
      "Hari 3: Floating Market Damnoen Saduak - Safari World - MBK Shopping",
      "Hari 4: Free Time Shopping - Airport Transfer",
    ],
    facilities: ["Hotel Bintang 4", "Tiket Pesawat PP", "Transport AC", "Tour Guide Bahasa Indonesia", "Makan 3x/hari"],
    includes: ["Asuransi Perjalanan", "Visa on Arrival", "Air Mineral", "City Tour", "Tiket Wisata"],
    excludes: ["Pengeluaran Pribadi", "Optional Tour", "Tips Guide", "Exceed Baggage"],
  },
  "korea-autumn": {
    name: "Korea Autumn",
    location: "Korea Selatan",
    duration: "6 Hari 5 Malam",
    price: "Rp 15.000.000",
    originalPrice: "Rp 18.000.000",
    rating: 4.9,
    image: "/tour-korea.png",
    description: "Nikmati keindahan musim gugur Korea Selatan. Daun maple berwarna merah keemasan, K-Culture, kuliner otentik, dan pengalaman belanja di Myeongdong.",
    itinerary: [
      "Hari 1: Tiba di Incheon - Hotel Check-in - Myeongdong Shopping",
      "Hari 2: Gyeongbokgung Palace - Bukchon Hanok Village - Insadong - N Seoul Tower",
      "Hari 3: Nami Island - Petite France - Garden of Morning Calm",
      "Hari 4: Everland Theme Park - Korean BBQ Dinner",
      "Hari 5: DMZ Tour - Hongdae - K-Star Road - Gangnam",
      "Hari 6: Duty Free Shopping - Airport Transfer - Pulang",
    ],
    facilities: ["Hotel Bintang 4", "Tiket Pesawat PP (Korean Air)", "Transport AC", "Tour Guide", "Makan 3x/hari"],
    includes: ["Visa Korea", "Asuransi Perjalanan", "Tiket Wisata", "Wi-Fi Egg", "Winter Jacket (musim dingin)"],
    excludes: ["Pengeluaran Pribadi", "Optional Tour", "Tips Guide", "Laundry"],
  },
  "japan-sakura": {
    name: "Japan Sakura",
    location: "Jepang",
    duration: "7 Hari 6 Malam",
    price: "Rp 22.000.000",
    originalPrice: "Rp 26.000.000",
    rating: 4.9,
    image: "/tour-japan.png",
    description: "Perjalanan impian ke Negeri Sakura. Tokyo yang futuristik, Kyoto yang tradisional, Osaka yang penuh kuliner, dan pemandangan Gunung Fuji yang ikonik.",
    itinerary: [
      "Hari 1: Tiba di Tokyo Narita - Hotel - Shibuya Crossing - Shinjuku",
      "Hari 2: Asakusa - Senso-ji Temple - Akihabara - Tokyo Skytree",
      "Hari 3: Mt. Fuji 5th Station - Kawaguchiko Lake - Gotemba Outlet",
      "Hari 4: Shinkansen ke Kyoto - Fushimi Inari - Kinkakuji - Arashiyama",
      "Hari 5: Nara Deer Park - Todai-ji Temple - Transfer ke Osaka",
      "Hari 6: Osaka Castle - Dotonbori - Shinsaibashi Shopping - Kuromon Market",
      "Hari 7: Free Time - Kansai Airport - Pulang",
    ],
    facilities: ["Hotel Bintang 4", "Tiket Pesawat PP (ANA/JAL)", "Shinkansen", "Tour Guide", "Makan 3x/hari"],
    includes: ["Visa Jepang", "Asuransi", "Japan Rail Pass", "Tiket Wisata", "Wi-Fi Router", "Bagasi 23kg"],
    excludes: ["Pengeluaran Pribadi", "Optional Tour", "Tips Guide", "Extra Bagasi"],
  },
  "china-discovery": {
    name: "China Discovery",
    location: "China",
    duration: "5 Hari 4 Malam",
    price: "Rp 9.800.000",
    originalPrice: "Rp 12.000.000",
    rating: 4.8,
    image: "/tour-china.png",
    description: "Jelajahi peradaban tertua dunia. Great Wall yang megah, Forbidden City yang misterius, dan kuliner autentik China yang menggugah selera.",
    itinerary: [
      "Hari 1: Tiba di Beijing - Hotel - Wangfujing Street",
      "Hari 2: Tiananmen Square - Forbidden City - Temple of Heaven",
      "Hari 3: Great Wall of China (Badaling) - Ming Tombs - Jade Factory",
      "Hari 4: Summer Palace - Hutong Rickshaw Tour - Peking Duck Dinner",
      "Hari 5: Olympic Stadium (Bird's Nest) - Silk Market - Airport Transfer",
    ],
    facilities: ["Hotel Bintang 4", "Tiket Pesawat PP", "Transport AC", "Tour Guide", "Makan 3x/hari"],
    includes: ["Visa China", "Asuransi Perjalanan", "Tiket Wisata", "Air Mineral"],
    excludes: ["Pengeluaran Pribadi", "Optional Tour", "Tips Guide", "Laundry"],
  },
  "europe-wonder": {
    name: "Europe Wonder",
    location: "Eropa",
    duration: "10 Hari 9 Malam",
    price: "Rp 35.000.000",
    originalPrice: "Rp 42.000.000",
    rating: 4.9,
    image: "/tour-europe.png",
    description: "Grand tour Eropa melewati 4 negara. Paris yang romantis, Amsterdam yang artistik, Swiss yang memukau, dan Roma yang bersejarah. Pengalaman seumur hidup.",
    itinerary: [
      "Hari 1: Tiba di Paris - Hotel Check-in - Champs-Élysées",
      "Hari 2: Eiffel Tower - Louvre Museum - Seine River Cruise - Montmartre",
      "Hari 3: Versailles Palace - Transfer ke Amsterdam (Thalys Train)",
      "Hari 4: Amsterdam Canal Cruise - Rijksmuseum - Keukenhof/Zaanse Schans",
      "Hari 5: Transfer ke Swiss - Lucerne - Chapel Bridge - Lion Monument",
      "Hari 6: Mt. Titlis / Jungfraujoch - Swiss Chocolate Factory",
      "Hari 7: Transfer ke Italy - Milan - Lake Como",
      "Hari 8: Venice - St. Mark's Square - Gondola Ride",
      "Hari 9: Rome - Colosseum - Trevi Fountain - Vatican City",
      "Hari 10: Roma - Airport Transfer - Pulang",
    ],
    facilities: ["Hotel Bintang 4-5", "Tiket Pesawat PP (Emirates)", "Eurostar/Train", "Tour Guide", "Makan 2x/hari"],
    includes: ["Visa Schengen", "Asuransi Perjalanan", "Tiket Wisata", "City Tax", "Bagasi 30kg", "Porter"],
    excludes: ["Pengeluaran Pribadi", "Makan Siang (beberapa hari)", "Optional Tour", "Tips Guide"],
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

export default async function IntlTourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = tours[slug];

  if (!tour) {
    return (
      <AppShell>
        <TopBar />
        <div className="px-4 pt-10 text-center">
          <p className="text-lg font-bold text-dark-text">Tour tidak ditemukan</p>
          <a href="/paket-tour-luar-negeri" className="btn-primary inline-block mt-4 text-sm">Kembali</a>
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

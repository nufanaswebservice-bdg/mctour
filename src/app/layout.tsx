import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "mcTour & Travel - Gathering Nyaman Bersama mcTour & Travel",
    template: "%s | mcTour & Travel",
  },
  description:
    "mcTour & Travel melayani segala kebutuhan perjalanan Anda dengan pelayanan profesional, armada terbaik, dan harga kompetitif. Paket Tour, Outbound, Event Organizer, Umroh & Haji.",
  keywords: [
    "tour travel",
    "paket tour",
    "gathering perusahaan",
    "outbound",
    "event organizer",
    "umroh",
    "haji",
    "tiket pesawat",
    "wisata bali",
    "wisata jogja",
    "wisata bromo",
  ],
  authors: [{ name: "mcTour & Travel" }],
  creator: "mcTour & Travel",
  publisher: "mcTour & Travel",
  metadataBase: new URL("https://mctourtravel.com"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://mctourtravel.com",
    siteName: "mcTour & Travel",
    title: "mcTour & Travel - Gathering Nyaman Bersama mcTour & Travel",
    description:
      "mcTour & Travel melayani segala kebutuhan perjalanan Anda dengan pelayanan profesional, armada terbaik, dan harga kompetitif.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "mcTour & Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mcTour & Travel - Gathering Nyaman Bersama mcTour & Travel",
    description:
      "mcTour & Travel melayani segala kebutuhan perjalanan Anda dengan pelayanan profesional, armada terbaik, dan harga kompetitif.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mctourtravel.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "mcTour & Travel",
    description:
      "mcTour & Travel melayani segala kebutuhan perjalanan Anda dengan pelayanan profesional, armada terbaik, dan harga kompetitif.",
    url: "https://mctourtravel.com",
    logo: "https://mctourtravel.com/logo.png",
    telephone: "+6281234567890",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID",
    },
    sameAs: [
      "https://instagram.com/mctourtravel",
      "https://facebook.com/mctourtravel",
      "https://tiktok.com/@mctourtravel",
      "https://youtube.com/@mctourtravel",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "10000",
    },
  };

  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

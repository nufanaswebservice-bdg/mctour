import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/app/SplashScreen";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1565FF",
};

export const metadata: Metadata = {
  title: {
    default: "mcTour & Travel - Gathering Nyaman Bersama mcTour & Travel",
    template: "%s | mcTour & Travel",
  },
  description:
    "mcTour & Travel melayani segala kebutuhan perjalanan Anda dengan pelayanan profesional, armada terbaik, dan harga kompetitif. Paket Tour, Outbound, Event Organizer, Umroh & Haji.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "mcTour & Travel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "mcTour & Travel",
    description: "Gathering Nyaman Bersama mcTour & Travel",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://mctourtravel.com" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "mcTour & Travel",
    description: "mcTour & Travel melayani segala kebutuhan perjalanan Anda.",
    url: "https://mctourtravel.com",
    logo: "https://mctourtravel.com/logo-mctour.png",
    telephone: "+62818548833",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mall Ambasador, Jl. Prof. DR. Satrio Lantai LG Blok A69, RT.11/RW.4, Kuningan, Karet Kuningan, Kec. Setiabudi",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12940",
      addressCountry: "ID",
    },
    sameAs: [
      "https://www.instagram.com/mctourtravel/",
      "https://www.youtube.com/@mctourtravel",
      "https://facebook.com/mctourtravel",
      "https://tiktok.com/@mctourtravel",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-dvh bg-background antialiased">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}

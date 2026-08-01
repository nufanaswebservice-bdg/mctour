import { Metadata } from "next";
import dynamic from "next/dynamic";

const GallerySection = dynamic(() => import("@/components/sections/GallerySection"));

export const metadata: Metadata = {
  title: "Galeri Perjalanan - Momen Indah Bersama Pelanggan",
  description:
    "Galeri foto dan video perjalanan mcTour & Travel. Lihat momen-momen indah dari pelanggan kami di berbagai destinasi.",
};

export default function GaleriPage() {
  return (
    <div className="pt-24 pb-10">
      <GallerySection />
    </div>
  );
}

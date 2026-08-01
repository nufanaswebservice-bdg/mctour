import { Metadata } from "next";
import dynamic from "next/dynamic";

const BlogListContent = dynamic(() => import("@/components/pages/BlogListContent"));

export const metadata: Metadata = {
  title: "Blog - Tips & Panduan Perjalanan",
  description:
    "Baca artikel, tips, dan panduan perjalanan wisata dari mcTour & Travel. Info paket tour, gathering, outbound, umroh, dan tips liburan.",
};

export default function BlogPage() {
  return <BlogListContent />;
}

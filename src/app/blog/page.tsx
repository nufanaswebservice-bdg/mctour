import { Metadata } from "next";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"));
const TopBar = dynamic(() => import("@/components/app/TopBar"));
const BlogList = dynamic(() => import("@/components/app/BlogList"));

export const metadata: Metadata = {
  title: "Blog - Tips & Panduan Perjalanan",
  description: "Artikel, tips, dan panduan perjalanan wisata dari mcTour & Travel.",
};

export default function BlogPage() {
  return (
    <AppShell>
      <TopBar />
      <BlogList />
    </AppShell>
  );
}

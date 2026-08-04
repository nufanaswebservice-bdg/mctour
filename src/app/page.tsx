import dynamic from "next/dynamic";
import AppShell from "@/components/app/AppShell";

const TopBar = dynamic(() => import("@/components/app/TopBar"));
const HeroSearch = dynamic(() => import("@/components/app/HeroSearch"));
const PromoSlider = dynamic(() => import("@/components/app/PromoSlider"));
const QuickMenu = dynamic(() => import("@/components/app/QuickMenu"));
const DomesticPackages = dynamic(() => import("@/components/app/DomesticPackages"));
const InternationalPackages = dynamic(() => import("@/components/app/InternationalPackages"));
const WhyChooseUs = dynamic(() => import("@/components/app/WhyChooseUs"));
const Statistics = dynamic(() => import("@/components/app/Statistics"));
const Testimonials = dynamic(() => import("@/components/app/Testimonials"));
const Gallery = dynamic(() => import("@/components/app/Gallery"));
const FAQ = dynamic(() => import("@/components/app/FAQ"));
const CTABanner = dynamic(() => import("@/components/app/CTABanner"));
const ActivitiesWidget = dynamic(() => import("@/components/app/ActivitiesWidget"));

export default function Home() {
  return (
    <AppShell>
      <TopBar />
      <HeroSearch />
      <PromoSlider />
      <QuickMenu />
      <DomesticPackages />
      <InternationalPackages />
      <WhyChooseUs />
      <ActivitiesWidget />
      <Statistics />
      <Testimonials />
      <Gallery />
      <FAQ />
      <CTABanner />
    </AppShell>
  );
}

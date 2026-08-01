import dynamic from "next/dynamic";

// Dynamic imports for code splitting
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const DomesticTourSection = dynamic(() => import("@/components/sections/DomesticTourSection"));
const InternationalTourSection = dynamic(() => import("@/components/sections/InternationalTourSection"));
const EventOrganizerSection = dynamic(() => import("@/components/sections/EventOrganizerSection"));
const UmrohSection = dynamic(() => import("@/components/sections/UmrohSection"));
const StatisticsSection = dynamic(() => import("@/components/sections/StatisticsSection"));
const TestimonialSection = dynamic(() => import("@/components/sections/TestimonialSection"));
const GallerySection = dynamic(() => import("@/components/sections/GallerySection"));
const BlogSection = dynamic(() => import("@/components/sections/BlogSection"));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <DomesticTourSection />
      <InternationalTourSection />
      <EventOrganizerSection />
      <UmrohSection />
      <StatisticsSection />
      <TestimonialSection />
      <GallerySection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

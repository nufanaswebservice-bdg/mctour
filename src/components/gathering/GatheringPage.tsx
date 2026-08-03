"use client";

import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("./HeroBanner"));
const HighlightCards = dynamic(() => import("./HighlightCards"));
const PackageSection = dynamic(() => import("./PackageSection"));
const DestinationSection = dynamic(() => import("./DestinationSection"));
const ActivitiesSection = dynamic(() => import("./ActivitiesSection"));
const StatsSection = dynamic(() => import("./StatsSection"));
const TestimonialSlider = dynamic(() => import("./TestimonialSlider"));
const GalleryGrid = dynamic(() => import("./GalleryGrid"));
const FAQAccordion = dynamic(() => import("./FAQAccordion"));
const RequestForm = dynamic(() => import("./RequestForm"));
const StickyBooking = dynamic(() => import("./StickyBooking"));

export default function GatheringPage() {
  return (
    <div className="relative">
      <HeroBanner />
      <HighlightCards />
      <PackageSection />
      <DestinationSection />
      <ActivitiesSection />
      <StatsSection />
      <TestimonialSlider />
      <GalleryGrid />
      <FAQAccordion />
      <RequestForm />
      <StickyBooking />
    </div>
  );
}

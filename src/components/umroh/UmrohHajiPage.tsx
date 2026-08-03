"use client";

import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("./HeroBanner"));
const PackageCards = dynamic(() => import("./PackageCards"));
const HajiPlus = dynamic(() => import("./HajiPlus"));
const Itinerary = dynamic(() => import("./Itinerary"));
const Facilities = dynamic(() => import("./Facilities"));
const Destinations = dynamic(() => import("./Destinations"));
const WhyUs = dynamic(() => import("./WhyUs"));
const Testimonials = dynamic(() => import("./Testimonials"));
const FAQ = dynamic(() => import("./FAQ"));
const CTABooking = dynamic(() => import("./CTABooking"));

export default function UmrohHajiPage() {
  return (
    <div className="relative">
      <HeroBanner />
      <PackageCards />
      <HajiPlus />
      <Itinerary />
      <Facilities />
      <Destinations />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTABooking />
    </div>
  );
}

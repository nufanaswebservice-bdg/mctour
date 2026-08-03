"use client";

import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("./HeroBanner"));
const SearchBox = dynamic(() => import("./SearchBox"));
const VehicleGrid = dynamic(() => import("./VehicleGrid"));
const WhyRentUs = dynamic(() => import("./WhyRentUs"));
const RentalFAQ = dynamic(() => import("./RentalFAQ"));
const RentalCTA = dynamic(() => import("./RentalCTA"));

export default function RentalPage() {
  return (
    <div className="relative">
      <HeroBanner />
      <SearchBox />
      <VehicleGrid />
      <WhyRentUs />
      <RentalFAQ />
      <RentalCTA />
    </div>
  );
}

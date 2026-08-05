"use client";

import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("./HeroBanner"));
const FlightSearch = dynamic(() => import("./FlightSearch"));
const PopularRoutes = dynamic(() => import("./PopularRoutes"));
const Airlines = dynamic(() => import("./Airlines"));
const FlightDeals = dynamic(() => import("./FlightDeals"));
const FlightFeatures = dynamic(() => import("./FlightFeatures"));
const FlightFAQ = dynamic(() => import("./FlightFAQ"));
const FlightCTA = dynamic(() => import("./FlightCTA"));

export default function FlightPage() {
  return (
    <div className="relative">
      <HeroBanner />
      <FlightSearch />
      <PopularRoutes />
      <Airlines />
      <FlightDeals />
      <FlightFeatures />
      <FlightFAQ />
      <FlightCTA />
    </div>
  );
}

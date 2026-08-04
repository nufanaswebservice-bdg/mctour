"use client";

import dynamic from "next/dynamic";

const HeroSearch = dynamic(() => import("./HeroSearch"));
const BookingWidget = dynamic(() => import("./BookingWidget"));
const PopularDestinations = dynamic(() => import("./PopularDestinations"));
const HotelGrid = dynamic(() => import("./HotelGrid"));
const HotelFeatures = dynamic(() => import("./HotelFeatures"));
const HotelFAQ = dynamic(() => import("./HotelFAQ"));
const HotelCTA = dynamic(() => import("./HotelCTA"));

export default function HotelPage() {
  return (
    <div className="relative">
      <HeroSearch />
      <BookingWidget />
      <PopularDestinations />
      <HotelGrid />
      <HotelFeatures />
      <HotelFAQ />
      <HotelCTA />
    </div>
  );
}

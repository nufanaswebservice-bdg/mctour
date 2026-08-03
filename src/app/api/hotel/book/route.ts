import { NextRequest, NextResponse } from "next/server";
import { initHotelProviders, providerRegistry } from "@/lib/hotel/init";
import { HotelBookingRequest } from "@/lib/hotel/types";

export async function POST(request: NextRequest) {
  try {
    initHotelProviders();

    const body: HotelBookingRequest = await request.json();

    // Validate
    if (!body.hotelId || !body.roomId || !body.provider || !body.contactInfo?.email) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    // Attempt booking with failover
    const result = await providerRegistry.book(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] Hotel booking error:", error);
    return NextResponse.json(
      { error: "Booking failed. Please try again or contact support." },
      { status: 500 }
    );
  }
}

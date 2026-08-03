import { NextRequest, NextResponse } from "next/server";
import { initHotelProviders, providerRegistry } from "@/lib/hotel/init";
import { HotelSearchParams } from "@/lib/hotel/types";

export async function POST(request: NextRequest) {
  try {
    initHotelProviders();

    const body: HotelSearchParams = await request.json();

    // Validate required fields
    if (!body.city || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: "city, checkIn, and checkOut are required" },
        { status: 400 }
      );
    }

    // Search across all providers
    const results = await providerRegistry.searchAll(body);

    return NextResponse.json({
      success: true,
      count: results.length,
      results,
      providers: providerRegistry.getEnabledProviders().map((p) => p.name),
    });
  } catch (error) {
    console.error("[API] Hotel search error:", error);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { initHotelProviders, providerRegistry } from "@/lib/hotel/init";

export async function GET() {
  try {
    initHotelProviders();

    const statuses = await providerRegistry.healthCheckAll();
    const statusArray = Array.from(statuses.values());

    return NextResponse.json({
      healthy: statusArray.some((s) => s.healthy),
      providers: statusArray,
      enabledCount: providerRegistry.getEnabledProviders().length,
    });
  } catch (error) {
    return NextResponse.json({ healthy: false, error: "Health check failed" }, { status: 500 });
  }
}

/**
 * Expedia Rapid API Provider
 * Docs: https://developers.expediagroup.com/docs/products/rapid
 * 
 * Access to 700,000+ properties globally.
 * Uses EAN (Expedia Affiliate Network) / Rapid API v3.
 */

import { IHotelProvider } from "../provider-registry";
import { HotelSearchParams, HotelResult, HotelBookingRequest, HotelBookingResponse, ProviderConfig, ProviderName, ProviderStatus } from "../types";

export class ExpediaProvider implements IHotelProvider {
  name: ProviderName = "expedia";
  config: ProviderConfig;

  constructor(config?: Partial<ProviderConfig>) {
    this.config = {
      name: "expedia",
      displayName: "Expedia Rapid",
      apiKey: process.env.EXPEDIA_API_KEY || "",
      apiSecret: process.env.EXPEDIA_API_SECRET || "",
      baseUrl: "https://test.ean.com/v3",
      enabled: !!process.env.EXPEDIA_API_KEY,
      priority: 2,
      timeout: 15000,
      retryAttempts: 3,
      ...config,
    };
  }

  private getHeaders(): Record<string, string> {
    // Expedia Rapid uses EAN signature: SHA512(apiKey + secret + timestamp)
    return {
      "Authorization": `EAN apikey=${this.config.apiKey},signature=GENERATED_SIGNATURE,timestamp=${Date.now()}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Customer-Ip": "127.0.0.1",
    };
  }

  async search(params: HotelSearchParams): Promise<HotelResult[]> {
    const queryParams = new URLSearchParams({
      checkin: params.checkIn,
      checkout: params.checkOut,
      currency: params.currency || "IDR",
      language: params.language || "id-ID",
      country_code: "ID",
      occupancy: `${params.adults}-${params.children}`,
      property_id: params.city, // Needs region_id mapping
      rooms: params.rooms.toString(),
    });

    try {
      const response = await fetch(`${this.config.baseUrl}/properties/availability?${queryParams}`, {
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) throw new Error(`Expedia API error: ${response.status}`);
      const data = await response.json();
      return this.mapResults(data);
    } catch (error) {
      console.error("[Expedia] Search error:", error);
      throw error;
    }
  }

  async getDetails(hotelId: string): Promise<HotelResult | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/properties/content?property_id=${hotelId}`, { headers: this.getHeaders() });
      if (!response.ok) return null;
      const data = await response.json();
      return this.mapResults([data])[0] || null;
    } catch { return null; }
  }

  async checkAvailability(hotelId: string, params: HotelSearchParams): Promise<HotelResult | null> {
    const results = await this.search({ ...params, city: hotelId });
    return results[0] || null;
  }

  async book(request: HotelBookingRequest): Promise<HotelBookingResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/itineraries`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          rooms: [{ given_name: request.contactInfo.firstName, family_name: request.contactInfo.lastName, email: request.contactInfo.email, phone: request.contactInfo.phone }],
          payments: [{ type: "affiliate_collect" }],
        }),
      });
      if (!response.ok) throw new Error("Booking failed");
      const data = await response.json();
      return { success: true, bookingId: data.itinerary_id || "", confirmationCode: data.confirmation_id || "", status: "confirmed", provider: this.name, hotelName: "", checkIn: request.checkIn, checkOut: request.checkOut, totalPrice: 0, currency: "IDR" };
    } catch {
      return { success: false, bookingId: "", confirmationCode: "", status: "failed", provider: this.name, hotelName: "", checkIn: request.checkIn, checkOut: request.checkOut, totalPrice: 0, currency: "IDR" };
    }
  }

  async cancelBooking(bookingId: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/itineraries/${bookingId}`, { method: "DELETE", headers: this.getHeaders() });
      return { success: response.ok };
    } catch { return { success: false }; }
  }

  async healthCheck(): Promise<ProviderStatus> {
    const start = Date.now();
    try {
      const response = await fetch(`${this.config.baseUrl}/properties/content?property_id=test`, { headers: this.getHeaders(), signal: AbortSignal.timeout(5000) });
      return { name: this.name, healthy: response.status !== 500, lastCheck: new Date(), responseTime: Date.now() - start, errorRate: 0 };
    } catch { return { name: this.name, healthy: false, lastCheck: new Date(), responseTime: Date.now() - start, errorRate: 1 }; }
  }

  private mapResults(properties: any[]): HotelResult[] {
    return (properties || []).map((p) => ({
      id: p.property_id || "", providerId: p.property_id || "", provider: this.name,
      name: p.name || "", address: p.address?.line_1 || "", city: p.address?.city || "", country: p.address?.country_code || "",
      starRating: p.ratings?.property?.rating || 0, guestRating: p.ratings?.guest?.overall || 0, reviewCount: p.ratings?.guest?.count || 0,
      latitude: p.location?.coordinates?.latitude || 0, longitude: p.location?.coordinates?.longitude || 0,
      images: p.images?.map((i: any) => i.links?.["1000px"]?.href) || [], thumbnail: p.images?.[0]?.links?.["350px"]?.href || "",
      description: p.descriptions?.general || "", facilities: p.amenities?.map((a: any) => a.name) || [],
      rooms: [], cheapestPrice: p.rooms?.[0]?.rates?.[0]?.occupancy_pricing?.total?.inclusive?.request_currency?.value || 0,
      currency: "IDR", badges: [], freeCancellation: p.rooms?.[0]?.rates?.[0]?.cancel_penalties?.free_cancellation || false,
      breakfastIncluded: false, payAtHotel: false,
    }));
  }
}

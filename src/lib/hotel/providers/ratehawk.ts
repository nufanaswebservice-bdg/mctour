/**
 * RateHawk API Provider (Emerging Travel Group)
 * Docs: https://www.ratehawk.com/api
 * Access to 2.5M+ hotels. B2B platform.
 */
import { IHotelProvider } from "../provider-registry";
import { HotelSearchParams, HotelResult, HotelBookingRequest, HotelBookingResponse, ProviderConfig, ProviderName, ProviderStatus } from "../types";

export class RateHawkProvider implements IHotelProvider {
  name: ProviderName = "ratehawk";
  config: ProviderConfig;

  constructor(config?: Partial<ProviderConfig>) {
    this.config = { name: "ratehawk", displayName: "RateHawk", apiKey: process.env.RATEHAWK_API_KEY || "", apiSecret: "", baseUrl: "https://api.worldota.net/api/b2b/v3", enabled: !!process.env.RATEHAWK_API_KEY, priority: 3, timeout: 20000, retryAttempts: 2, ...config };
  }

  private getHeaders(): Record<string, string> {
    return { "Authorization": `Basic ${Buffer.from(`${this.config.apiKey}:`).toString("base64")}`, "Content-Type": "application/json" };
  }

  async search(params: HotelSearchParams): Promise<HotelResult[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/search/serp/region/`, { method: "POST", headers: this.getHeaders(), body: JSON.stringify({ checkin: params.checkIn, checkout: params.checkOut, residency: "id", language: "id", guests: [{ adults: params.adults, children: params.childrenAges || [] }], region_id: params.city, currency: "IDR" }), signal: AbortSignal.timeout(this.config.timeout) });
      if (!response.ok) throw new Error(`RateHawk error: ${response.status}`);
      const data = await response.json();
      return (data.data?.hotels || []).map((h: any) => ({ id: h.id, providerId: h.id, provider: this.name, name: h.name || "", address: h.address || "", city: params.city, country: "", starRating: h.star_rating || 0, guestRating: h.rating || 0, reviewCount: h.reviews_count || 0, latitude: h.latitude || 0, longitude: h.longitude || 0, images: h.images || [], thumbnail: h.images?.[0] || "", description: "", facilities: [], rooms: [], cheapestPrice: h.min_price || 0, currency: "IDR", badges: [], freeCancellation: h.has_free_cancellation || false, breakfastIncluded: false, payAtHotel: false }));
    } catch (error) { console.error("[RateHawk] Error:", error); throw error; }
  }

  async getDetails(hotelId: string): Promise<HotelResult | null> { return null; }
  async checkAvailability(hotelId: string, params: HotelSearchParams): Promise<HotelResult | null> { return null; }
  async book(request: HotelBookingRequest): Promise<HotelBookingResponse> { return { success: false, bookingId: "", confirmationCode: "", status: "failed", provider: this.name, hotelName: "", checkIn: request.checkIn, checkOut: request.checkOut, totalPrice: 0, currency: "IDR" }; }
  async cancelBooking(bookingId: string): Promise<{ success: boolean }> { return { success: false }; }
  async healthCheck(): Promise<ProviderStatus> { return { name: this.name, healthy: !!this.config.apiKey, lastCheck: new Date(), responseTime: 0, errorRate: 0 }; }
}

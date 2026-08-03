/** HyperGuest API - https://www.hyperguest.com/api */
import { IHotelProvider } from "../provider-registry";
import { HotelSearchParams, HotelResult, HotelBookingRequest, HotelBookingResponse, ProviderConfig, ProviderName, ProviderStatus } from "../types";

export class HyperGuestProvider implements IHotelProvider {
  name: ProviderName = "hyperguest";
  config: ProviderConfig;
  constructor(config?: Partial<ProviderConfig>) { this.config = { name: "hyperguest", displayName: "HyperGuest", apiKey: process.env.HYPERGUEST_API_KEY || "", apiSecret: "", baseUrl: "https://api.hyperguest.com/v1", enabled: !!process.env.HYPERGUEST_API_KEY, priority: 8, timeout: 15000, retryAttempts: 2, ...config }; }
  async search(params: HotelSearchParams): Promise<HotelResult[]> { return []; }
  async getDetails(hotelId: string): Promise<HotelResult | null> { return null; }
  async checkAvailability(hotelId: string, params: HotelSearchParams): Promise<HotelResult | null> { return null; }
  async book(request: HotelBookingRequest): Promise<HotelBookingResponse> { return { success: false, bookingId: "", confirmationCode: "", status: "failed", provider: this.name, hotelName: "", checkIn: request.checkIn, checkOut: request.checkOut, totalPrice: 0, currency: "IDR" }; }
  async cancelBooking(bookingId: string): Promise<{ success: boolean }> { return { success: false }; }
  async healthCheck(): Promise<ProviderStatus> { return { name: this.name, healthy: !!this.config.apiKey, lastCheck: new Date(), responseTime: 0, errorRate: 0 }; }
}

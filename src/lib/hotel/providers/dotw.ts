/** DOTW (Destinations of the World) API - https://www.dotwconnect.com/api */
import { IHotelProvider } from "../provider-registry";
import { HotelSearchParams, HotelResult, HotelBookingRequest, HotelBookingResponse, ProviderConfig, ProviderName, ProviderStatus } from "../types";

export class DOTWProvider implements IHotelProvider {
  name: ProviderName = "dotw";
  config: ProviderConfig;
  constructor(config?: Partial<ProviderConfig>) { this.config = { name: "dotw", displayName: "DOTW", apiKey: process.env.DOTW_API_KEY || "", apiSecret: process.env.DOTW_COMPANY_CODE || "", baseUrl: "https://xmldev.dotwconnect.com", enabled: !!process.env.DOTW_API_KEY, priority: 9, timeout: 20000, retryAttempts: 2, ...config }; }
  async search(params: HotelSearchParams): Promise<HotelResult[]> { return []; }
  async getDetails(hotelId: string): Promise<HotelResult | null> { return null; }
  async checkAvailability(hotelId: string, params: HotelSearchParams): Promise<HotelResult | null> { return null; }
  async book(request: HotelBookingRequest): Promise<HotelBookingResponse> { return { success: false, bookingId: "", confirmationCode: "", status: "failed", provider: this.name, hotelName: "", checkIn: request.checkIn, checkOut: request.checkOut, totalPrice: 0, currency: "IDR" }; }
  async cancelBooking(bookingId: string): Promise<{ success: boolean }> { return { success: false }; }
  async healthCheck(): Promise<ProviderStatus> { return { name: this.name, healthy: !!this.config.apiKey, lastCheck: new Date(), responseTime: 0, errorRate: 0 }; }
}

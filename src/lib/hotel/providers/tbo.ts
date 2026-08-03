/** TBO Holidays API - https://www.tboholidays.com/api */
import { IHotelProvider } from "../provider-registry";
import { HotelSearchParams, HotelResult, HotelBookingRequest, HotelBookingResponse, ProviderConfig, ProviderName, ProviderStatus } from "../types";

export class TBOProvider implements IHotelProvider {
  name: ProviderName = "tbo";
  config: ProviderConfig;
  constructor(config?: Partial<ProviderConfig>) { this.config = { name: "tbo", displayName: "TBO Holidays", apiKey: process.env.TBO_API_KEY || "", apiSecret: process.env.TBO_API_SECRET || "", baseUrl: "https://api.tbotechnology.in/HotelAPI_V2", enabled: !!process.env.TBO_API_KEY, priority: 6, timeout: 20000, retryAttempts: 2, ...config }; }
  async search(params: HotelSearchParams): Promise<HotelResult[]> { return []; }
  async getDetails(hotelId: string): Promise<HotelResult | null> { return null; }
  async checkAvailability(hotelId: string, params: HotelSearchParams): Promise<HotelResult | null> { return null; }
  async book(request: HotelBookingRequest): Promise<HotelBookingResponse> { return { success: false, bookingId: "", confirmationCode: "", status: "failed", provider: this.name, hotelName: "", checkIn: request.checkIn, checkOut: request.checkOut, totalPrice: 0, currency: "IDR" }; }
  async cancelBooking(bookingId: string): Promise<{ success: boolean }> { return { success: false }; }
  async healthCheck(): Promise<ProviderStatus> { return { name: this.name, healthy: !!this.config.apiKey, lastCheck: new Date(), responseTime: 0, errorRate: 0 }; }
}

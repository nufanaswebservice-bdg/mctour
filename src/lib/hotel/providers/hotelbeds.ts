/**
 * Hotelbeds API Provider
 * Docs: https://developer.hotelbeds.com/
 * 
 * One of the largest B2B hotel providers globally.
 * Provides access to 300,000+ hotels worldwide.
 */

import { IHotelProvider } from "../provider-registry";
import { HotelSearchParams, HotelResult, HotelBookingRequest, HotelBookingResponse, ProviderConfig, ProviderName, ProviderStatus, RoomResult } from "../types";

export class HotelbedsProvider implements IHotelProvider {
  name: ProviderName = "hotelbeds";
  config: ProviderConfig;

  constructor(config?: Partial<ProviderConfig>) {
    this.config = {
      name: "hotelbeds",
      displayName: "Hotelbeds",
      apiKey: process.env.HOTELBEDS_API_KEY || "",
      apiSecret: process.env.HOTELBEDS_API_SECRET || "",
      baseUrl: process.env.HOTELBEDS_BASE_URL || "https://api.test.hotelbeds.com/hotel-api/1.0",
      enabled: !!process.env.HOTELBEDS_API_KEY,
      priority: 1,
      timeout: 15000,
      retryAttempts: 3,
      ...config,
    };
  }

  private getHeaders(): Record<string, string> {
    // Hotelbeds uses X-Signature: SHA256(apiKey + secret + timestamp)
    const timestamp = Math.floor(Date.now() / 1000).toString();
    // In production, use crypto to generate signature
    const signature = `${this.config.apiKey}${this.config.apiSecret}${timestamp}`;

    return {
      "Api-key": this.config.apiKey,
      "X-Signature": signature, // Should be SHA256 hash in production
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
  }

  async search(params: HotelSearchParams): Promise<HotelResult[]> {
    const body = {
      stay: {
        checkIn: params.checkIn,
        checkOut: params.checkOut,
      },
      occupancies: [{
        rooms: params.rooms,
        adults: params.adults,
        children: params.children,
        paxes: params.childrenAges?.map((age) => ({ type: "CH", age })) || [],
      }],
      destination: {
        code: params.city, // Needs mapping to Hotelbeds destination code
      },
      filter: {
        minRate: params.minPrice,
        maxRate: params.maxPrice,
        minCategory: params.starRating?.[0],
        maxCategory: params.starRating?.[params.starRating.length - 1],
      },
    };

    try {
      const response = await fetch(`${this.config.baseUrl}/hotels`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        throw new Error(`Hotelbeds API error: ${response.status}`);
      }

      const data = await response.json();
      return this.mapResults(data.hotels?.hotels || []);
    } catch (error) {
      console.error("[Hotelbeds] Search error:", error);
      throw error;
    }
  }

  async getDetails(hotelId: string): Promise<HotelResult | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/hotels/${hotelId}/details`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) return null;
      const data = await response.json();
      const results = this.mapResults([data.hotel]);
      return results[0] || null;
    } catch {
      return null;
    }
  }

  async checkAvailability(hotelId: string, params: HotelSearchParams): Promise<HotelResult | null> {
    // Same as search but filtered to specific hotel
    const results = await this.search({ ...params, city: hotelId });
    return results[0] || null;
  }

  async book(request: HotelBookingRequest): Promise<HotelBookingResponse> {
    const body = {
      holder: {
        name: request.contactInfo.firstName,
        surname: request.contactInfo.lastName,
      },
      rooms: request.guests.map((guest) => ({
        rateKey: request.roomId,
        paxes: [{
          roomId: 1,
          type: "AD",
          name: guest.firstName,
          surname: guest.lastName,
        }],
      })),
      clientReference: `MCTOUR-${Date.now()}`,
      remark: request.specialRequests,
    };

    try {
      const response = await fetch(`${this.config.baseUrl}/bookings`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Booking failed: ${response.status}`);
      }

      const data = await response.json();

      return {
        success: true,
        bookingId: data.booking?.reference || "",
        confirmationCode: data.booking?.clientReference || "",
        status: "confirmed",
        provider: this.name,
        hotelName: data.booking?.hotel?.name || "",
        checkIn: request.checkIn,
        checkOut: request.checkOut,
        totalPrice: data.booking?.totalNet || 0,
        currency: "USD",
      };
    } catch (error) {
      return {
        success: false,
        bookingId: "",
        confirmationCode: "",
        status: "failed",
        provider: this.name,
        hotelName: "",
        checkIn: request.checkIn,
        checkOut: request.checkOut,
        totalPrice: 0,
        currency: "USD",
      };
    }
  }

  async cancelBooking(bookingId: string): Promise<{ success: boolean; refundAmount?: number }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });
      return { success: response.ok };
    } catch {
      return { success: false };
    }
  }

  async healthCheck(): Promise<ProviderStatus> {
    const start = Date.now();
    try {
      const response = await fetch(`${this.config.baseUrl}/status`, {
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(5000),
      });
      return {
        name: this.name,
        healthy: response.ok,
        lastCheck: new Date(),
        responseTime: Date.now() - start,
        errorRate: 0,
      };
    } catch {
      return {
        name: this.name,
        healthy: false,
        lastCheck: new Date(),
        responseTime: Date.now() - start,
        errorRate: 1,
      };
    }
  }

  private mapResults(hotels: any[]): HotelResult[] {
    return hotels.map((hotel) => ({
      id: hotel.code?.toString() || "",
      providerId: hotel.code?.toString() || "",
      provider: this.name,
      name: hotel.name || "",
      address: hotel.address?.content || "",
      city: hotel.destinationName || "",
      country: hotel.countryCode || "",
      starRating: hotel.categoryCode ? parseInt(hotel.categoryCode) : 0,
      guestRating: hotel.reviews?.[0]?.rate || 0,
      reviewCount: hotel.reviews?.[0]?.reviewCount || 0,
      latitude: hotel.latitude || 0,
      longitude: hotel.longitude || 0,
      images: hotel.images?.map((img: any) => img.path) || [],
      thumbnail: hotel.images?.[0]?.path || "",
      description: hotel.description?.content || "",
      facilities: hotel.facilities?.map((f: any) => f.description?.content) || [],
      rooms: this.mapRooms(hotel.rooms || []),
      cheapestPrice: hotel.minRate || hotel.rooms?.[0]?.rates?.[0]?.net || 0,
      originalPrice: hotel.rooms?.[0]?.rates?.[0]?.sellingRate,
      currency: hotel.currency || "USD",
      badges: [],
      freeCancellation: hotel.rooms?.some((r: any) => r.rates?.some((rate: any) => rate.cancellationPolicies?.length > 0)) || false,
      breakfastIncluded: hotel.rooms?.some((r: any) => r.rates?.some((rate: any) => rate.boardName?.includes("BREAKFAST"))) || false,
      payAtHotel: false,
    }));
  }

  private mapRooms(rooms: any[]): RoomResult[] {
    return rooms.map((room) => ({
      id: room.rates?.[0]?.rateKey || "",
      name: room.name || "",
      description: "",
      maxOccupancy: room.rates?.[0]?.adults || 2,
      bedType: room.name || "",
      price: room.rates?.[0]?.net || 0,
      originalPrice: room.rates?.[0]?.sellingRate,
      currency: "USD",
      breakfastIncluded: room.rates?.[0]?.boardName?.includes("BREAKFAST") || false,
      freeCancellation: (room.rates?.[0]?.cancellationPolicies?.length || 0) > 0,
      refundable: (room.rates?.[0]?.cancellationPolicies?.length || 0) > 0,
      payAtHotel: false,
      remaining: room.rates?.[0]?.allotment,
      facilities: [],
      images: [],
    }));
  }
}

// Hotel provider integration types

export interface HotelSearchParams {
  city: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  childrenAges?: number[];
  starRating?: number[];
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  language?: string;
}

export interface HotelResult {
  id: string;
  providerId: string;
  provider: ProviderName;
  name: string;
  address: string;
  city: string;
  country: string;
  starRating: number;
  guestRating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  images: string[];
  thumbnail: string;
  description: string;
  facilities: string[];
  rooms: RoomResult[];
  cheapestPrice: number;
  originalPrice?: number;
  currency: string;
  badges: string[];
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  payAtHotel: boolean;
  distanceFromCenter?: string;
}

export interface RoomResult {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  bedType: string;
  size?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  refundable: boolean;
  payAtHotel: boolean;
  remaining?: number;
  facilities: string[];
  images: string[];
  cancellationPolicy?: string;
}

export interface HotelBookingRequest {
  hotelId: string;
  roomId: string;
  provider: ProviderName;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: GuestInfo[];
  contactInfo: ContactInfo;
  specialRequests?: string;
  promoCode?: string;
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  nationality?: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
}

export interface HotelBookingResponse {
  success: boolean;
  bookingId: string;
  confirmationCode: string;
  status: "confirmed" | "pending" | "failed";
  provider: ProviderName;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  currency: string;
  cancellationDeadline?: string;
  voucherUrl?: string;
}

export type ProviderName =
  | "hotelbeds"
  | "expedia"
  | "booking"
  | "ratehawk"
  | "webbeds"
  | "agoda"
  | "tbo"
  | "dotw"
  | "travelgatex"
  | "hyperguest";

export interface ProviderConfig {
  name: ProviderName;
  displayName: string;
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
  enabled: boolean;
  priority: number; // lower = higher priority
  timeout: number; // ms
  retryAttempts: number;
}

export interface ProviderStatus {
  name: ProviderName;
  healthy: boolean;
  lastCheck: Date;
  responseTime: number;
  errorRate: number;
}

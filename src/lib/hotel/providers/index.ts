/**
 * Hotel Provider Index
 * 
 * All providers are registered here.
 * To add a new provider:
 * 1. Create a file in /providers/ implementing IHotelProvider
 * 2. Import and register it here
 * 3. Add environment variables for API keys
 * 
 * Environment Variables Required:
 * - HOTELBEDS_API_KEY, HOTELBEDS_API_SECRET, HOTELBEDS_BASE_URL
 * - EXPEDIA_API_KEY, EXPEDIA_API_SECRET
 * - RATEHAWK_API_KEY
 * - WEBBEDS_API_KEY, WEBBEDS_API_SECRET
 * - TBO_API_KEY, TBO_API_SECRET
 * - TRAVELGATEX_API_KEY
 * - HYPERGUEST_API_KEY
 * - DOTW_API_KEY, DOTW_COMPANY_CODE
 */

export { HotelbedsProvider } from "./hotelbeds";
export { ExpediaProvider } from "./expedia";
export { RateHawkProvider } from "./ratehawk";
export { WebBedsProvider } from "./webbeds";
export { TBOProvider } from "./tbo";
export { TravelgateXProvider } from "./travelgatex";
export { HyperGuestProvider } from "./hyperguest";
export { DOTWProvider } from "./dotw";

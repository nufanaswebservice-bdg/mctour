/**
 * Hotel System Initialization
 * 
 * This file initializes all hotel providers and registers them.
 * Call initHotelProviders() on server startup.
 * 
 * Setup Instructions:
 * 1. Sign up for provider APIs (see each provider file for docs link)
 * 2. Add API keys to .env.local
 * 3. Set enabled: true for providers you want to use
 * 4. Adjust priority (lower number = queried first)
 */

import { providerRegistry } from "./provider-registry";
import {
  HotelbedsProvider,
  ExpediaProvider,
  RateHawkProvider,
  WebBedsProvider,
  TBOProvider,
  TravelgateXProvider,
  HyperGuestProvider,
  DOTWProvider,
} from "./providers";

let initialized = false;

export function initHotelProviders(): void {
  if (initialized) return;

  // Register all providers (they auto-detect if API key is available)
  providerRegistry.register(new HotelbedsProvider());
  providerRegistry.register(new ExpediaProvider());
  providerRegistry.register(new RateHawkProvider());
  providerRegistry.register(new WebBedsProvider());
  providerRegistry.register(new TBOProvider());
  providerRegistry.register(new TravelgateXProvider());
  providerRegistry.register(new HyperGuestProvider());
  providerRegistry.register(new DOTWProvider());

  initialized = true;

  console.log("[Hotel] Providers initialized:", providerRegistry.getEnabledProviders().map((p) => p.name));
}

export { providerRegistry };

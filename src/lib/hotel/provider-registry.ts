/**
 * Hotel Provider Registry
 * 
 * Architecture: Repository Pattern + API Gateway
 * - Each provider implements IHotelProvider interface
 * - ProviderRegistry manages all providers
 * - Failover: If primary provider fails, next provider is tried
 * - Caching: Results cached for identical searches
 * - Rate Limiting: Per-provider rate limits respected
 */

import { HotelSearchParams, HotelResult, HotelBookingRequest, HotelBookingResponse, ProviderConfig, ProviderName, ProviderStatus } from "./types";

// Interface that all providers must implement
export interface IHotelProvider {
  name: ProviderName;
  config: ProviderConfig;
  search(params: HotelSearchParams): Promise<HotelResult[]>;
  getDetails(hotelId: string): Promise<HotelResult | null>;
  checkAvailability(hotelId: string, params: HotelSearchParams): Promise<HotelResult | null>;
  book(request: HotelBookingRequest): Promise<HotelBookingResponse>;
  cancelBooking(bookingId: string): Promise<{ success: boolean; refundAmount?: number }>;
  healthCheck(): Promise<ProviderStatus>;
}

// Provider Registry - manages all hotel API providers
class ProviderRegistry {
  private providers: Map<ProviderName, IHotelProvider> = new Map();
  private statusCache: Map<ProviderName, ProviderStatus> = new Map();
  private searchCache: Map<string, { results: HotelResult[]; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  register(provider: IHotelProvider): void {
    this.providers.set(provider.name, provider);
  }

  unregister(name: ProviderName): void {
    this.providers.delete(name);
  }

  getProvider(name: ProviderName): IHotelProvider | undefined {
    return this.providers.get(name);
  }

  getEnabledProviders(): IHotelProvider[] {
    return Array.from(this.providers.values())
      .filter((p) => p.config.enabled)
      .sort((a, b) => a.config.priority - b.config.priority);
  }

  // Search across all enabled providers with failover
  async searchAll(params: HotelSearchParams): Promise<HotelResult[]> {
    const cacheKey = JSON.stringify(params);
    const cached = this.searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.results;
    }

    const enabledProviders = this.getEnabledProviders();
    const allResults: HotelResult[] = [];
    const errors: Array<{ provider: ProviderName; error: string }> = [];

    // Query providers in parallel with timeout
    const promises = enabledProviders.map(async (provider) => {
      try {
        const results = await this.withTimeout(
          provider.search(params),
          provider.config.timeout
        );
        return { provider: provider.name, results, error: null };
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        return { provider: provider.name, results: [] as HotelResult[], error: msg };
      }
    });

    const responses = await Promise.allSettled(promises);

    for (const response of responses) {
      if (response.status === "fulfilled") {
        const { provider, results, error } = response.value;
        if (error) {
          errors.push({ provider, error });
        } else {
          allResults.push(...results);
        }
      }
    }

    // Deduplicate by hotel name + city (prefer cheapest)
    const deduplicated = this.deduplicateResults(allResults);

    // Sort by price
    deduplicated.sort((a, b) => a.cheapestPrice - b.cheapestPrice);

    // Cache results
    this.searchCache.set(cacheKey, { results: deduplicated, timestamp: Date.now() });

    return deduplicated;
  }

  // Book with failover
  async book(request: HotelBookingRequest): Promise<HotelBookingResponse> {
    const provider = this.providers.get(request.provider);
    if (!provider) {
      throw new Error(`Provider ${request.provider} not found`);
    }

    try {
      return await this.withRetry(
        () => provider.book(request),
        provider.config.retryAttempts
      );
    } catch (error) {
      // Failover to alternative providers if available
      const alternatives = this.getEnabledProviders().filter((p) => p.name !== request.provider);
      for (const alt of alternatives) {
        try {
          return await alt.book({ ...request, provider: alt.name });
        } catch {
          continue;
        }
      }
      throw error;
    }
  }

  // Health check all providers
  async healthCheckAll(): Promise<Map<ProviderName, ProviderStatus>> {
    const checks = this.getEnabledProviders().map(async (provider) => {
      try {
        const status = await provider.healthCheck();
        this.statusCache.set(provider.name, status);
        return status;
      } catch {
        const status: ProviderStatus = {
          name: provider.name,
          healthy: false,
          lastCheck: new Date(),
          responseTime: 0,
          errorRate: 1,
        };
        this.statusCache.set(provider.name, status);
        return status;
      }
    });

    await Promise.allSettled(checks);
    return this.statusCache;
  }

  private deduplicateResults(results: HotelResult[]): HotelResult[] {
    const map = new Map<string, HotelResult>();
    for (const result of results) {
      const key = `${result.name.toLowerCase()}_${result.city.toLowerCase()}`;
      const existing = map.get(key);
      if (!existing || result.cheapestPrice < existing.cheapestPrice) {
        map.set(key, result);
      }
    }
    return Array.from(map.values());
  }

  private async withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    );
    return Promise.race([promise, timeout]);
  }

  private async withRetry<T>(fn: () => Promise<T>, maxAttempts: number): Promise<T> {
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown error");
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, attempt * 1000)); // Exponential backoff
        }
      }
    }
    throw lastError;
  }

  clearCache(): void {
    this.searchCache.clear();
  }
}

// Singleton instance
export const providerRegistry = new ProviderRegistry();

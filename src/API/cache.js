import Bottleneck from "bottleneck";

// 🔥 Throttle: max 3 concurrent requests, min 200ms between each
const limiter = new Bottleneck({
  maxConcurrent: 3,
  minTime: 200,
});

// 🔥 Cache TTL: 5 minutes (menu data doesn't change often)
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Get cached data from localStorage
 * Returns null if missing or expired
 */
function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Store data in localStorage with timestamp
 */
function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage full — silently fail
  }
}

/**
 * Throttled + cached request wrapper
 * @param {string} cacheKey - unique key for this request
 * @param {Function} requestFn - async function that makes the API call
 * @returns {Promise<any>}
 */
export async function cachedRequest(cacheKey, requestFn) {
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const result = await limiter.schedule(() => requestFn());
  setCache(cacheKey, result);
  return result;
}

/**
 * Throttled request (no caching) — for dynamic/filtered queries
 */
export async function throttledRequest(requestFn) {
  return limiter.schedule(() => requestFn());
}

/**
 * Simple in-memory rate limiter.
 * Limits each IP to `maxRequests` calls per `windowMs` milliseconds.
 *
 * NOTE: In-memory state is reset on each server restart / cold start.
 * For multi-instance deployments (e.g. Vercel Edge) swap this out for
 * an external store such as Upstash Redis.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count += 1;
  return false;
}

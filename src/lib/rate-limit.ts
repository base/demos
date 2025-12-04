/**
 * Rate Limiting Middleware
 * 
 * Protects sensitive endpoints from abuse using in-memory store
 * For production, use Redis/Upstash for distributed rate limiting
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
    windowMs: number;  // Time window in milliseconds
    maxRequests: number;  // Max requests per window
}

// Rate limit configurations for different endpoint types
export const RATE_LIMITS = {
    payment: { windowMs: 60000, maxRequests: 10 },      // 10 req/min for payments
    minting: { windowMs: 3600000, maxRequests: 100 },   // 100 req/hour for minting
    api: { windowMs: 60000, maxRequests: 100 },         // 100 req/min for general API
    auth: { windowMs: 300000, maxRequests: 5 },         // 5 req/5min for auth
};

export function rateLimit(config: RateLimitConfig) {
    return async (request: NextRequest) => {
        // Get client identifier (IP address or user ID)
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
        const identifier = `${ip}-${request.nextUrl.pathname}`;

        const now = Date.now();
        const limitData = rateLimitStore.get(identifier);

        // Clean up expired entries
        if (limitData && now > limitData.resetTime) {
            rateLimitStore.delete(identifier);
        }

        const currentData = rateLimitStore.get(identifier) || {
            count: 0,
            resetTime: now + config.windowMs,
        };

        // Check if limit exceeded
        if (currentData.count >= config.maxRequests) {
            const resetIn = Math.ceil((currentData.resetTime - now) / 1000);
            return NextResponse.json(
                {
                    error: 'Too many requests',
                    message: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
                    retryAfter: resetIn,
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': resetIn.toString(),
                        'X-RateLimit-Limit': config.maxRequests.toString(),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': currentData.resetTime.toString(),
                    },
                }
            );
        }

        // Increment counter
        currentData.count += 1;
        rateLimitStore.set(identifier, currentData);

        return null; // Allow request
    };
}

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
        if (now > value.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}, 60000); // Clean every minute

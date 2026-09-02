// app/api/game/start/route.ts
import { NextResponse } from "next/server";
import { isAddress } from "viem";

import { createRound } from "@/lib/game-rounds";
import { clientKey, withinRateLimit } from "@/lib/rate-limit";

/**
 * Opens a server-authoritative round and returns its identifier.
 *
 * The winning card is chosen here, stored server-side, and deliberately left out
 * of the response. The browser animation in `components/three-card-monte-game.tsx`
 * is presentation only; `/api/win` decides the outcome by comparing the player's
 * submitted pick against the card recorded here.
 */

const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  if (
    !withinRateLimit(
      clientKey(request),
      RATE_LIMIT_MAX_REQUESTS,
      RATE_LIMIT_WINDOW_MS,
    )
  ) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { playerAddress } = body as Record<string, unknown>;
  if (typeof playerAddress !== "string" || !isAddress(playerAddress)) {
    return NextResponse.json(
      { error: "playerAddress must be a valid EVM address" },
      { status: 400 },
    );
  }

  const gameId = await createRound(playerAddress);
  if (!gameId) {
    // Redis is unconfigured, so no round can be recorded and nothing could be
    // verified at claim time. Failing here is the point: the alternative is
    // paying out on the client's word, which is the flaw this replaced.
    console.error("Cannot open a round: REDIS_URL / REDIS_TOKEN are not set");
    return NextResponse.json(
      { error: "Game rounds are unavailable" },
      { status: 503 },
    );
  }

  return NextResponse.json({ gameId });
}
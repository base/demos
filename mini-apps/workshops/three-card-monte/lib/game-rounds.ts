// lib/game-rounds.ts
import { randomBytes, randomInt } from "node:crypto";

import { redis } from "@/lib/redis";

/**
 * Server-authoritative rounds for the three-card monte reward flow.
 *
 * Why this exists: `recordReward(player, true)` is the onchain authorisation that
 * lets a player call `claimReward`. The route that sends it used to accept
 * `playerAddress`, `score` and `gameId` from the request body and pay out without
 * checking any of them — `score` and `gameId` were tested for presence and then
 * never read. Any anonymous caller could mark any address as a winner, as often
 * as they liked, and drain the reward pool.
 *
 * The client cannot be the source of truth about whether it won, because the
 * whole game runs in the browser: `isTarget` lives in React state and the
 * win/lose decision in `handleCardClick` is client-side. So the server picks the
 * winning card itself, keeps it out of the response, and pays out only when the
 * submitted pick matches a round that has not already been used.
 */

const ROUND_KEY_PREFIX = "tcm:round:";

/** A round must be played within this window. */
export const ROUND_TTL_SECONDS = 5 * 60;

/** Card identifiers rendered by the game component. */
export const CARD_IDS = [1, 2, 3] as const;

export type Round = {
  /** Lowercased address permitted to claim this round. */
  player: string;
  /** The card the player must select. Never sent to the client. */
  winningCardId: number;
  /** Issued-at, in milliseconds since the epoch. */
  createdAt: number;
};

export type ClaimResult =
  | { outcome: "won"; player: string }
  | { outcome: "lost" }
  | { outcome: "unknown-round" }
  | { outcome: "already-played" }
  | { outcome: "wrong-player" }
  | { outcome: "unavailable" };

function roundKey(gameId: string): string {
  return `${ROUND_KEY_PREFIX}${gameId}`;
}

function claimKey(gameId: string): string {
  return `${ROUND_KEY_PREFIX}${gameId}:claimed`;
}

/** `gameId` values this module issues: 32 hex characters, nothing else. */
export const GAME_ID_PATTERN = /^[0-9a-f]{32}$/;

/**
 * Normalises a value read back from Redis into a {@link Round}.
 *
 * `@upstash/redis` may hand back either the raw string or an already-parsed
 * object depending on how the value was written, so both are handled and
 * anything unrecognised is rejected rather than coerced.
 */
function toRound(value: unknown): Round | null {
  let candidate: unknown = value;
  if (typeof candidate === "string") {
    try {
      candidate = JSON.parse(candidate);
    } catch {
      return null;
    }
  }
  if (typeof candidate !== "object" || candidate === null) {
    return null;
  }
  const { player, winningCardId, createdAt } = candidate as Partial<Round>;
  if (
    typeof player !== "string" ||
    typeof winningCardId !== "number" ||
    typeof createdAt !== "number" ||
    !CARD_IDS.includes(winningCardId as (typeof CARD_IDS)[number])
  ) {
    return null;
  }
  return { player, winningCardId, createdAt };
}

/**
 * Opens a round for `player` and returns its identifier.
 *
 * Returns `null` when Redis is not configured. Callers must treat that as a
 * hard failure: with nowhere to record the winning card there is nothing to
 * verify against later, and paying out anyway would restore the original hole.
 */
export async function createRound(player: string): Promise<string | null> {
  if (!redis) {
    return null;
  }

  // 128 bits from a CSPRNG. An unguessable identifier is what stops a caller
  // from claiming a round it never opened.
  const gameId = randomBytes(16).toString("hex");

  const round: Round = {
    player: player.toLowerCase(),
    // `randomInt` is rejection-sampled and free of the modulo bias that
    // `Math.floor(Math.random() * n)` carries, and it is not predictable from
    // previously observed outputs.
    winningCardId: CARD_IDS[randomInt(CARD_IDS.length)],
    createdAt: Date.now(),
  };

  await redis.set(roundKey(gameId), JSON.stringify(round), {
    ex: ROUND_TTL_SECONDS,
  });

  return gameId;
}

/**
 * Consumes a round and reports the outcome.
 *
 * The round is consumed whether or not the guess was correct, so each round
 * yields exactly one attempt.
 */
export async function claimRound(
  gameId: string,
  player: string,
  selectedCardId: number,
): Promise<ClaimResult> {
  if (!redis) {
    return { outcome: "unavailable" };
  }

  const round = toRound(await redis.get(roundKey(gameId)));
  if (!round) {
    return { outcome: "unknown-round" };
  }

  if (round.player !== player.toLowerCase()) {
    return { outcome: "wrong-player" };
  }

  // Atomic single-use gate. `nx` means the write only succeeds if the key does
  // not exist, so exactly one concurrent request can proceed past this point —
  // this is what prevents a replay race from collecting several payouts from one
  // round.
  const reserved = await redis.set(claimKey(gameId), "1", {
    nx: true,
    ex: ROUND_TTL_SECONDS,
  });
  if (reserved === null) {
    return { outcome: "already-played" };
  }

  if (selectedCardId !== round.winningCardId) {
    return { outcome: "lost" };
  }

  return { outcome: "won", player: round.player };
}
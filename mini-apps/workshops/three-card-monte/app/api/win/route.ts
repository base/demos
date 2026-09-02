// app/api/win/route.ts
import { NextResponse } from "next/server";
import { createPublicClient, http, encodeFunctionData, isAddress } from "viem";
import { baseSepolia } from "viem/chains";
import { GAME_CONTRACT_ADDRESS_SEPOLIA } from "@/lib/constants";
import { GAME_CONTRACT_ABI } from "@/lib/abi";
import { getCDPAccountByAddress } from "@/lib/cdp/account";
import { cdp } from "@/lib/cdp/client";
import { CARD_IDS, GAME_ID_PATTERN, claimRound } from "@/lib/game-rounds";
import { clientKey, withinRateLimit } from "@/lib/rate-limit";

/**
 * Records an onchain reward for a player who won a verified round.
 *
 * `recordReward(player, true)` is the authorisation that later lets that address
 * call `claimReward` and take funds out of the game contract, and it is sent by
 * the deployment's own CDP signer. The previous implementation performed no
 * verification at all: it read `playerAddress`, `score` and `gameId` from the
 * request body, checked only that all three were truthy, then discarded `score`
 * and `gameId` and paid out. Consequences:
 *
 *   - No authentication, so any anonymous caller could mark any address a winner.
 *   - No round validation, so a caller could repeat the request indefinitely.
 *   - `!score` rejected a legitimate score of 0 while accepting the string "win".
 *   - The signer address was hardcoded, with `process.env.CDP_SIGNER_ADDRESS`
 *     commented out beside it.
 *   - The catch block returned `error.message` to the caller, exposing CDP and
 *     RPC internals.
 *
 * Every payout now consumes a round that this server opened, bound to the same
 * address, whose winning card the client was never told. See `lib/game-rounds.ts`.
 */

const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

// Initialize the public client for transaction monitoring
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

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

  const { playerAddress, gameId, selectedCardId } = body as Record<
    string,
    unknown
  >;

  if (typeof playerAddress !== "string" || !isAddress(playerAddress)) {
    return NextResponse.json(
      { error: "playerAddress must be a valid EVM address" },
      { status: 400 },
    );
  }
  if (typeof gameId !== "string" || !GAME_ID_PATTERN.test(gameId)) {
    return NextResponse.json(
      { error: "gameId must be an identifier issued by /api/game/start" },
      { status: 400 },
    );
  }
  // An explicit type check rather than a truthiness test: card id 0 would be
  // rejected by `!selectedCardId` even if it were valid, which is the bug the
  // original `!score` check had.
  if (
    typeof selectedCardId !== "number" ||
    !CARD_IDS.includes(selectedCardId as (typeof CARD_IDS)[number])
  ) {
    return NextResponse.json(
      { error: `selectedCardId must be one of ${CARD_IDS.join(", ")}` },
      { status: 400 },
    );
  }

  const signerAddress = process.env.CDP_SIGNER_ADDRESS;
  if (!signerAddress || !isAddress(signerAddress)) {
    console.error("CDP_SIGNER_ADDRESS is not set to a valid address");
    return NextResponse.json(
      { error: "Rewards are not configured" },
      { status: 503 },
    );
  }

  const claim = await claimRound(gameId, playerAddress, selectedCardId);

  switch (claim.outcome) {
    case "unavailable":
      console.error("Cannot verify a round: REDIS_URL / REDIS_TOKEN are not set");
      return NextResponse.json(
        { error: "Game rounds are unavailable" },
        { status: 503 },
      );
    case "unknown-round":
      // Also covers rounds that have expired. Deliberately indistinguishable
      // from a fabricated identifier.
      return NextResponse.json(
        { error: "Unknown or expired round" },
        { status: 404 },
      );
    case "wrong-player":
      return NextResponse.json(
        { error: "This round belongs to a different address" },
        { status: 403 },
      );
    case "already-played":
      return NextResponse.json(
        { error: "This round has already been played" },
        { status: 409 },
      );
    case "lost":
      // A losing guess still consumes the round, so it cannot be retried.
      return NextResponse.json({ success: true, won: false });
    case "won":
      break;
  }

  try {
    const account = await getCDPAccountByAddress(signerAddress);

    const txData = encodeFunctionData({
      abi: GAME_CONTRACT_ABI,
      functionName: "recordReward",
      args: [playerAddress as `0x${string}`, true],
    });

    const txResult = await cdp.evm.sendTransaction({
      address: account.address,
      network: "base-sepolia",
      transaction: {
        to: GAME_CONTRACT_ADDRESS_SEPOLIA as `0x${string}`,
        data: txData,
      },
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txResult.transactionHash,
    });

    console.log("Recorded reward:", {
      gameId,
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber.toString(),
      status: receipt.status,
    });

    if (receipt.status !== "success") {
      return NextResponse.json(
        { error: "Reward transaction reverted" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      won: true,
      transactionHash: txResult.transactionHash,
    });
  } catch (error) {
    // Logged server-side only. CDP and RPC errors carry account identifiers and
    // request metadata that callers have no need to see.
    console.error("Error processing game win:", error);
    return NextResponse.json(
      { error: "Failed to process game win" },
      { status: 502 },
    );
  }
}
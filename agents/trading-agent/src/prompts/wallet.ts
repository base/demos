import * as p from "@clack/prompts";
import type { WalletType } from "../types.js";
import { BACK, type Backable } from "./navigation.js";

export async function promptWallet(): Promise<Backable<WalletType>> {
  const wallet = await p.select({
    message: "Select wallet provider:",
    options: [
      {
        value: "cdp-server-wallet",
        label: "CDP Server Wallet — programmable wallet + arbitrary protocol transactions",
        hint: "requires CDP API key + wallet secret",
      },
      {
        value: "bankr",
        label: "Bankr — chat-based execution across protocols",
        hint: "requires Bankr API key",
      },
      {
        value: "sponge",
        label: "Sponge — managed wallet with native swaps, bridging, and x402",
        hint: "requires Sponge API key",
      },
      { value: BACK, label: "← Go back" },
    ],
  });

  if (p.isCancel(wallet)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  if (wallet === BACK) return BACK;

  if (wallet === "bankr") {
    console.log(
      '\nBankr setup: when creating your API key at bankr.bot, make sure "Read Only" is turned OFF so the agent can execute trades.\n'
    );
  }

  if (wallet === "sponge") {
    console.log(
      "\nSponge setup: register at https://paysponge.com/ to get your SPONGE_API_KEY. Sponge provides a managed multi-chain wallet with native swaps, bridging, Polymarket, Hyperliquid, and x402 service access.\n"
    );
  }

  return wallet as WalletType;
}

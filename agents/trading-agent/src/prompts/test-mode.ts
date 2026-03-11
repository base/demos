import * as p from "@clack/prompts";
import { BACK, type Backable } from "./navigation.js";

export async function promptTestMode(): Promise<Backable<boolean>> {
  const selection = await p.select({
    message: "Enable test mode?",
    options: [
      {
        value: "true",
        label: "Test mode",
        hint: "uses small real funds on Base mainnet, trades more often, and checks execution with lower-risk defaults",
      },
      {
        value: "false",
        label: "Normal mode",
        hint: "more conservative defaults for live trading",
      },
      { value: BACK, label: "← Go back" },
    ],
  });

  if (p.isCancel(selection)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  if (selection === BACK) return BACK;

  if (selection === "true") {
    console.log(
      "\nTest mode uses small real funds on Base mainnet to validate execution. It trades more readily, uses a faster evaluation interval, and is intended to confirm your wallet and tool setup before running a more conservative live strategy. A small balance such as ~$10 USDC is recommended.\n"
    );
  }

  return selection === "true";
}

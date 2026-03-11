import * as p from "@clack/prompts";
import { BACK, type Backable } from "./navigation.js";

export async function promptStrategy(): Promise<Backable<string>> {
  const strategy = await p.text({
    message: "Describe your trading strategy: (type 'back' to go to previous step)",
    placeholder: "Buy ETH when RSI < 30, sell when RSI > 70...",
    validate(value) {
      if (value.trim().toLowerCase() === "back") return;
      if (!value || value.trim().length < 10) {
        return "Please describe a meaningful strategy (at least 10 characters).";
      }
    },
  });

  if (p.isCancel(strategy)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  return strategy.trim().toLowerCase() === "back" ? BACK : strategy;
}

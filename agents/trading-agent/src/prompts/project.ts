import * as p from "@clack/prompts";
import { BACK, type Backable } from "./navigation.js";

export async function promptProject(): Promise<Backable<string>> {
  const name = await p.text({
    message: "Project name: (type 'back' to go to previous step)",
    placeholder: "my-trading-agent",
    validate(value) {
      const trimmed = value.trim();
      if (trimmed.toLowerCase() === "back") return;
      if (!trimmed) return "Project name is required.";
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed)) {
        return "Must be kebab-case (lowercase letters, numbers, hyphens).";
      }
    },
  });

  if (p.isCancel(name)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const trimmed = name.trim();
  return trimmed.toLowerCase() === "back" ? BACK : trimmed;
}

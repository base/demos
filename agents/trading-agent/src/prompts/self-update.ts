import * as p from "@clack/prompts";
import { BACK, type Backable } from "./navigation.js";

export async function promptSelfUpdate(): Promise<{
  enabled: boolean;
  evaluationInterval: number;
} | typeof BACK> {
  const enabled = await p.select({
    message: "Enable self-updating strategy?",
    options: [
      { value: "false", label: "No" },
      { value: "true", label: "Yes" },
      { value: BACK, label: "← Go back" },
    ],
  });

  if (p.isCancel(enabled)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  if (enabled === BACK) return BACK;

  if (enabled !== "true") {
    return { enabled: false, evaluationInterval: 30 };
  }

  const interval = await p.text({
    message: "Strategy evaluation interval (minutes): (type 'back' to go to previous step)",
    placeholder: "30",
    initialValue: "30",
    validate: (v) => {
      if (v.trim().toLowerCase() === "back") return;
      const n = parseFloat(v);
      if (isNaN(n) || n <= 0) return "Interval must be a positive number.";
    },
  });

  if (p.isCancel(interval)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  if (interval.trim().toLowerCase() === "back") return BACK;
  return { enabled: true, evaluationInterval: parseFloat(interval) };
}

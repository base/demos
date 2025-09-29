"use client";

import { useCallback } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { Button } from "~/components/ui/Button";

export function SetPrimaryButtonAction() {
  const setPrimaryButton = useCallback((): void => {
    sdk.actions.setPrimaryButton({
      text: "New label set!!",
      loading: false,
      disabled: false,
      hidden: false,
    });
  }, []);

  return (
    <div className="mb-4">
      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
        <pre className="font-mono text-xs text-emerald-500 dark:text-emerald-400">sdk.actions.setPrimaryButton</pre>
      </div>
      <Button onClick={setPrimaryButton}>Set Primary Button</Button>
    </div>
  );
} 
"use client";

import { useState, useCallback } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { Button } from "~/components/ui/Button";

type ExtendedActions = {
  openUrl: (url: string, external?: boolean) => void;
};

export function OpenUrlAction() {
  const [customUrl, setCustomUrl] = useState<string>("https://google.com");
  const [external, setExternal] = useState<boolean>(false);

  const openUrl = useCallback((): void => {
    (sdk.actions as ExtendedActions).openUrl(customUrl, external);
  }, [customUrl, external]);

  return (
    <div className="mb-4">
      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg my-2">
        <pre className="font-mono text-xs text-emerald-500 dark:text-emerald-400">sdk.actions.openUrl</pre>
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 text-emerald-500 dark:text-emerald-400"
          placeholder="Enter URL to open"
        />
      </div>
      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={external}
            onChange={(e) => setExternal(e.target.checked)}
            className="mr-2"
          />
          External
        </label>
      </div>
      <Button onClick={openUrl}>Open Link</Button>
    </div>
  );
} 
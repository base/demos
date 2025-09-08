import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useConfig, WagmiProviderNotFoundError } from "wagmi";
function useProviderDependencies() {
  let providedWagmiConfig = null;
  let providedQueryClient = null;
  try {
    providedWagmiConfig = useConfig();
  } catch (error) {
    if (!(error instanceof WagmiProviderNotFoundError)) {
      console.error("Error fetching WagmiProvider, using default:", error);
    }
  }
  try {
    providedQueryClient = useQueryClient();
  } catch (error) {
    if (!(error.message === "No QueryClient set, use QueryClientProvider to set one")) {
      console.error("Error fetching QueryClient, using default:", error);
    }
  }
  return useMemo(() => {
    return {
      providedWagmiConfig,
      providedQueryClient
    };
  }, [providedWagmiConfig, providedQueryClient]);
}
export {
  useProviderDependencies
};
//# sourceMappingURL=useProviderDependencies.js.map

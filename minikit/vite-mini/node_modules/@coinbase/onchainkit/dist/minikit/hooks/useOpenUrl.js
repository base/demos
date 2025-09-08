import sdk from "@farcaster/frame-sdk";
import { useCallback } from "react";
import { useMiniKit } from "./useMiniKit.js";
function useOpenUrl() {
  const { context } = useMiniKit();
  return useCallback(
    (url) => {
      if (context) {
        sdk.actions.openUrl(url);
      } else {
        window.open(url, "_blank");
      }
    },
    [context]
  );
}
export {
  useOpenUrl
};
//# sourceMappingURL=useOpenUrl.js.map

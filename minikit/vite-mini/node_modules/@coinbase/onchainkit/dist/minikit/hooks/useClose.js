import sdk from "@farcaster/frame-sdk";
import { useCallback } from "react";
function useClose() {
  return useCallback(() => {
    sdk.actions.close();
  }, []);
}
export {
  useClose
};
//# sourceMappingURL=useClose.js.map

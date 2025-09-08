import sdk from "@farcaster/frame-sdk";
import { useEffect } from "react";
function usePrimaryButton(options, callback) {
  useEffect(() => {
    async function setPrimaryButton() {
      await sdk.actions.setPrimaryButton(options);
    }
    sdk.on("primaryButtonClicked", callback);
    setPrimaryButton();
  }, [callback, options]);
}
export {
  usePrimaryButton
};
//# sourceMappingURL=usePrimaryButton.js.map

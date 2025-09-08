import sdk from "@farcaster/frame-sdk";
import { useCallback } from "react";
import { useMiniKit } from "./useMiniKit.js";
function useViewProfile() {
  var _a;
  const { context } = useMiniKit();
  return useCallback(
    (fid) => {
      var _a2;
      const profileFid = fid ?? ((_a2 = context == null ? void 0 : context.user) == null ? void 0 : _a2.fid);
      if (!profileFid) {
        return;
      }
      sdk.actions.viewProfile({ fid: profileFid });
    },
    [(_a = context == null ? void 0 : context.user) == null ? void 0 : _a.fid]
  );
}
export {
  useViewProfile
};
//# sourceMappingURL=useViewProfile.js.map

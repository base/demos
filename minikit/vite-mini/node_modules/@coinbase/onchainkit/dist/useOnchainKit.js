import { createContext, useContext } from "react";
import { ONCHAIN_KIT_CONFIG } from "./core/OnchainKitConfig.js";
const OnchainKitContext = createContext(ONCHAIN_KIT_CONFIG);
function useOnchainKit() {
  return useContext(OnchainKitContext);
}
export {
  OnchainKitContext,
  useOnchainKit
};
//# sourceMappingURL=useOnchainKit.js.map

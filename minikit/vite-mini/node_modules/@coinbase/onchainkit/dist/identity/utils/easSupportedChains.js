import { easChainBase } from "../../core/network/definitions/base.js";
import { easChainBaseSepolia } from "../../core/network/definitions/baseSepolia.js";
import { easChainOptimism } from "../../core/network/definitions/optimism.js";
const easSupportedChains = {
  [easChainBase.id]: easChainBase,
  [easChainBaseSepolia.id]: easChainBaseSepolia,
  [easChainOptimism.id]: easChainOptimism
};
function isChainSupported(chain) {
  return chain.id in easSupportedChains;
}
function getChainEASGraphQLAPI(chain) {
  var _a;
  return ((_a = easSupportedChains[chain.id]) == null ? void 0 : _a.easGraphqlAPI) ?? "";
}
export {
  easSupportedChains,
  getChainEASGraphQLAPI,
  isChainSupported
};
//# sourceMappingURL=easSupportedChains.js.map

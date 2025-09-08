import { base, baseSepolia } from "viem/chains";
function isBase({
  chainId,
  isMainnetOnly = false
}) {
  if (isMainnetOnly && chainId === base.id) {
    return true;
  }
  if (!isMainnetOnly && (chainId === baseSepolia.id || chainId === base.id)) {
    return true;
  }
  return false;
}
export {
  isBase
};
//# sourceMappingURL=isBase.js.map

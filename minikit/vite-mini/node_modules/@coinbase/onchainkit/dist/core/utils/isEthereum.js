import { mainnet, sepolia } from "viem/chains";
function isEthereum({
  chainId,
  isMainnetOnly = false
}) {
  if (isMainnetOnly && chainId === mainnet.id) {
    return true;
  }
  if (!isMainnetOnly && (chainId === sepolia.id || chainId === mainnet.id)) {
    return true;
  }
  return false;
}
export {
  isEthereum
};
//# sourceMappingURL=isEthereum.js.map

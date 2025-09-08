import { mainnet } from "viem/chains";
const convertChainIdToCoinType = (chainId) => {
  if (chainId === mainnet.id) {
    return "addr";
  }
  const cointype = (2147483648 | chainId) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
};
export {
  convertChainIdToCoinType
};
//# sourceMappingURL=convertChainIdToCoinType.js.map

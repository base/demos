import { sepolia, mainnet, polygonMumbai, polygon, optimismSepolia, optimism, arbitrumSepolia, arbitrum, base, baseSepolia } from "viem/chains";
const chainExplorerMap = {
  [baseSepolia.id]: "https://sepolia.basescan.org",
  [base.id]: "https://basescan.org",
  [arbitrum.id]: "https://arbiscan.io",
  [arbitrumSepolia.id]: "https://sepolia.arbiscan.io",
  [optimism.id]: "https://optimistic.etherscan.io",
  [optimismSepolia.id]: "https://sepolia-optimism.etherscan.io/",
  [polygon.id]: "https://polygonscan.com",
  [polygonMumbai.id]: "https://mumbai.polygonscan.com",
  [mainnet.id]: "https://etherscan.io",
  [sepolia.id]: "https://sepolia.etherscan.io"
};
function getChainExplorer(chainId) {
  if (!chainId) {
    return "https://basescan.org";
  }
  return chainExplorerMap[chainId] ?? "https://basescan.org";
}
export {
  getChainExplorer
};
//# sourceMappingURL=getChainExplorer.js.map

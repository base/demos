import { ethSepoliaToken, ethToken, usdcSepoliaToken, usdcToken } from "../../token/constants.js";
import { baseSepolia, base } from "viem/chains";
const APPCHAIN_BRIDGE_ADDRESS = "0x4200000000000000000000000000000000000010";
const APPCHAIN_L2_TO_L1_MESSAGE_PASSER_ADDRESS = "0x4200000000000000000000000000000000000016";
const APPCHAIN_DEPLOY_CONTRACT_ADDRESS = {
  [base.id]: "0xe8c6D9460Ce61D260260d27f30bde8b8d1a8341e",
  [baseSepolia.id]: "0x948DCF664178aFF14733C4Cc2dAbA44bCCaf8230"
};
const ETH_BY_CHAIN = {
  [base.id]: ethToken,
  [baseSepolia.id]: ethSepoliaToken
};
const USDC_BY_CHAIN = {
  [base.id]: usdcToken,
  [baseSepolia.id]: usdcSepoliaToken
};
const DEFAULT_BRIDGEABLE_TOKENS = [
  {
    ...ETH_BY_CHAIN[8453],
    remoteToken: ETH_BY_CHAIN[8453].address
  }
];
const MIN_GAS_LIMIT = 1e5;
const EXTRA_DATA = "0x6f6e636861696e6b6974";
const OUTPUT_ROOT_PROOF_VERSION = "0x0000000000000000000000000000000000000000000000000000000000000000";
export {
  APPCHAIN_BRIDGE_ADDRESS,
  APPCHAIN_DEPLOY_CONTRACT_ADDRESS,
  APPCHAIN_L2_TO_L1_MESSAGE_PASSER_ADDRESS,
  DEFAULT_BRIDGEABLE_TOKENS,
  ETH_BY_CHAIN,
  EXTRA_DATA,
  MIN_GAS_LIMIT,
  OUTPUT_ROOT_PROOF_VERSION,
  USDC_BY_CHAIN
};
//# sourceMappingURL=constants.js.map

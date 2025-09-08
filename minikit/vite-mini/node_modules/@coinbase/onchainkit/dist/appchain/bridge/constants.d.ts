import { Token } from '../../token';
import { Address, Hex } from 'viem';
import { BridgeableToken } from './types';
export declare const APPCHAIN_BRIDGE_ADDRESS = "0x4200000000000000000000000000000000000010";
export declare const APPCHAIN_L2_TO_L1_MESSAGE_PASSER_ADDRESS = "0x4200000000000000000000000000000000000016";
export declare const APPCHAIN_DEPLOY_CONTRACT_ADDRESS: Record<number, Address>;
export declare const ETH_BY_CHAIN: Record<number, Token>;
export declare const USDC_BY_CHAIN: Record<number, Token>;
export declare const DEFAULT_BRIDGEABLE_TOKENS: BridgeableToken[];
export declare const MIN_GAS_LIMIT = 100000;
export declare const EXTRA_DATA = "0x6f6e636861696e6b6974";
export declare const OUTPUT_ROOT_PROOF_VERSION: Hex;
//# sourceMappingURL=constants.d.ts.map
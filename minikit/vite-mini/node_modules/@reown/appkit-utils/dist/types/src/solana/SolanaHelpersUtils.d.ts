import type { CaipNetwork } from '@reown/appkit-common';
import type { Provider } from './SolanaTypesUtil.js';
export declare const SolHelpersUtil: {
    detectRpcUrl(chain: CaipNetwork, projectId: string): string | undefined;
    getChain(chains: CaipNetwork[], chainId: string | null): CaipNetwork;
    hexStringToNumber(value: string): number;
    getAddress(provider: Provider): string | undefined;
};

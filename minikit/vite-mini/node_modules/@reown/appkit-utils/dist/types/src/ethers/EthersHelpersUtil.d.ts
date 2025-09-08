import type { CaipNetwork } from '@reown/appkit-common';
import type { Provider } from './EthersTypesUtil.js';
export declare const EthersHelpersUtil: {
    hexStringToNumber(value: string): number;
    numberToHexString(value: number | string): string;
    getUserInfo(provider: Provider): Promise<{
        chainId: number;
        addresses: string[];
    }>;
    getChainId(provider: Provider): Promise<number>;
    getAddress(provider: Provider): Promise<string | undefined>;
    getAddresses(provider: Provider): Promise<string[]>;
    addEthereumChain(provider: Provider, caipNetwork: CaipNetwork): Promise<void>;
};

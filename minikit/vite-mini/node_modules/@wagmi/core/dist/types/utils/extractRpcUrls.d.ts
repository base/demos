import type { Chain, Transport } from 'viem';
type ExtractRpcUrlsParameters = {
    transports?: Record<string, Transport> | undefined;
    chain: Chain;
};
export declare function extractRpcUrls(parameters: ExtractRpcUrlsParameters): any[];
export {};
//# sourceMappingURL=extractRpcUrls.d.ts.map
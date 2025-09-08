import type { MetaMaskSDKOptions, SDKProvider } from '@metamask/sdk';
import type { Compute, ExactPartial, OneOf, UnionCompute } from '@wagmi/core/internal';
import { type ProviderConnectInfo } from 'viem';
export type MetaMaskParameters = UnionCompute<WagmiMetaMaskSDKOptions & OneOf<{
    connectAndSign?: string | undefined;
} | {
    connectWith?: {
        method: string;
        params: unknown[];
    } | undefined;
}>>;
type WagmiMetaMaskSDKOptions = Compute<ExactPartial<Omit<MetaMaskSDKOptions, '_source' | 'forceDeleteProvider' | 'forceInjectProvider' | 'injectProvider' | 'useDeeplink' | 'readonlyRPCMap'>> & {
    /** @deprecated */
    forceDeleteProvider?: MetaMaskSDKOptions['forceDeleteProvider'];
    /** @deprecated */
    forceInjectProvider?: MetaMaskSDKOptions['forceInjectProvider'];
    /** @deprecated */
    injectProvider?: MetaMaskSDKOptions['injectProvider'];
    /** @deprecated */
    useDeeplink?: MetaMaskSDKOptions['useDeeplink'];
}>;
export declare function metaMask(parameters?: MetaMaskParameters): import("@wagmi/core").CreateConnectorFn<SDKProvider, {
    onConnect(connectInfo: ProviderConnectInfo): void;
    onDisplayUri(uri: string): void;
}, Record<string, unknown>>;
export declare namespace metaMask {
    var type: "metaMask";
}
export {};
//# sourceMappingURL=metaMask.d.ts.map
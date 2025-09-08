import type { CaipNetworkId, EmbeddedWalletTimeoutReason } from '@reown/appkit-common';
import { W3mFrameProvider } from '@reown/appkit-wallet';
interface W3mFrameProviderConfig {
    projectId: string;
    chainId: number | CaipNetworkId | undefined;
    enableLogger?: boolean;
    onTimeout?: (reason: EmbeddedWalletTimeoutReason) => void;
    abortController: AbortController;
}
export declare class W3mFrameProviderSingleton {
    private static instance;
    private constructor();
    static getInstance({ projectId, chainId, enableLogger, onTimeout, abortController }: W3mFrameProviderConfig): W3mFrameProvider;
}
export {};

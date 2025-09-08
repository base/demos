import type { CaipNetwork, ChainNamespace } from '@reown/appkit-common';
import type { Connector, WcWallet } from './TypeUtil.js';
export interface AssetUtilState {
    networkImagePromises: Record<string, Promise<void>>;
}
export declare const AssetUtil: {
    fetchWalletImage(imageId?: string): Promise<string | undefined>;
    fetchNetworkImage(imageId?: string): Promise<string | undefined>;
    getWalletImageById(imageId?: string): string | undefined;
    getWalletImage(wallet?: WcWallet): string | undefined;
    getNetworkImage(network?: CaipNetwork): string | undefined;
    getNetworkImageById(imageId?: string): string | undefined;
    getConnectorImage(connector?: Connector): string | undefined;
    getChainImage(chain: ChainNamespace): string | undefined;
};

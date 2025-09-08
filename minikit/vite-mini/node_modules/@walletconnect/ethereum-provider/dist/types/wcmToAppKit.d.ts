import type { AppKitOptions, CaipNetwork } from "@reown/appkit";
import type { WalletConnectModalConfig } from "./types";
import type { EthereumProviderOptions } from "./EthereumProvider";
import type { Assign, ChainFormatters, Prettify } from "viem";
export declare function convertWCMToAppKitOptions(wcmConfig: WalletConnectModalConfig & {
    metadata?: EthereumProviderOptions["metadata"];
}): AppKitOptions;
export declare function defineChain<formatters extends ChainFormatters, const chain extends CaipNetwork<formatters>>(chain: chain): Prettify<Assign<CaipNetwork<undefined>, chain>>;
//# sourceMappingURL=wcmToAppKit.d.ts.map
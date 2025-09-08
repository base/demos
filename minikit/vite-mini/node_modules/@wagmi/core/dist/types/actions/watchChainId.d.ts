import type { Config } from '../createConfig.js';
import type { GetChainIdReturnType } from './getChainId.js';
export type WatchChainIdParameters<config extends Config = Config> = {
    onChange(chainId: GetChainIdReturnType<config>, prevChainId: GetChainIdReturnType<config>): void;
};
export type WatchChainIdReturnType = () => void;
/** https://wagmi.sh/core/api/actions/watchChainId */
export declare function watchChainId<config extends Config>(config: config, parameters: WatchChainIdParameters<config>): WatchChainIdReturnType;
//# sourceMappingURL=watchChainId.d.ts.map
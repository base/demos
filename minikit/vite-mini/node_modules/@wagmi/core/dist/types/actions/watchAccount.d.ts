import type { Config } from '../createConfig.js';
import { type GetAccountReturnType } from './getAccount.js';
export type WatchAccountParameters<config extends Config = Config> = {
    onChange(account: GetAccountReturnType<config>, prevAccount: GetAccountReturnType<config>): void;
};
export type WatchAccountReturnType = () => void;
/** https://wagmi.sh/core/api/actions/watchAccount */
export declare function watchAccount<config extends Config>(config: config, parameters: WatchAccountParameters<config>): WatchAccountReturnType;
//# sourceMappingURL=watchAccount.d.ts.map
import { type WatchAssetErrorType, type WatchAssetParameters, type WatchAssetReturnType } from '../actions/watchAsset.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
import type { Mutate, MutateAsync } from './types.js';
export declare function watchAssetMutationOptions(config: Config): {
    readonly mutationFn: (variables: {
        type: "ERC20";
        options: {
            address: string;
            symbol: string;
            decimals: number;
            image?: string | undefined;
        };
        connector?: import("../createConfig.js").Connector | undefined;
    }) => Promise<boolean>;
    readonly mutationKey: readonly ["watchAsset"];
};
export type WatchAssetData = WatchAssetReturnType;
export type WatchAssetVariables = Compute<WatchAssetParameters>;
export type WatchAssetMutate<context = unknown> = Mutate<WatchAssetData, WatchAssetErrorType, WatchAssetVariables, context>;
export type WatchAssetMutateAsync<context = unknown> = MutateAsync<WatchAssetData, WatchAssetErrorType, WatchAssetVariables, context>;
//# sourceMappingURL=watchAsset.d.ts.map
import type { BlockTag } from 'viem';
import { type GetBlockParameters, type GetBlockReturnType } from '../actions/getBlock.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetBlockOptions<includeTransactions extends boolean, blockTag extends BlockTag, config extends Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<ExactPartial<GetBlockParameters<includeTransactions, blockTag, config, chainId>> & ScopeKeyParameter>;
export declare function getBlockQueryOptions<config extends Config, chainId extends config['chains'][number]['id'], includeTransactions extends boolean, blockTag extends BlockTag>(config: config, options?: GetBlockOptions<includeTransactions, blockTag, config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["block", GetBlockOptions<includeTransactions, blockTag, config, chainId>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<any>;
    readonly queryKey: readonly ["block", GetBlockOptions<includeTransactions, blockTag, config, config["chains"][number]["id"]>];
};
export type GetBlockQueryFnData<includeTransactions extends boolean, blockTag extends BlockTag, config extends Config, chainId extends config['chains'][number]['id']> = GetBlockReturnType<includeTransactions, blockTag, config, chainId>;
export type GetBlockData<includeTransactions extends boolean, blockTag extends BlockTag, config extends Config, chainId extends config['chains'][number]['id']> = GetBlockQueryFnData<includeTransactions, blockTag, config, chainId>;
export declare function getBlockQueryKey<config extends Config, chainId extends config['chains'][number]['id'], includeTransactions extends boolean = false, blockTag extends BlockTag = 'latest'>(options?: GetBlockOptions<includeTransactions, blockTag, config, chainId>): readonly ["block", GetBlockOptions<includeTransactions, blockTag, config, chainId>];
export type GetBlockQueryKey<includeTransactions extends boolean, blockTag extends BlockTag, config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getBlockQueryKey<config, chainId, includeTransactions, blockTag>>;
//# sourceMappingURL=getBlock.d.ts.map
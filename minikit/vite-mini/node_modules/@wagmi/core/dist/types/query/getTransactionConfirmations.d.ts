import { type GetTransactionConfirmationsParameters, type GetTransactionConfirmationsReturnType } from '../actions/getTransactionConfirmations.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { UnionExactPartial } from '../types/utils.js';
export type GetTransactionConfirmationsOptions<config extends Config, chainId extends config['chains'][number]['id'] | undefined = config['chains'][number]['id']> = UnionExactPartial<GetTransactionConfirmationsParameters<config, chainId>> & ScopeKeyParameter;
export declare function getTransactionConfirmationsQueryOptions<config extends Config, chainId extends config['chains'][number]['id'] | undefined = config['chains'][number]['id']>(config: config, options?: GetTransactionConfirmationsOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["transactionConfirmations", GetTransactionConfirmationsOptions<config, chainId>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<bigint>;
    readonly queryKey: readonly ["transactionConfirmations", GetTransactionConfirmationsOptions<config, chainId>];
};
export type GetTransactionConfirmationsQueryFnData = GetTransactionConfirmationsReturnType;
export type GetTransactionConfirmationsData = GetTransactionConfirmationsQueryFnData;
export declare function getTransactionConfirmationsQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined = config['chains'][number]['id']>(options?: GetTransactionConfirmationsOptions<config, chainId>): readonly ["transactionConfirmations", GetTransactionConfirmationsOptions<config, chainId>];
export type GetTransactionConfirmationsQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined = config['chains'][number]['id']> = ReturnType<typeof getTransactionConfirmationsQueryKey<config, chainId>>;
//# sourceMappingURL=getTransactionConfirmations.d.ts.map
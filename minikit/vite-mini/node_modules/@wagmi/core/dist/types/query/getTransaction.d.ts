import { type GetTransactionParameters, type GetTransactionReturnType } from '../actions/getTransaction.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetTransactionOptions<config extends Config, chainId extends config['chains'][number]['id']> = Compute<ExactPartial<GetTransactionParameters<config, chainId>> & ScopeKeyParameter>;
export declare function getTransactionQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: GetTransactionOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["transaction", GetTransactionOptions<config, chainId>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<(import("../types/chain.js").SelectChains<config, chainId> extends infer T_1 extends readonly import("viem").Chain[] ? { [key_1 in keyof T_1]: (import("viem").FormattedTransaction<import("../types/utils.js").IsNarrowable<T_1[key_1], import("viem").Chain> extends true ? T_1[key_1] : undefined, "latest"> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) & {
        chainId: T_1[key_1]["id"];
    }; } : never)[number] extends infer T ? { [key in keyof T]: T[key]; } : never>;
    readonly queryKey: readonly ["transaction", GetTransactionOptions<config, config["chains"][number]["id"]>];
};
export type GetTransactionQueryFnData<config extends Config, chainId extends config['chains'][number]['id']> = GetTransactionReturnType<config, chainId>;
export type GetTransactionData<config extends Config, chainId extends config['chains'][number]['id']> = GetTransactionQueryFnData<config, chainId>;
export declare function getTransactionQueryKey<config extends Config, chainId extends config['chains'][number]['id']>(options?: GetTransactionOptions<config, chainId>): readonly ["transaction", GetTransactionOptions<config, chainId>];
export type GetTransactionQueryKey<config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getTransactionQueryKey<config, chainId>>;
//# sourceMappingURL=getTransaction.d.ts.map
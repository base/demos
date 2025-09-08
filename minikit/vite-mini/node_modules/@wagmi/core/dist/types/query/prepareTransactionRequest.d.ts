import type { PrepareTransactionRequestRequest as viem_PrepareTransactionRequestRequest } from 'viem';
import { type PrepareTransactionRequestParameters, type PrepareTransactionRequestReturnType } from '../actions/prepareTransactionRequest.js';
import type { Config } from '../createConfig.js';
import type { SelectChains } from '../types/chain.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { UnionExactPartial } from '../types/utils.js';
export type PrepareTransactionRequestOptions<config extends Config, chainId extends config['chains'][number]['id'] | undefined, request extends viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>> = UnionExactPartial<PrepareTransactionRequestParameters<config, chainId, request>> & ScopeKeyParameter;
export declare function prepareTransactionRequestQueryOptions<config extends Config, chainId extends config['chains'][number]['id'] | undefined, request extends viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>>(config: config, options?: PrepareTransactionRequestOptions<config, chainId, request>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["prepareTransactionRequest", PrepareTransactionRequestOptions<config, chainId, request>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<PrepareTransactionRequestQueryFnData<config, chainId, request>>;
    readonly queryKey: readonly ["prepareTransactionRequest", PrepareTransactionRequestOptions<config, chainId, request>];
};
export type PrepareTransactionRequestQueryFnData<config extends Config, chainId extends config['chains'][number]['id'] | undefined, request extends viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>> = PrepareTransactionRequestReturnType<config, chainId, request>;
export type PrepareTransactionRequestData<config extends Config, chainId extends config['chains'][number]['id'] | undefined, request extends viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>> = PrepareTransactionRequestQueryFnData<config, chainId, request>;
export declare function prepareTransactionRequestQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined, request extends viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>>(options: PrepareTransactionRequestOptions<config, chainId, request>): readonly ["prepareTransactionRequest", PrepareTransactionRequestOptions<config, chainId, request>];
export type PrepareTransactionRequestQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined, request extends viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>> = ReturnType<typeof prepareTransactionRequestQueryKey<config, chainId, request>>;
//# sourceMappingURL=prepareTransactionRequest.d.ts.map
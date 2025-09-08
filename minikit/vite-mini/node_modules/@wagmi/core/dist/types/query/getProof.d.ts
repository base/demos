import { type GetProofParameters, type GetProofReturnType } from '../actions/getProof.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetProofOptions<config extends Config> = Compute<ExactPartial<GetProofParameters<config>> & ScopeKeyParameter>;
export declare function getProofQueryOptions<config extends Config>(config: config, options?: GetProofOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["getProof", GetProofOptions<config>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").GetProofReturnType>;
    readonly queryKey: readonly ["getProof", GetProofOptions<config>];
};
export type GetProofQueryFnData = GetProofReturnType;
export type GetProofData = GetProofQueryFnData;
export declare function getProofQueryKey<config extends Config>(options: GetProofOptions<config>): readonly ["getProof", GetProofOptions<config>];
export type GetProofQueryKey<config extends Config> = ReturnType<typeof getProofQueryKey<config>>;
//# sourceMappingURL=getProof.d.ts.map
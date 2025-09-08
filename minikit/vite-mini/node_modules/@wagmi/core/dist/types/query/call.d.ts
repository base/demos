import { type CallParameters, type CallReturnType } from '../actions/call.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type CallOptions<config extends Config> = Compute<ExactPartial<CallParameters<config>> & ScopeKeyParameter>;
export declare function callQueryOptions<config extends Config>(config: config, options?: CallOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["call", CallOptions<config>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<import("viem").CallReturnType>;
    readonly queryKey: readonly ["call", CallOptions<config>];
};
export type CallQueryFnData = CallReturnType;
export type CallData = CallQueryFnData;
export declare function callQueryKey<config extends Config>(options: CallOptions<config>): readonly ["call", CallOptions<config>];
export type CallQueryKey<config extends Config> = ReturnType<typeof callQueryKey<config>>;
//# sourceMappingURL=call.d.ts.map
import { type GetBytecodeParameters, type GetBytecodeReturnType } from '../actions/getBytecode.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetBytecodeOptions<config extends Config> = Compute<ExactPartial<GetBytecodeParameters<config>> & ScopeKeyParameter>;
export declare function getBytecodeQueryOptions<config extends Config>(config: config, options?: GetBytecodeOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["getBytecode", GetBytecodeOptions<config>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<any>;
    readonly queryKey: readonly ["getBytecode", GetBytecodeOptions<config>];
};
export type GetBytecodeQueryFnData = GetBytecodeReturnType;
export type GetBytecodeData = GetBytecodeQueryFnData;
export declare function getBytecodeQueryKey<config extends Config>(options: GetBytecodeOptions<config>): readonly ["getBytecode", GetBytecodeOptions<config>];
export type GetBytecodeQueryKey<config extends Config> = ReturnType<typeof getBytecodeQueryKey<config>>;
//# sourceMappingURL=getBytecode.d.ts.map
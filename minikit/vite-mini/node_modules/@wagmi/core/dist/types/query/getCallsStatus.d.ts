import { type GetCallsStatusParameters, type GetCallsStatusReturnType } from '../actions/getCallsStatus.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetCallsStatusOptions = Compute<GetCallsStatusParameters & ScopeKeyParameter>;
export declare function getCallsStatusQueryOptions<config extends Config>(config: config, options: GetCallsStatusOptions): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["callsStatus", {
            id: string;
            connector?: import("../createConfig.js").Connector | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<{
        chainId: number;
        id: string;
        version: string;
        atomic: boolean;
        capabilities?: {
            [key: string]: any;
        } | {
            [x: string]: any;
        } | undefined;
        receipts?: import("viem").WalletCallReceipt<bigint, "success" | "reverted">[] | undefined;
        statusCode: number;
        status: "pending" | "success" | "failure" | undefined;
    }>;
    readonly queryKey: readonly ["callsStatus", {
        id: string;
        connector?: import("../createConfig.js").Connector | undefined;
        scopeKey?: string | undefined | undefined;
    }];
    readonly retry: (failureCount: number, error: import("viem").GetCallsStatusErrorType) => boolean;
};
export type GetCallsStatusQueryFnData = GetCallsStatusReturnType;
export type GetCallsStatusData = GetCallsStatusQueryFnData;
export declare function getCallsStatusQueryKey(options: GetCallsStatusOptions): readonly ["callsStatus", {
    id: string;
    connector?: import("../createConfig.js").Connector | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetCallsStatusQueryKey = ReturnType<typeof getCallsStatusQueryKey>;
//# sourceMappingURL=getCallsStatus.d.ts.map
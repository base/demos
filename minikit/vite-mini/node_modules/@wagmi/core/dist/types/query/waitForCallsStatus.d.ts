import { type WaitForCallsStatusParameters, type WaitForCallsStatusReturnType } from '../actions/waitForCallsStatus.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, PartialBy } from '../types/utils.js';
export type WaitForCallsStatusOptions = Compute<PartialBy<WaitForCallsStatusParameters, 'id'> & ScopeKeyParameter>;
export declare function waitForCallsStatusQueryOptions<config extends Config>(config: config, options: WaitForCallsStatusOptions): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["callsStatus", {
            id?: string | undefined;
            status?: ((parameters: import("viem").GetCallsStatusReturnType) => boolean) | undefined | undefined;
            pollingInterval?: number | undefined | undefined;
            connector?: import("../createConfig.js").Connector | undefined;
            timeout?: number | undefined | undefined;
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
        id?: string | undefined;
        status?: ((parameters: import("viem").GetCallsStatusReturnType) => boolean) | undefined | undefined;
        pollingInterval?: number | undefined | undefined;
        connector?: import("../createConfig.js").Connector | undefined;
        timeout?: number | undefined | undefined;
        scopeKey?: string | undefined | undefined;
    }];
    readonly retry: (failureCount: number, error: import("viem").WaitForCallsStatusErrorType) => boolean;
};
export type WaitForCallsStatusQueryFnData = WaitForCallsStatusReturnType;
export type WaitForCallsStatusData = WaitForCallsStatusQueryFnData;
export declare function waitForCallsStatusQueryKey(options: WaitForCallsStatusOptions): readonly ["callsStatus", {
    id?: string | undefined;
    status?: ((parameters: import("viem").GetCallsStatusReturnType) => boolean) | undefined | undefined;
    pollingInterval?: number | undefined | undefined;
    connector?: import("../createConfig.js").Connector | undefined;
    timeout?: number | undefined | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type WaitForCallsStatusQueryKey = ReturnType<typeof waitForCallsStatusQueryKey>;
//# sourceMappingURL=waitForCallsStatus.d.ts.map
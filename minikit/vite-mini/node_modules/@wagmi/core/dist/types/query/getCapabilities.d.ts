import { type GetCapabilitiesParameters, type GetCapabilitiesReturnType } from '../actions/getCapabilities.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetCapabilitiesOptions<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined> = Compute<ExactPartial<GetCapabilitiesParameters<config, chainId>> & ScopeKeyParameter>;
export declare function getCapabilitiesQueryOptions<config extends Config, chainId extends config['chains'][number]['id'] | undefined = undefined>(config: config, options?: GetCapabilitiesOptions<config, chainId>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["capabilities", {
            account?: `0x${string}` | import("viem").Account | undefined;
            chainId?: number | chainId | undefined;
            connector?: import("../createConfig.js").Connector | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<(chainId extends number ? {
        [x: string]: any;
        atomic?: {
            status: "supported" | "ready" | "unsupported";
        } | undefined | undefined;
        unstable_addSubAccount?: {
            keyTypes: ("address" | "p256" | "webcrypto-p256" | "webauthn-p256")[];
            supported: boolean;
        } | undefined | undefined;
        paymasterService?: {
            supported: boolean;
        } | undefined | undefined;
    } : import("viem").WalletCapabilitiesRecord<import("viem").Capabilities<{
        [x: string]: any;
        atomic?: {
            status: "supported" | "ready" | "unsupported";
        } | undefined | undefined;
        unstable_addSubAccount?: {
            keyTypes: ("address" | "p256" | "webcrypto-p256" | "webauthn-p256")[];
            supported: boolean;
        } | undefined | undefined;
        paymasterService?: {
            supported: boolean;
        } | undefined | undefined;
    }>, number>) extends infer T ? { [K in keyof T]: T[K]; } : never>;
    readonly queryKey: readonly ["capabilities", {
        account?: `0x${string}` | import("viem").Account | undefined;
        chainId?: number | chainId | undefined;
        connector?: import("../createConfig.js").Connector | undefined;
        scopeKey?: string | undefined | undefined;
    }];
    readonly retry: (failureCount: number, error: import("viem").GetCapabilitiesErrorType) => boolean;
};
export type GetCapabilitiesQueryFnData<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined> = GetCapabilitiesReturnType<config, chainId>;
export type GetCapabilitiesData<config extends Config = Config, chainId extends config['chains'][number]['id'] | undefined = undefined> = GetCapabilitiesQueryFnData<config, chainId>;
export declare function getCapabilitiesQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined = undefined>(options?: GetCapabilitiesOptions<config, chainId>): readonly ["capabilities", {
    account?: `0x${string}` | import("viem").Account | undefined;
    chainId?: number | chainId | undefined;
    connector?: import("../createConfig.js").Connector | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type GetCapabilitiesQueryKey<config extends Config, chainId extends config['chains'][number]['id'] | undefined = undefined> = ReturnType<typeof getCapabilitiesQueryKey<config, chainId>>;
//# sourceMappingURL=getCapabilities.d.ts.map
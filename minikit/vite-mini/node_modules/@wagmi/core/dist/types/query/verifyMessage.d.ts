import { type VerifyMessageParameters, type VerifyMessageReturnType } from '../actions/verifyMessage.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type VerifyMessageOptions<config extends Config> = Compute<ExactPartial<VerifyMessageParameters<config>> & ScopeKeyParameter>;
export declare function verifyMessageQueryOptions<config extends Config>(config: config, options?: VerifyMessageOptions<config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["verifyMessage", {
            address?: `0x${string}` | undefined;
            blockNumber?: bigint | undefined | undefined;
            factory?: `0x${string}` | undefined;
            factoryData?: `0x${string}` | undefined;
            signature?: `0x${string}` | import("viem").ByteArray | import("viem").Signature | undefined;
            blockTag?: import("viem").BlockTag | undefined;
            universalSignatureVerifierAddress?: `0x${string}` | undefined;
            message?: import("viem").SignableMessage | undefined;
            chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
            scopeKey?: string | undefined | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<boolean>;
    readonly queryKey: readonly ["verifyMessage", {
        address?: `0x${string}` | undefined;
        blockNumber?: bigint | undefined | undefined;
        factory?: `0x${string}` | undefined;
        factoryData?: `0x${string}` | undefined;
        signature?: `0x${string}` | import("viem").ByteArray | import("viem").Signature | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        universalSignatureVerifierAddress?: `0x${string}` | undefined;
        message?: import("viem").SignableMessage | undefined;
        chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        scopeKey?: string | undefined | undefined;
    }];
};
export type VerifyMessageQueryFnData = VerifyMessageReturnType;
export type VerifyMessageData = VerifyMessageQueryFnData;
export declare function verifyMessageQueryKey<config extends Config>(options: VerifyMessageOptions<config>): readonly ["verifyMessage", {
    address?: `0x${string}` | undefined;
    blockNumber?: bigint | undefined | undefined;
    factory?: `0x${string}` | undefined;
    factoryData?: `0x${string}` | undefined;
    signature?: `0x${string}` | import("viem").ByteArray | import("viem").Signature | undefined;
    blockTag?: import("viem").BlockTag | undefined;
    universalSignatureVerifierAddress?: `0x${string}` | undefined;
    message?: import("viem").SignableMessage | undefined;
    chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
    scopeKey?: string | undefined | undefined;
}];
export type VerifyMessageQueryKey<config extends Config> = ReturnType<typeof verifyMessageQueryKey<config>>;
//# sourceMappingURL=verifyMessage.d.ts.map
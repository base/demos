import type { TypedData } from 'viem';
import { type VerifyTypedDataParameters, type VerifyTypedDataReturnType } from '../actions/verifyTypedData.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { ExactPartial } from '../types/utils.js';
export type VerifyTypedDataOptions<typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain', config extends Config> = ExactPartial<VerifyTypedDataParameters<typedData, primaryType, config>> & ScopeKeyParameter;
export declare function verifyTypedDataQueryOptions<config extends Config, const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(config: config, options?: VerifyTypedDataOptions<typedData, primaryType, config>): {
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["verifyTypedData", VerifyTypedDataOptions<typedData, primaryType, config>];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<boolean>;
    readonly queryKey: readonly ["verifyTypedData", VerifyTypedDataOptions<typedData, primaryType, config>];
};
export type VerifyTypedDataQueryFnData = VerifyTypedDataReturnType;
export type VerifyTypedDataData = VerifyTypedDataQueryFnData;
export declare function verifyTypedDataQueryKey<config extends Config, const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(options: VerifyTypedDataOptions<typedData, primaryType, config>): readonly ["verifyTypedData", VerifyTypedDataOptions<typedData, primaryType, config>];
export type VerifyTypedDataQueryKey<typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain', config extends Config> = ReturnType<typeof verifyTypedDataQueryKey<config, typedData, primaryType>>;
//# sourceMappingURL=verifyTypedData.d.ts.map
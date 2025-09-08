import type { Config, ResolvedRegister, VerifyTypedDataErrorType } from '@wagmi/core';
import type { VerifyTypedDataQueryFnData } from '@wagmi/core/query';
import { type VerifyTypedDataData, type VerifyTypedDataOptions, type VerifyTypedDataQueryKey } from '@wagmi/core/query';
import type { TypedData } from 'viem';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseVerifyTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData, config extends Config = Config, selectData = VerifyTypedDataData> = VerifyTypedDataOptions<typedData, primaryType, config> & ConfigParameter<config> & QueryParameter<VerifyTypedDataQueryFnData, VerifyTypedDataErrorType, selectData, VerifyTypedDataQueryKey<typedData, primaryType, config>>;
export type UseVerifyTypedDataReturnType<selectData = VerifyTypedDataData> = UseQueryReturnType<selectData, VerifyTypedDataErrorType>;
/** https://wagmi.sh/react/api/hooks/useVerifyTypedData */
export declare function useVerifyTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain', config extends Config = ResolvedRegister['config'], selectData = VerifyTypedDataData>(parameters?: UseVerifyTypedDataParameters<typedData, primaryType, config, selectData>): UseVerifyTypedDataReturnType<selectData>;
//# sourceMappingURL=useVerifyTypedData.d.ts.map
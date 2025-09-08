import type { TypedData } from 'viem';
import { type VerifyTypedDataErrorType as viem_VerifyTypedDataErrorType, type VerifyTypedDataParameters as viem_VerifyTypedDataParameters, type VerifyTypedDataReturnType as viem_VerifyTypedDataReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type VerifyTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData, config extends Config = Config> = Compute<viem_VerifyTypedDataParameters<typedData, primaryType> & ChainIdParameter<config>>;
export type VerifyTypedDataReturnType = viem_VerifyTypedDataReturnType;
export type VerifyTypedDataErrorType = viem_VerifyTypedDataErrorType;
/** https://wagmi.sh/core/api/actions/verifyTypedData */
export declare function verifyTypedData<config extends Config, const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(config: config, parameters: VerifyTypedDataParameters<typedData, primaryType, config>): Promise<VerifyTypedDataReturnType>;
//# sourceMappingURL=verifyTypedData.d.ts.map
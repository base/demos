import type { Account, TypedData } from 'viem';
import { type SignMessageErrorType as viem_SignMessageErrorType, type SignTypedDataParameters as viem_SignTypedDataParameters, type SignTypedDataReturnType as viem_SignTypedDataReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { ConnectorParameter } from '../types/properties.js';
import type { UnionCompute } from '../types/utils.js';
import { type GetConnectorClientErrorType } from './getConnectorClient.js';
export type SignTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData, primaryTypes = typedData extends TypedData ? keyof typedData : string> = UnionCompute<viem_SignTypedDataParameters<typedData, primaryType, Account, primaryTypes> & ConnectorParameter>;
export type SignTypedDataReturnType = viem_SignTypedDataReturnType;
export type SignTypedDataErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_SignMessageErrorType;
/** https://wagmi.sh/core/api/actions/signTypedData */
export declare function signTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain'>(config: Config, parameters: SignTypedDataParameters<typedData, primaryType>): Promise<SignTypedDataReturnType>;
//# sourceMappingURL=signTypedData.d.ts.map
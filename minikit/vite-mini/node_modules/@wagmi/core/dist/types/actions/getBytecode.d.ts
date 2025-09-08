import { type GetBytecodeErrorType as viem_GetBytecodeErrorType, type GetBytecodeParameters as viem_GetBytecodeParameters, type GetBytecodeReturnType as viem_GetBytecodeReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetBytecodeParameters<config extends Config = Config> = Compute<viem_GetBytecodeParameters & ChainIdParameter<config>>;
export type GetBytecodeReturnType = viem_GetBytecodeReturnType;
export type GetBytecodeErrorType = viem_GetBytecodeErrorType;
/** https://wagmi.sh/core/api/actions/getBytecode */
export declare function getBytecode<config extends Config>(config: config, parameters: GetBytecodeParameters<config>): Promise<GetBytecodeReturnType>;
//# sourceMappingURL=getBytecode.d.ts.map
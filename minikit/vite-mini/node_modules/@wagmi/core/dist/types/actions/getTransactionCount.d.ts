import { type GetTransactionCountErrorType as viem_GetTransactionCountErrorType, type GetTransactionCountParameters as viem_GetTransactionCountParameters, type GetTransactionCountReturnType as viem_GetTransactionCountReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetTransactionCountParameters<config extends Config = Config> = Compute<ChainIdParameter<config> & viem_GetTransactionCountParameters>;
export type GetTransactionCountReturnType = viem_GetTransactionCountReturnType;
export type GetTransactionCountErrorType = viem_GetTransactionCountErrorType;
/** https://wagmi.sh/core/api/actions/getTransactionCount */
export declare function getTransactionCount<config extends Config>(config: config, parameters: GetTransactionCountParameters<config>): Promise<GetTransactionCountReturnType>;
//# sourceMappingURL=getTransactionCount.d.ts.map
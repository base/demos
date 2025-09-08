import { type GetFeeHistoryErrorType as viem_GetFeeHistoryErrorType, type GetFeeHistoryParameters as viem_GetFeeHistoryParameters, type GetFeeHistoryReturnType as viem_GetFeeHistoryReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type GetFeeHistoryParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']> = Compute<viem_GetFeeHistoryParameters & ChainIdParameter<config, chainId>>;
export type GetFeeHistoryReturnType = viem_GetFeeHistoryReturnType;
export type GetFeeHistoryErrorType = viem_GetFeeHistoryErrorType;
/** https://wagmi.sh/core/api/actions/getFeeHistory */
export declare function getFeeHistory<config extends Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']>(config: config, parameters: GetFeeHistoryParameters<config, chainId>): Promise<GetFeeHistoryReturnType>;
//# sourceMappingURL=getFeeHistory.d.ts.map
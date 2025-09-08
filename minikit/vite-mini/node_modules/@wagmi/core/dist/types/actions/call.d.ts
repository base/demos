import type { CallErrorType as viem_CallErrorType, CallParameters as viem_CallParameters, CallReturnType as viem_CallReturnType } from 'viem';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
export type CallParameters<config extends Config = Config> = viem_CallParameters & ChainIdParameter<config>;
export type CallReturnType = viem_CallReturnType;
export type CallErrorType = viem_CallErrorType;
export declare function call<config extends Config>(config: config, parameters: CallParameters<config>): Promise<CallReturnType>;
//# sourceMappingURL=call.d.ts.map
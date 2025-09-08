import { type VerifyMessageErrorType as viem_VerifyMessageErrorType, type VerifyMessageParameters as viem_VerifyMessageParameters, type VerifyMessageReturnType as viem_VerifyMessageReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
export type VerifyMessageParameters<config extends Config = Config> = Compute<viem_VerifyMessageParameters & ChainIdParameter<config>>;
export type VerifyMessageReturnType = viem_VerifyMessageReturnType;
export type VerifyMessageErrorType = viem_VerifyMessageErrorType;
/** https://wagmi.sh/core/api/actions/verifyMessage */
export declare function verifyMessage<config extends Config>(config: config, parameters: VerifyMessageParameters<config>): Promise<VerifyMessageReturnType>;
//# sourceMappingURL=verifyMessage.d.ts.map
import type { Account } from 'viem';
import { type SignMessageErrorType as viem_SignMessageErrorType, type SignMessageParameters as viem_SignMessageParameters, type SignMessageReturnType as viem_SignMessageReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { ConnectorParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
import { type GetConnectorClientErrorType } from './getConnectorClient.js';
export type SignMessageParameters = Compute<viem_SignMessageParameters<Account> & ConnectorParameter>;
export type SignMessageReturnType = viem_SignMessageReturnType;
export type SignMessageErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_SignMessageErrorType;
/** https://wagmi.sh/core/api/actions/signMessage */
export declare function signMessage(config: Config, parameters: SignMessageParameters): Promise<SignMessageReturnType>;
//# sourceMappingURL=signMessage.d.ts.map
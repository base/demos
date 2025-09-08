import { type ShowCallsStatusErrorType as viem_ShowCallsStatusErrorType, type ShowCallsStatusParameters as viem_ShowCallsStatusParameters, type ShowCallsStatusReturnType as viem_ShowCallsStatusReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { ConnectorParameter } from '../types/properties.js';
export type ShowCallsStatusParameters = viem_ShowCallsStatusParameters & ConnectorParameter;
export type ShowCallsStatusReturnType = viem_ShowCallsStatusReturnType;
export type ShowCallsStatusErrorType = viem_ShowCallsStatusErrorType;
/** https://wagmi.sh/core/api/actions/showCallsStatus */
export declare function showCallsStatus<config extends Config>(config: config, parameters: ShowCallsStatusParameters): Promise<ShowCallsStatusReturnType>;
//# sourceMappingURL=showCallsStatus.d.ts.map
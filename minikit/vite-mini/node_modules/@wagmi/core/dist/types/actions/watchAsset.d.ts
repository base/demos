import { type WatchAssetErrorType as viem_WatchAssetErrorType, type WatchAssetParameters as viem_WatchAssetParameters, type WatchAssetReturnType as viem_WatchAssetReturnType } from 'viem/actions';
import type { Config } from '../createConfig.js';
import type { BaseErrorType, ErrorType } from '../errors/base.js';
import type { ConnectorParameter } from '../types/properties.js';
import type { Compute } from '../types/utils.js';
import { type GetConnectorClientErrorType } from './getConnectorClient.js';
export type WatchAssetParameters = Compute<viem_WatchAssetParameters & ConnectorParameter>;
export type WatchAssetReturnType = viem_WatchAssetReturnType;
export type WatchAssetErrorType = GetConnectorClientErrorType | BaseErrorType | ErrorType | viem_WatchAssetErrorType;
/** https://wagmi.sh/core/api/actions/watchAsset */
export declare function watchAsset(config: Config, parameters: WatchAssetParameters): Promise<WatchAssetReturnType>;
//# sourceMappingURL=watchAsset.d.ts.map
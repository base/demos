import type { Address } from 'viem';
import type { Config, Connector } from '../createConfig.js';
import type { BaseError, ErrorType } from '../errors/base.js';
import { type ConnectorNotConnectedErrorType } from '../errors/config.js';
export type SwitchAccountParameters = {
    connector: Connector;
};
export type SwitchAccountReturnType<config extends Config = Config> = {
    accounts: readonly [Address, ...Address[]];
    chainId: config['chains'][number]['id'] | (number extends config['chains'][number]['id'] ? number : number & {});
};
export type SwitchAccountErrorType = ConnectorNotConnectedErrorType | BaseError | ErrorType;
/** https://wagmi.sh/core/api/actions/switchAccount */
export declare function switchAccount<config extends Config>(config: config, parameters: SwitchAccountParameters): Promise<SwitchAccountReturnType<config>>;
//# sourceMappingURL=switchAccount.d.ts.map
import type { Address } from 'viem';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import type { Unit } from '../types/unit.js';
import type { Compute } from '../types/utils.js';
import { type ReadContractsErrorType } from './readContracts.js';
export type GetTokenParameters<config extends Config = Config> = Compute<ChainIdParameter<config> & {
    address: Address;
    formatUnits?: Unit | undefined;
}>;
export type GetTokenReturnType = {
    address: Address;
    decimals: number;
    name: string | undefined;
    symbol: string | undefined;
    totalSupply: {
        formatted: string;
        value: bigint;
    };
};
export type GetTokenErrorType = ReadContractsErrorType;
/** @deprecated */
export declare function getToken<config extends Config>(config: config, parameters: GetTokenParameters<config>): Promise<GetTokenReturnType>;
//# sourceMappingURL=getToken.d.ts.map
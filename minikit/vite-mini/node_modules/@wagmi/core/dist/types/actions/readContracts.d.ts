import type { ContractFunctionParameters, MulticallParameters as viem_MulticallParameters, MulticallReturnType as viem_MulticallReturnType } from 'viem';
import type { Config } from '../createConfig.js';
import type { ChainIdParameter } from '../types/properties.js';
import { type MulticallErrorType } from './multicall.js';
import { type ReadContractErrorType } from './readContract.js';
export type ReadContractsParameters<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], allowFailure extends boolean = true, config extends Config = Config> = viem_MulticallParameters<contracts, allowFailure, {
    properties: ChainIdParameter<config>;
}>;
export type ReadContractsReturnType<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], allowFailure extends boolean = true> = viem_MulticallReturnType<contracts, allowFailure>;
export type ReadContractsErrorType = MulticallErrorType | ReadContractErrorType;
export declare function readContracts<config extends Config, const contracts extends readonly ContractFunctionParameters[], allowFailure extends boolean = true>(config: config, parameters: ReadContractsParameters<contracts, allowFailure, config>): Promise<ReadContractsReturnType<contracts, allowFailure>>;
//# sourceMappingURL=readContracts.d.ts.map
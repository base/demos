import type { Config, ReadContractsErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type ReadContractsData, type ReadContractsOptions, type ReadContractsQueryFnData, type ReadContractsQueryKey } from '@wagmi/core/query';
import type { ContractFunctionParameters } from 'viem';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseReadContractsParameters<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], allowFailure extends boolean = true, config extends Config = Config, selectData = ReadContractsData<contracts, allowFailure>> = Compute<ReadContractsOptions<contracts, allowFailure, config> & ConfigParameter<config> & QueryParameter<ReadContractsQueryFnData<contracts, allowFailure>, ReadContractsErrorType, selectData, ReadContractsQueryKey<contracts, allowFailure, config>>>;
export type UseReadContractsReturnType<contracts extends readonly unknown[] = readonly ContractFunctionParameters[], allowFailure extends boolean = true, selectData = ReadContractsData<contracts, allowFailure>> = UseQueryReturnType<selectData, ReadContractsErrorType>;
/** https://wagmi.sh/react/api/hooks/useReadContracts */
export declare function useReadContracts<const contracts extends readonly unknown[], allowFailure extends boolean = true, config extends Config = ResolvedRegister['config'], selectData = ReadContractsData<contracts, allowFailure>>(parameters?: UseReadContractsParameters<contracts, allowFailure, config, selectData>): UseReadContractsReturnType<contracts, allowFailure, selectData>;
//# sourceMappingURL=useReadContracts.d.ts.map
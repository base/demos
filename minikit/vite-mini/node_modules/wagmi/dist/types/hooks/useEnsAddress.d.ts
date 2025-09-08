import type { Config, GetEnsAddressErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type GetEnsAddressData, type GetEnsAddressOptions, type GetEnsAddressQueryFnData, type GetEnsAddressQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
export type UseEnsAddressParameters<config extends Config = Config, selectData = GetEnsAddressData> = Compute<GetEnsAddressOptions<config> & ConfigParameter<config> & QueryParameter<GetEnsAddressQueryFnData, GetEnsAddressErrorType, selectData, GetEnsAddressQueryKey<config>>>;
export type UseEnsAddressReturnType<selectData = GetEnsAddressData> = UseQueryReturnType<selectData, GetEnsAddressErrorType>;
/** https://wagmi.sh/react/api/hooks/useEnsAddress */
export declare function useEnsAddress<config extends Config = ResolvedRegister['config'], selectData = GetEnsAddressData>(parameters?: UseEnsAddressParameters<config, selectData>): UseEnsAddressReturnType<selectData>;
//# sourceMappingURL=useEnsAddress.d.ts.map
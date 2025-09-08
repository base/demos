import type { Config, GetBlockNumberErrorType, ResolvedRegister } from '@wagmi/core';
import type { Compute, UnionCompute, UnionStrictOmit } from '@wagmi/core/internal';
import { type GetBlockNumberData, type GetBlockNumberOptions, type GetBlockNumberQueryFnData, type GetBlockNumberQueryKey } from '@wagmi/core/query';
import type { ConfigParameter, QueryParameter } from '../types/properties.js';
import { type UseQueryReturnType } from '../utils/query.js';
import { type UseWatchBlockNumberParameters } from './useWatchBlockNumber.js';
export type UseBlockNumberParameters<config extends Config = Config, chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetBlockNumberData> = Compute<GetBlockNumberOptions<config, chainId> & ConfigParameter<config> & QueryParameter<GetBlockNumberQueryFnData, GetBlockNumberErrorType, selectData, GetBlockNumberQueryKey<config, chainId>> & {
    watch?: boolean | UnionCompute<UnionStrictOmit<UseWatchBlockNumberParameters<config, chainId>, 'chainId' | 'config' | 'onBlockNumber' | 'onError'>> | undefined;
}>;
export type UseBlockNumberReturnType<selectData = GetBlockNumberData> = UseQueryReturnType<selectData, GetBlockNumberErrorType>;
/** https://wagmi.sh/react/api/hooks/useBlockNumber */
export declare function useBlockNumber<config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id'], selectData = GetBlockNumberData>(parameters?: UseBlockNumberParameters<config, chainId, selectData>): UseBlockNumberReturnType<selectData>;
//# sourceMappingURL=useBlockNumber.d.ts.map
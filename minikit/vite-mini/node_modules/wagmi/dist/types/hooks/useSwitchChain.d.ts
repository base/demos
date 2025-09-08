import type { Config, ResolvedRegister, SwitchChainErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type SwitchChainData, type SwitchChainMutate, type SwitchChainMutateAsync, type SwitchChainVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseSwitchChainParameters<config extends Config = Config, context = unknown> = Compute<ConfigParameter<config> & {
    mutation?: UseMutationParameters<SwitchChainData<config, config['chains'][number]['id']>, SwitchChainErrorType, SwitchChainVariables<config, config['chains'][number]['id']>, context> | undefined;
}>;
export type UseSwitchChainReturnType<config extends Config = Config, context = unknown> = Compute<UseMutationReturnType<SwitchChainData<config, config['chains'][number]['id']>, SwitchChainErrorType, SwitchChainVariables<config, config['chains'][number]['id']>, context> & {
    chains: config['chains'];
    switchChain: SwitchChainMutate<config, context>;
    switchChainAsync: SwitchChainMutateAsync<config, context>;
}>;
/** https://wagmi.sh/react/api/hooks/useSwitchChain */
export declare function useSwitchChain<config extends Config = ResolvedRegister['config'], context = unknown>(parameters?: UseSwitchChainParameters<config, context>): UseSwitchChainReturnType<config, context>;
//# sourceMappingURL=useSwitchChain.d.ts.map
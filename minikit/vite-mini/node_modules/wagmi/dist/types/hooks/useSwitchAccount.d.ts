import type { Config, Connector, ResolvedRegister, SwitchAccountErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type SwitchAccountData, type SwitchAccountMutate, type SwitchAccountMutateAsync, type SwitchAccountVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseSwitchAccountParameters<config extends Config = Config, context = unknown> = Compute<ConfigParameter<config> & {
    mutation?: UseMutationParameters<SwitchAccountData<config>, SwitchAccountErrorType, SwitchAccountVariables, context> | undefined;
}>;
export type UseSwitchAccountReturnType<config extends Config = Config, context = unknown> = Compute<UseMutationReturnType<SwitchAccountData<config>, SwitchAccountErrorType, SwitchAccountVariables, context> & {
    connectors: readonly Connector[];
    switchAccount: SwitchAccountMutate<config, context>;
    switchAccountAsync: SwitchAccountMutateAsync<config, context>;
}>;
/** https://wagmi.sh/react/api/hooks/useSwitchAccount */
export declare function useSwitchAccount<config extends Config = ResolvedRegister['config'], context = unknown>(parameters?: UseSwitchAccountParameters<config, context>): UseSwitchAccountReturnType<config, context>;
//# sourceMappingURL=useSwitchAccount.d.ts.map
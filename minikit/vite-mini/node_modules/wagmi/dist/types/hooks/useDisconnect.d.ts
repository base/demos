import type { Connector, DisconnectErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type DisconnectData, type DisconnectMutate, type DisconnectMutateAsync, type DisconnectVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseDisconnectParameters<context = unknown> = Compute<ConfigParameter & {
    mutation?: UseMutationParameters<DisconnectData, DisconnectErrorType, DisconnectVariables, context> | undefined;
}>;
export type UseDisconnectReturnType<context = unknown> = Compute<UseMutationReturnType<DisconnectData, DisconnectErrorType, DisconnectVariables, context> & {
    connectors: readonly Connector[];
    disconnect: DisconnectMutate<context>;
    disconnectAsync: DisconnectMutateAsync<context>;
}>;
/** https://wagmi.sh/react/api/hooks/useDisconnect */
export declare function useDisconnect<context = unknown>(parameters?: UseDisconnectParameters<context>): UseDisconnectReturnType<context>;
//# sourceMappingURL=useDisconnect.d.ts.map
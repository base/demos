import type { Connector, ReconnectErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type ReconnectData, type ReconnectMutate, type ReconnectMutateAsync, type ReconnectVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseReconnectParameters<context = unknown> = Compute<ConfigParameter & {
    mutation?: UseMutationParameters<ReconnectData, ReconnectErrorType, ReconnectVariables, context> | undefined;
}>;
export type UseReconnectReturnType<context = unknown> = Compute<UseMutationReturnType<ReconnectData, ReconnectErrorType, ReconnectVariables, context> & {
    connectors: readonly Connector[];
    reconnect: ReconnectMutate<context>;
    reconnectAsync: ReconnectMutateAsync<context>;
}>;
/** https://wagmi.sh/react/api/hooks/useReconnect */
export declare function useReconnect<context = unknown>(parameters?: UseReconnectParameters<context>): UseReconnectReturnType<context>;
//# sourceMappingURL=useReconnect.d.ts.map
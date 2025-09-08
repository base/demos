import type { SignMessageErrorType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { type SignMessageData, type SignMessageMutate, type SignMessageMutateAsync, type SignMessageVariables } from '@wagmi/core/query';
import type { ConfigParameter } from '../types/properties.js';
import type { UseMutationParameters, UseMutationReturnType } from '../utils/query.js';
export type UseSignMessageParameters<context = unknown> = Compute<ConfigParameter & {
    mutation?: UseMutationParameters<SignMessageData, SignMessageErrorType, SignMessageVariables, context> | undefined;
}>;
export type UseSignMessageReturnType<context = unknown> = Compute<UseMutationReturnType<SignMessageData, SignMessageErrorType, SignMessageVariables, context> & {
    signMessage: SignMessageMutate<context>;
    signMessageAsync: SignMessageMutateAsync<context>;
}>;
/** https://wagmi.sh/react/api/hooks/useSignMessage */
export declare function useSignMessage<context = unknown>(parameters?: UseSignMessageParameters<context>): UseSignMessageReturnType<context>;
//# sourceMappingURL=useSignMessage.d.ts.map
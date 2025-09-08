import { type SignMessageErrorType, type SignMessageParameters, type SignMessageReturnType } from '../actions/signMessage.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
import type { Mutate, MutateAsync } from './types.js';
export declare function signMessageMutationOptions(config: Config): {
    readonly mutationFn: (variables: {
        account?: `0x${string}` | import("viem").Account | undefined;
        message: import("viem").SignableMessage;
        connector?: import("../createConfig.js").Connector | undefined;
    }) => Promise<`0x${string}`>;
    readonly mutationKey: readonly ["signMessage"];
};
export type SignMessageData = SignMessageReturnType;
export type SignMessageVariables = Compute<SignMessageParameters>;
export type SignMessageMutate<context = unknown> = Mutate<SignMessageData, SignMessageErrorType, SignMessageVariables, context>;
export type SignMessageMutateAsync<context = unknown> = MutateAsync<SignMessageData, SignMessageErrorType, SignMessageVariables, context>;
//# sourceMappingURL=signMessage.d.ts.map
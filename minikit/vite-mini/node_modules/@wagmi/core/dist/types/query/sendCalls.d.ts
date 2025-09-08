import type { MutateOptions } from '@tanstack/query-core';
import { type SendCallsErrorType, type SendCallsParameters, type SendCallsReturnType } from '../actions/sendCalls.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
export declare function sendCallsMutationOptions<config extends Config>(config: config): {
    readonly mutationFn: (variables: SendCallsVariables<config, config["chains"][number]["id"], readonly unknown[]>) => Promise<{
        capabilities?: {
            [x: string]: any;
        } | undefined;
        id: string;
    }>;
    readonly mutationKey: readonly ["sendCalls"];
};
export type SendCallsData = Compute<SendCallsReturnType>;
export type SendCallsVariables<config extends Config, chainId extends config['chains'][number]['id'], calls extends readonly unknown[] = readonly unknown[]> = SendCallsParameters<config, chainId, calls>;
export type SendCallsMutate<config extends Config, context = unknown> = <const calls extends readonly unknown[], chainId extends config['chains'][number]['id']>(variables: SendCallsVariables<config, chainId, calls>, options?: Compute<MutateOptions<SendCallsData, SendCallsErrorType, Compute<SendCallsVariables<config, chainId, calls>>, context>> | undefined) => void;
export type SendCallsMutateAsync<config extends Config, context = unknown> = <const calls extends readonly unknown[], chainId extends config['chains'][number]['id']>(variables: SendCallsVariables<config, chainId, calls>, options?: Compute<MutateOptions<SendCallsData, SendCallsErrorType, Compute<SendCallsVariables<config, chainId, calls>>, context>> | undefined) => Promise<SendCallsData>;
//# sourceMappingURL=sendCalls.d.ts.map
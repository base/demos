import type { MutateOptions } from '@tanstack/query-core';
import { type ShowCallsStatusErrorType, type ShowCallsStatusParameters, type ShowCallsStatusReturnType } from '../actions/showCallsStatus.js';
import type { Config } from '../createConfig.js';
import type { Compute } from '../types/utils.js';
export declare function showCallsStatusMutationOptions<config extends Config>(config: config): {
    readonly mutationFn: (variables: ShowCallsStatusParameters) => Promise<void>;
    readonly mutationKey: readonly ["showCallsStatus"];
};
export type ShowCallsStatusData = Compute<ShowCallsStatusReturnType>;
export type ShowCallsStatusVariables = ShowCallsStatusParameters;
export type ShowCallsStatusMutate<context = unknown> = (variables: ShowCallsStatusVariables, options?: Compute<MutateOptions<ShowCallsStatusData, ShowCallsStatusErrorType, Compute<ShowCallsStatusVariables>, context>> | undefined) => void;
export type ShowCallsStatusMutateAsync<context = unknown> = (variables: ShowCallsStatusVariables, options?: Compute<MutateOptions<ShowCallsStatusData, ShowCallsStatusErrorType, Compute<ShowCallsStatusVariables>, context>> | undefined) => Promise<ShowCallsStatusData>;
//# sourceMappingURL=showCallsStatus.d.ts.map
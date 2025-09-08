import type { DefaultError, InfiniteQueryObserverOptions, MutateOptions, QueryFunction, QueryKey } from '@tanstack/query-core';
import type { Compute, StrictOmit } from '../types/utils.js';
export type InfiniteQueryOptions<queryFnData = unknown, error = DefaultError, data = queryFnData, queryData = queryFnData, queryKey extends QueryKey = QueryKey, pageParam = unknown, options extends InfiniteQueryObserverOptions<queryFnData, error, data, queryData, queryKey, pageParam> = InfiniteQueryObserverOptions<queryFnData, error, data, queryData, queryKey, pageParam>> = Compute<StrictOmit<options, 'queryFn'> & {
    queryFn?(context: QueryFunctionContext<queryKey, pageParam>): options['queryFn'] extends (...args: any) => any ? ReturnType<NonNullable<options['queryFn']>> : unknown;
}>;
type QueryFunctionContext<TQueryKey extends QueryKey = QueryKey, TPageParam = never> = Parameters<QueryFunction<unknown, TQueryKey, TPageParam>>[0];
export type Mutate<data = unknown, error = unknown, variables = void, context = unknown> = (...args: Parameters<MutateFn<data, error, Compute<variables>, context>>) => void;
export type MutateAsync<data = unknown, error = unknown, variables = void, context = unknown> = MutateFn<data, error, Compute<variables>, context>;
type MutateFn<data = unknown, error = unknown, variables = void, context = unknown> = undefined extends variables ? (variables?: variables, options?: Compute<MutateOptions<data, error, variables, context>> | undefined) => Promise<data> : (variables: variables, options?: Compute<MutateOptions<data, error, variables, context>> | undefined) => Promise<data>;
export {};
//# sourceMappingURL=types.d.ts.map
import { type DefaultError, type QueryKey, type UseInfiniteQueryOptions, type UseInfiniteQueryResult, type UseMutationOptions, type UseMutationResult, type UseQueryOptions, type UseQueryResult, useMutation } from '@tanstack/react-query';
import type { Compute, ExactPartial, Omit, UnionStrictOmit } from '@wagmi/core/internal';
export type UseMutationParameters<data = unknown, error = Error, variables = void, context = unknown> = Compute<Omit<UseMutationOptions<data, error, Compute<variables>, context>, 'mutationFn' | 'mutationKey' | 'throwOnError'>>;
export type UseMutationReturnType<data = unknown, error = Error, variables = void, context = unknown> = Compute<UnionStrictOmit<UseMutationResult<data, error, variables, context>, 'mutate' | 'mutateAsync'>>;
export { useMutation };
export type UseQueryParameters<queryFnData = unknown, error = DefaultError, data = queryFnData, queryKey extends QueryKey = QueryKey> = Compute<ExactPartial<Omit<UseQueryOptions<queryFnData, error, data, queryKey>, 'initialData'>> & {
    initialData?: UseQueryOptions<queryFnData, error, data, queryKey>['initialData'] | undefined;
}>;
export type UseQueryReturnType<data = unknown, error = DefaultError> = Compute<UseQueryResult<data, error> & {
    queryKey: QueryKey;
}>;
export declare function useQuery<queryFnData, error, data, queryKey extends QueryKey>(parameters: UseQueryParameters<queryFnData, error, data, queryKey> & {
    queryKey: QueryKey;
}): UseQueryReturnType<data, error>;
export type UseInfiniteQueryParameters<queryFnData = unknown, error = DefaultError, data = queryFnData, queryData = queryFnData, queryKey extends QueryKey = QueryKey, pageParam = unknown> = Compute<Omit<UseInfiniteQueryOptions<queryFnData, error, data, queryData, queryKey, pageParam>, 'initialData'> & {
    initialData?: UseInfiniteQueryOptions<queryFnData, error, data, queryKey>['initialData'] | undefined;
}>;
export type UseInfiniteQueryReturnType<data = unknown, error = DefaultError> = UseInfiniteQueryResult<data, error> & {
    queryKey: QueryKey;
};
export declare function useInfiniteQuery<queryFnData, error, data, queryKey extends QueryKey>(parameters: UseInfiniteQueryParameters<queryFnData, error, data, queryKey> & {
    queryKey: QueryKey;
}): UseInfiniteQueryReturnType<data, error>;
//# sourceMappingURL=query.d.ts.map
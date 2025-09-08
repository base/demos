import { useInfiniteQuery as tanstack_useInfiniteQuery, useQuery as tanstack_useQuery, useMutation, } from '@tanstack/react-query';
import { hashFn } from '@wagmi/core/query';
export { useMutation };
// Adding some basic customization.
// Ideally we don't have this function, but `import('@tanstack/react-query').useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function useQuery(parameters) {
    const result = tanstack_useQuery({
        ...parameters,
        queryKeyHashFn: hashFn, // for bigint support
    });
    result.queryKey = parameters.queryKey;
    return result;
}
// Adding some basic customization.
export function useInfiniteQuery(parameters) {
    const result = tanstack_useInfiniteQuery({
        ...parameters,
        queryKeyHashFn: hashFn, // for bigint support
    });
    result.queryKey = parameters.queryKey;
    return result;
}
//# sourceMappingURL=query.js.map
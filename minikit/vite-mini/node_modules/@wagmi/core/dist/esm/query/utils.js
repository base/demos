import { replaceEqualDeep } from '@tanstack/query-core';
export function structuralSharing(oldData, newData) {
    return replaceEqualDeep(oldData, newData);
}
export function hashFn(queryKey) {
    return JSON.stringify(queryKey, (_, value) => {
        if (isPlainObject(value))
            return Object.keys(value)
                .sort()
                .reduce((result, key) => {
                result[key] = value[key];
                return result;
            }, {});
        if (typeof value === 'bigint')
            return value.toString();
        return value;
    });
}
// biome-ignore lint/complexity/noBannedTypes: using
function isPlainObject(value) {
    if (!hasObjectPrototype(value)) {
        return false;
    }
    // If has modified constructor
    const ctor = value.constructor;
    if (typeof ctor === 'undefined')
        return true;
    // If has modified prototype
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot))
        return false;
    // If constructor does not have an Object-specific method
    // biome-ignore lint/suspicious/noPrototypeBuiltins: using
    if (!prot.hasOwnProperty('isPrototypeOf'))
        return false;
    // Most likely a plain Object
    return true;
}
function hasObjectPrototype(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}
export function filterQueryOptions(options) {
    // destructuring is super fast
    // biome-ignore format: no formatting
    const { 
    // import('@tanstack/query-core').QueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _defaulted, behavior, gcTime, initialData, initialDataUpdatedAt, maxPages, meta, networkMode, queryFn, queryHash, queryKey, queryKeyHashFn, retry, retryDelay, structuralSharing, 
    // import('@tanstack/query-core').InfiniteQueryObserverOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    getPreviousPageParam, getNextPageParam, initialPageParam, 
    // import('@tanstack/react-query').UseQueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _optimisticResults, enabled, notifyOnChangeProps, placeholderData, refetchInterval, refetchIntervalInBackground, refetchOnMount, refetchOnReconnect, refetchOnWindowFocus, retryOnMount, select, staleTime, suspense, throwOnError, 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // wagmi
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    config, connector, query, ...rest } = options;
    return rest;
}
//# sourceMappingURL=utils.js.map
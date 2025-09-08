/**
 * Default cache time for queries (30 minutes)
 */
export declare const DEFAULT_CACHE_TIME: number;
/**
 * Default stale time for queries (5 minutes)
 */
export declare const DEFAULT_STALE_TIME: number;
/**
 * Default query options used across hooks
 */
export declare const DEFAULT_QUERY_OPTIONS: {
    /** Determines how long inactive/unused data remains in the cache */
    readonly gcTime: number;
    /** Determines how long data remains "fresh" before it's considered stale. */
    readonly staleTime: number;
    /** Whether the query should refetch when the window is focused */
    readonly refetchOnWindowFocus: false;
};
//# sourceMappingURL=constants.d.ts.map
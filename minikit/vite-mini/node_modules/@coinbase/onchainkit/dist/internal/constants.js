const DEFAULT_CACHE_TIME = 1e3 * 60 * 30;
const DEFAULT_STALE_TIME = 1e3 * 60 * 5;
const DEFAULT_QUERY_OPTIONS = {
  /** Determines how long inactive/unused data remains in the cache */
  gcTime: DEFAULT_CACHE_TIME,
  /** Determines how long data remains "fresh" before it's considered stale. */
  staleTime: DEFAULT_STALE_TIME,
  /** Whether the query should refetch when the window is focused */
  refetchOnWindowFocus: false
};
export {
  DEFAULT_CACHE_TIME,
  DEFAULT_QUERY_OPTIONS,
  DEFAULT_STALE_TIME
};
//# sourceMappingURL=constants.js.map

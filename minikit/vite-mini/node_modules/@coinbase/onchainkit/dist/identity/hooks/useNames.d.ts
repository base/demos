import { GetNameReturnType, UseNamesOptions, UseQueryOptions } from '../types';
/**
 * A React hook that leverages the `@tanstack/react-query` for fetching and optionally caching
 * multiple Basenames or ENS names in a single batch request.
 */
export declare const useNames: ({ addresses, chain }: UseNamesOptions, queryOptions?: UseQueryOptions<GetNameReturnType[]>) => import('@tanstack/react-query').UseQueryResult<GetNameReturnType[], Error>;
//# sourceMappingURL=useNames.d.ts.map
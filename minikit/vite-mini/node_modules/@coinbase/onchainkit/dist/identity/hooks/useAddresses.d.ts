import { GetAddressReturnType, UseAddressesOptions, UseQueryOptions } from '../types';
/**
 * A React hook that leverages the `@tanstack/react-query` for fetching and optionally caching
 * multiple Ethereum addresses from ENS names or Basenames in a single batch request.
 */
export declare const useAddresses: ({ names }: UseAddressesOptions, queryOptions?: UseQueryOptions<GetAddressReturnType[]>) => import('@tanstack/react-query').UseQueryResult<GetAddressReturnType[], Error>;
//# sourceMappingURL=useAddresses.d.ts.map
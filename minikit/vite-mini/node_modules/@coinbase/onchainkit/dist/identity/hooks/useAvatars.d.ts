import { GetAvatarReturnType, UseAvatarsOptions, UseQueryOptions } from '../types';
/**
 * A React hook that leverages the `@tanstack/react-query` for fetching and optionally caching
 * multiple Basenames or ENS avatars in a single batch request.
 */
export declare const useAvatars: ({ ensNames, chain }: UseAvatarsOptions, queryOptions?: UseQueryOptions<GetAvatarReturnType[]>) => import('@tanstack/react-query').UseQueryResult<GetAvatarReturnType[], Error>;
//# sourceMappingURL=useAvatars.d.ts.map
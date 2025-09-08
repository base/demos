import { GetSocialsReturnType, UseQueryOptions } from '../types';
import { Chain } from 'viem';
type UseSocialsOptions = {
    ensName: string;
    chain?: Chain;
};
export declare const useSocials: ({ ensName, chain }: UseSocialsOptions, queryOptions?: UseQueryOptions<GetSocialsReturnType>) => import('@tanstack/react-query').UseQueryResult<GetSocialsReturnType, Error>;
export {};
//# sourceMappingURL=useSocials.d.ts.map
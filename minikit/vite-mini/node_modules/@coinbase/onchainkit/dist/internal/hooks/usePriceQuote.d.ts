import { GetPriceQuoteResponse, PriceQuoteToken } from '../../api/types';
import { RequestContext } from '../../core/network/constants';
import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
type UsePriceQuoteParams<T> = {
    token: PriceQuoteToken | undefined;
    queryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
};
export declare function usePriceQuote(params: UsePriceQuoteParams<GetPriceQuoteResponse>, _context?: RequestContext): UseQueryResult<GetPriceQuoteResponse>;
export {};
//# sourceMappingURL=usePriceQuote.d.ts.map
import { RequestContext } from '../core/network/constants';
import { GetPriceQuoteParams, GetPriceQuoteResponse } from './types';
/**
 * Retrieves a price quote for a token
 *
 * @param params - The parameters for the price quote. The property `tokens`
 * must be an array of contract addresses or 'ETH'.
 * @param _context - The context in which the price quote is retrieved
 * @returns The price quote for the token
 */
export declare function getPriceQuote(params: GetPriceQuoteParams, _context?: RequestContext): Promise<GetPriceQuoteResponse>;
//# sourceMappingURL=getPriceQuote.d.ts.map
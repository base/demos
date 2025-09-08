import { GetSwapQuoteParams } from '../../api/types';
import { SwapUnit } from '../../swap/types';
import { Token } from '../../token';
import { GetBuyQuoteResponse } from '../types';
/**
 * Parameters for getting a buy quote, extending GetSwapQuoteParams but omitting 'from'
 */
type GetBuyQuoteParams = Omit<GetSwapQuoteParams, 'from'> & {
    /** Optional swap unit for the 'from' token */
    fromSwapUnit?: SwapUnit;
    /** Optional 'from' token */
    from?: Token;
};
/**
 * Fetches a quote for a swap, but only if the from and to tokens are different.
 */
export declare function getBuyQuote({ amount, from, maxSlippage, to, useAggregator, fromSwapUnit, }: GetBuyQuoteParams): Promise<GetBuyQuoteResponse>;
export {};
//# sourceMappingURL=getBuyQuote.d.ts.map
import { Portfolio } from '../../api/types';
import { RequestContext } from '../../core/network/constants';
import { UseQueryResult } from '@tanstack/react-query';
import { Address } from 'viem';
type UsePortfolioProps = {
    address: Address | undefined | null;
    enabled?: boolean;
};
/**
 * Retrieves the portfolio for the provided address
 * portfolio includes the address, the balance of the address in USD, and the tokens in the address
 */
export declare function usePortfolio({ address, enabled }: UsePortfolioProps, _context?: RequestContext): UseQueryResult<Portfolio>;
export {};
//# sourceMappingURL=usePortfolio.d.ts.map
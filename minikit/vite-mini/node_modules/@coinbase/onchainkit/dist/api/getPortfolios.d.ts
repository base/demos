import { RequestContext } from '../core/network/constants';
import { APIError, GetPortfoliosParams, GetPortfoliosResponse } from './types';
/**
 * Retrieves the portfolios for the provided addresses
 * Supported networks: Base mainnet and Ethereum mainnet
 */
export declare function getPortfolios(params: GetPortfoliosParams, _context?: RequestContext): Promise<GetPortfoliosResponse | APIError>;
//# sourceMappingURL=getPortfolios.d.ts.map
import type { SwapTokenWithBalance } from './TypeUtil.js';
import type { BlockchainApiBalanceResponse, BlockchainApiSwapAllowanceRequest } from './TypeUtil.js';
export type TokenInfo = {
    address: `0x${string}`;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    domainVersion?: string;
    eip2612?: boolean;
    isFoT?: boolean;
    tags?: string[];
};
export declare const SwapApiUtil: {
    getTokenList(): Promise<SwapTokenWithBalance[]>;
    fetchGasPrice(): Promise<{
        standard: string | undefined;
        fast: string | undefined;
        instant: string | undefined;
    } | null>;
    fetchSwapAllowance({ tokenAddress, userAddress, sourceTokenAmount, sourceTokenDecimals }: Pick<BlockchainApiSwapAllowanceRequest, "tokenAddress" | "userAddress"> & {
        sourceTokenAmount: string;
        sourceTokenDecimals: number;
    }): Promise<boolean>;
    getMyTokensWithBalance(forceUpdate?: string): Promise<SwapTokenWithBalance[]>;
    mapBalancesToSwapTokens(balances: BlockchainApiBalanceResponse["balances"]): SwapTokenWithBalance[];
};

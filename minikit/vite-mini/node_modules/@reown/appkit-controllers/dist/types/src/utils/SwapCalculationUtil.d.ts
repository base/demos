import type { SwapTokenWithBalance } from './TypeUtil.js';
export declare const SwapCalculationUtil: {
    getGasPriceInEther(gas: bigint, gasPrice: bigint): number;
    getGasPriceInUSD(networkPrice: string, gas: bigint, gasPrice: bigint): number;
    getPriceImpact({ sourceTokenAmount, sourceTokenPriceInUSD, toTokenPriceInUSD, toTokenAmount }: {
        sourceTokenAmount: string;
        sourceTokenPriceInUSD: number;
        toTokenPriceInUSD: number;
        toTokenAmount: string;
    }): number;
    getMaxSlippage(slippage: number, toTokenAmount: string): number;
    getProviderFee(sourceTokenAmount: string, feePercentage?: number): string;
    isInsufficientNetworkTokenForGas(networkBalanceInUSD: string, gasPriceInUSD: number | undefined): boolean;
    isInsufficientSourceTokenForSwap(sourceTokenAmount: string, sourceTokenAddress: string, balance: SwapTokenWithBalance[] | undefined): boolean;
    getToTokenAmount({ sourceToken, toToken, sourceTokenPrice, toTokenPrice, sourceTokenAmount }: {
        sourceToken: SwapTokenWithBalance | undefined;
        toToken: SwapTokenWithBalance | undefined;
        sourceTokenPrice: number;
        toTokenPrice: number;
        sourceTokenAmount: string;
    }): string;
};

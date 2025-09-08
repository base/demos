import type { CaipNetwork } from '@reown/appkit-common';
import type { SwapTokenWithBalance } from './TypeUtil.js';
import type { BlockchainApiBalanceResponse } from './TypeUtil.js';
export declare const SendApiUtil: {
    getMyTokensWithBalance(forceUpdate?: string): Promise<BlockchainApiBalanceResponse["balances"]>;
    getEIP155Balances(address: string, caipNetwork: CaipNetwork): Promise<import("@reown/appkit-common").Balance[] | null>;
    /**
     * The 1Inch API includes many low-quality tokens in the balance response,
     * which appear inconsistently. This filter prevents them from being displayed.
     */
    filterLowQualityTokens(balances: BlockchainApiBalanceResponse["balances"]): import("@reown/appkit-common").Balance[];
    mapBalancesToSwapTokens(balances: BlockchainApiBalanceResponse["balances"]): SwapTokenWithBalance[];
};

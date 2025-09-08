export declare const ANALYTICS_API_URL = "https://api.developer.coinbase.com/analytics";
/**
 * Analytics event names
 */
export declare const ANALYTICS_EVENTS: {
    readonly APPCHAIN_BRIDGE_DEPOSIT_INITIATED: "appchainBridgeDepositInitiated";
    readonly APPCHAIN_BRIDGE_DEPOSIT_SUCCESS: "appchainBridgeDepositSuccess";
    readonly APPCHAIN_BRIDGE_DEPOSIT_FAILURE: "appchainBridgeDepositFailure";
    readonly APPCHAIN_BRIDGE_WITHDRAW_INITIATED: "appchainBridgeWithdrawInitiated";
    readonly APPCHAIN_BRIDGE_WITHDRAW_SUCCESS: "appchainBridgeWithdrawSuccess";
    readonly APPCHAIN_BRIDGE_WITHDRAW_FAILURE: "appchainBridgeWithdrawFailure";
    readonly APPCHAIN_BRIDGE_WAIT_FOR_CLAIM_FAILURE: "appchainBridgeWaitForClaimFailure";
    readonly APPCHAIN_BRIDGE_CLAIM_SUCCESS: "appchainBridgeClaimSuccess";
    readonly APPCHAIN_BRIDGE_CLAIM_FAILURE: "appchainBridgeClaimFailure";
    readonly BUY_FAILURE: "buyFailure";
    readonly BUY_INITIATED: "buyInitiated";
    readonly BUY_OPTION_SELECTED: "buyOptionSelected";
    readonly BUY_SUCCESS: "buySuccess";
    readonly BUY_CANCELED: "buyCanceled";
    readonly CHECKOUT_FAILURE: "checkoutFailure";
    readonly CHECKOUT_INITIATED: "checkoutInitiated";
    readonly CHECKOUT_SUCCESS: "checkoutSuccess";
    readonly CHECKOUT_CANCELED: "checkoutCanceled";
    readonly COMPONENT_ERROR: "componentError";
    readonly FUND_AMOUNT_CHANGED: "fundAmountChanged";
    readonly FUND_FAILURE: "fundFailure";
    readonly FUND_INITIATED: "fundInitiated";
    readonly FUND_OPTION_SELECTED: "fundOptionSelected";
    readonly FUND_SUCCESS: "fundSuccess";
    readonly FUND_CANCELED: "fundCanceled";
    readonly MINT_FAILURE: "mintFailure";
    readonly MINT_INITIATED: "mintInitiated";
    readonly MINT_QUANTITY_CHANGED: "mintQuantityChanged";
    readonly MINT_SUCCESS: "mintSuccess";
    readonly MINT_CANCELED: "mintCanceled";
    readonly SWAP_FAILURE: "swapFailure";
    readonly SWAP_INITIATED: "swapInitiated";
    readonly SWAP_SLIPPAGE_CHANGED: "swapSlippageChanged";
    readonly SWAP_SUCCESS: "swapSuccess";
    readonly SWAP_TOKEN_SELECTED: "swapTokenSelected";
    readonly SWAP_CANCELED: "swapCanceled";
    readonly TRANSACTION_FAILURE: "transactionFailure";
    readonly TRANSACTION_INITIATED: "transactionInitiated";
    readonly TRANSACTION_SUCCESS: "transactionSuccess";
    readonly TRANSACTION_CANCELED: "transactionCanceled";
    readonly WALLET_CONNECT_ERROR: "walletConnectError";
    readonly WALLET_CONNECT_INITIATED: "walletConnectInitiated";
    readonly WALLET_CONNECT_SUCCESS: "walletConnectSuccess";
    readonly WALLET_DISCONNECT: "walletDisconnect";
    readonly WALLET_OPTION_SELECTED: "walletOptionSelected";
    readonly WALLET_CONNECT_CANCELED: "walletConnectCanceled";
    readonly EARN_DEPOSIT_INITIATED: "earnDepositInitiated";
    readonly EARN_DEPOSIT_SUCCESS: "earnDepositSuccess";
    readonly EARN_DEPOSIT_FAILURE: "earnDepositFailure";
    readonly EARN_DEPOSIT_CANCELED: "earnDepositCanceled";
    readonly EARN_WITHDRAW_INITIATED: "earnWithdrawInitiated";
    readonly EARN_WITHDRAW_SUCCESS: "earnWithdrawSuccess";
    readonly EARN_WITHDRAW_FAILURE: "earnWithdrawFailure";
    readonly EARN_WITHDRAW_CANCELED: "earnWithdrawCanceled";
};
/**
 * Component names for error tracking
 */
export declare const COMPONENT_NAMES: {
    readonly BUY: "buy";
    readonly CHECKOUT: "checkout";
    readonly FUND: "fund";
    readonly MINT: "mint";
    readonly SWAP: "swap";
    readonly TRANSACTION: "transaction";
    readonly WALLET: "wallet";
    readonly EARN: "earn";
};
/**
 * Buy options
 */
export declare const BUY_OPTIONS: {
    readonly APPLE_PAY: "apple_pay";
    readonly COINBASE: "coinbase_account";
    readonly DEBIT_CARD: "debit_card";
    readonly ETH: "eth";
    readonly USDC: "usdc";
};
/**
 * Fund options
 */
export declare const FUND_OPTIONS: {
    readonly APPLE_PAY: "apple_pay";
    readonly COINBASE: "coinbase_account";
    readonly DEBIT_CARD: "debit_card";
};
//# sourceMappingURL=constants.d.ts.map
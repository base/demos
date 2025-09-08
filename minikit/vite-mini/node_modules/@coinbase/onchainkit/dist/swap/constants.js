const FALLBACK_DEFAULT_MAX_SLIPPAGE = 3;
const GENERAL_SWAP_ERROR_CODE = "SWAP_ERROR";
const GENERAL_SWAP_QUOTE_ERROR_CODE = "SWAP_QUOTE_ERROR";
const GENERAL_SWAP_BALANCE_ERROR_CODE = "SWAP_BALANCE_ERROR";
const LOW_LIQUIDITY_ERROR_CODE = "SWAP_QUOTE_LOW_LIQUIDITY_ERROR";
const PERMIT2_CONTRACT_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
const TOO_MANY_REQUESTS_ERROR_CODE = "TOO_MANY_REQUESTS_ERROR";
const UNCAUGHT_SWAP_QUOTE_ERROR_CODE = "UNCAUGHT_SWAP_QUOTE_ERROR";
const UNCAUGHT_SWAP_ERROR_CODE = "UNCAUGHT_SWAP_ERROR";
const UNIVERSALROUTER_CONTRACT_ADDRESS = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
const USER_REJECTED_ERROR_CODE = "USER_REJECTED";
const UNSUPPORTED_AMOUNT_REFERENCE_ERROR_CODE = "UNSUPPORTED_AMOUNT_REFERENCE_ERROR";
var SwapMessage = /* @__PURE__ */ ((SwapMessage2) => {
  SwapMessage2["BALANCE_ERROR"] = "Error fetching token balance";
  SwapMessage2["CONFIRM_IN_WALLET"] = "Confirm in wallet";
  SwapMessage2["FETCHING_QUOTE"] = "Fetching quote...";
  SwapMessage2["FETCHING_BALANCE"] = "Fetching balance...";
  SwapMessage2["INCOMPLETE_FIELD"] = "Complete the fields to continue";
  SwapMessage2["INSUFFICIENT_BALANCE"] = "Insufficient balance";
  SwapMessage2["LOW_LIQUIDITY"] = "Insufficient liquidity for this trade.";
  SwapMessage2["SWAP_IN_PROGRESS"] = "Swap in progress...";
  SwapMessage2["TOO_MANY_REQUESTS"] = "Too many requests. Please try again later.";
  SwapMessage2["USER_REJECTED"] = "User rejected the transaction";
  SwapMessage2["UNSUPPORTED_AMOUNT_REFERENCE"] = "useAggregator does not support amountReference: to, please use useAggregator: false";
  return SwapMessage2;
})(SwapMessage || {});
const ONRAMP_PAYMENT_METHODS = [
  {
    id: "CRYPTO_ACCOUNT",
    name: "Coinbase",
    description: "Buy with your Coinbase account",
    icon: "coinbasePay"
  },
  {
    id: "APPLE_PAY",
    name: "Apple Pay",
    description: "Up to $500/week",
    icon: "applePay"
  },
  {
    id: "CARD",
    name: "Debit Card",
    description: "Up to $500/week",
    icon: "creditCard"
  }
];
export {
  FALLBACK_DEFAULT_MAX_SLIPPAGE,
  GENERAL_SWAP_BALANCE_ERROR_CODE,
  GENERAL_SWAP_ERROR_CODE,
  GENERAL_SWAP_QUOTE_ERROR_CODE,
  LOW_LIQUIDITY_ERROR_CODE,
  ONRAMP_PAYMENT_METHODS,
  PERMIT2_CONTRACT_ADDRESS,
  SwapMessage,
  TOO_MANY_REQUESTS_ERROR_CODE,
  UNCAUGHT_SWAP_ERROR_CODE,
  UNCAUGHT_SWAP_QUOTE_ERROR_CODE,
  UNIVERSALROUTER_CONTRACT_ADDRESS,
  UNSUPPORTED_AMOUNT_REFERENCE_ERROR_CODE,
  USER_REJECTED_ERROR_CODE
};
//# sourceMappingURL=constants.js.map

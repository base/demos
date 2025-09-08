const GENERAL_CHECKOUT_ERROR_MESSAGE = "CHECKOUT_ERROR";
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
const NO_CONTRACTS_ERROR = "Contracts are not available";
const NO_CONNECTED_ADDRESS_ERROR = "No connected address";
const CHECKOUT_UNSUPPORTED_CHAIN_ERROR_MESSAGE = "UNSUPPORTED_CHAIN";
const CHECKOUT_TOO_MANY_REQUESTS_ERROR_MESSAGE = "CHECKOUT_TOO_MANY_REQUESTS_ERROR";
const CHECKOUT_INSUFFICIENT_BALANCE_ERROR = "User has insufficient balance";
const CHECKOUT_INVALID_CHARGE_ERROR_MESSAGE = "CHECKOUT_INVALID_CHARGE_ERROR";
const CHECKOUT_INVALID_PARAMETER_ERROR_MESSAGE = "CHECKOUT_INVALID_PARAMETER_ERROR";
const UNCAUGHT_CHECKOUT_ERROR_MESSAGE = "UNCAUGHT_CHECKOUT_ERROR";
const USER_REJECTED_ERROR = "Request denied.";
var CheckoutErrorCode = /* @__PURE__ */ ((CheckoutErrorCode2) => {
  CheckoutErrorCode2["INSUFFICIENT_BALANCE"] = "insufficient_balance";
  CheckoutErrorCode2["GENERIC_ERROR"] = "generic_error";
  CheckoutErrorCode2["UNEXPECTED_ERROR"] = "unexpected_error";
  CheckoutErrorCode2["USER_REJECTED_ERROR"] = "user_rejected";
  return CheckoutErrorCode2;
})(CheckoutErrorCode || {});
var CHECKOUT_LIFECYCLESTATUS = /* @__PURE__ */ ((CHECKOUT_LIFECYCLESTATUS2) => {
  CHECKOUT_LIFECYCLESTATUS2["FETCHING_DATA"] = "fetchingData";
  CHECKOUT_LIFECYCLESTATUS2["INIT"] = "init";
  CHECKOUT_LIFECYCLESTATUS2["PENDING"] = "pending";
  CHECKOUT_LIFECYCLESTATUS2["READY"] = "ready";
  CHECKOUT_LIFECYCLESTATUS2["SUCCESS"] = "success";
  CHECKOUT_LIFECYCLESTATUS2["ERROR"] = "error";
  return CHECKOUT_LIFECYCLESTATUS2;
})(CHECKOUT_LIFECYCLESTATUS || {});
const USDC_ADDRESS_BASE = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
var CONTRACT_METHODS = /* @__PURE__ */ ((CONTRACT_METHODS2) => {
  CONTRACT_METHODS2["APPROVE"] = "approve";
  CONTRACT_METHODS2["BALANCE_OF"] = "balanceOf";
  CONTRACT_METHODS2["TRANSFER_TOKEN_PRE_APPROVED"] = "transferTokenPreApproved";
  return CONTRACT_METHODS2;
})(CONTRACT_METHODS || {});
const COMMERCE_ABI = [
  {
    type: "function",
    name: "transferTokenPreApproved",
    inputs: [
      {
        name: "_intent",
        type: "tuple",
        components: [
          {
            name: "recipientAmount",
            type: "uint256"
          },
          {
            name: "deadline",
            type: "uint256"
          },
          {
            name: "recipient",
            type: "address"
          },
          {
            name: "recipientCurrency",
            type: "address"
          },
          {
            name: "refundDestination",
            type: "address"
          },
          {
            name: "feeAmount",
            type: "uint256"
          },
          {
            name: "id",
            type: "bytes16"
          },
          {
            name: "operator",
            type: "address"
          },
          {
            name: "signature",
            type: "bytes"
          },
          {
            name: "prefix",
            type: "bytes"
          }
        ]
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  }
];
export {
  CHECKOUT_INSUFFICIENT_BALANCE_ERROR,
  CHECKOUT_INVALID_CHARGE_ERROR_MESSAGE,
  CHECKOUT_INVALID_PARAMETER_ERROR_MESSAGE,
  CHECKOUT_LIFECYCLESTATUS,
  CHECKOUT_TOO_MANY_REQUESTS_ERROR_MESSAGE,
  CHECKOUT_UNSUPPORTED_CHAIN_ERROR_MESSAGE,
  COMMERCE_ABI,
  CONTRACT_METHODS,
  CheckoutErrorCode,
  GENERAL_CHECKOUT_ERROR_MESSAGE,
  GENERIC_ERROR_MESSAGE,
  NO_CONNECTED_ADDRESS_ERROR,
  NO_CONTRACTS_ERROR,
  UNCAUGHT_CHECKOUT_ERROR_MESSAGE,
  USDC_ADDRESS_BASE,
  USER_REJECTED_ERROR
};
//# sourceMappingURL=constants.js.map

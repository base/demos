import { formatDecimals } from "../../swap/utils/formatDecimals.js";
function getAPIParamsForToken(params) {
  const { from, to, amount, amountReference, isAmountInDecimals } = params;
  const { fromAddress } = params;
  const decimals = amountReference === "from" ? from.decimals : to.decimals;
  if (typeof amount !== "string" || amount.trim() === "") {
    return {
      code: "INVALID_INPUT",
      error: "Invalid input: amount must be a non-empty string",
      message: ""
    };
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    return {
      code: "INVALID_INPUT",
      error: "Invalid input: decimals must be a non-negative integer",
      message: ""
    };
  }
  if (!/^(?:0|[1-9]\d*|\.\d+)(?:\.\d*)?$/.test(amount)) {
    return {
      code: "INVALID_INPUT",
      error: "Invalid input: amount must be a non-negative number string",
      message: ""
    };
  }
  return {
    fromAddress,
    from: from.address || "ETH",
    to: to.address || "ETH",
    amount: isAmountInDecimals ? amount : formatDecimals(amount, false, decimals),
    amountReference: amountReference || "from"
  };
}
export {
  getAPIParamsForToken
};
//# sourceMappingURL=getAPIParamsForToken.js.map

import { formatUnits } from "viem";
import { getRoundedAmount } from "../../internal/utils/getRoundedAmount.js";
function getTokenBalances({
  ethBalance,
  token,
  tokenBalance
}) {
  if ((token == null ? void 0 : token.symbol) === "ETH" && (ethBalance || ethBalance === 0n)) {
    const convertedBalance = formatUnits(ethBalance, token == null ? void 0 : token.decimals);
    return {
      convertedBalance: formatUnits(ethBalance, token == null ? void 0 : token.decimals),
      roundedBalance: getRoundedAmount(convertedBalance, 8)
    };
  }
  if (token && (token == null ? void 0 : token.symbol) !== "ETH" && (tokenBalance || tokenBalance === 0n)) {
    const convertedBalance = formatUnits(tokenBalance, token == null ? void 0 : token.decimals);
    return {
      convertedBalance,
      roundedBalance: getRoundedAmount(convertedBalance, 8)
    };
  }
  return { convertedBalance: "", roundedBalance: "" };
}
export {
  getTokenBalances
};
//# sourceMappingURL=getTokenBalances.js.map

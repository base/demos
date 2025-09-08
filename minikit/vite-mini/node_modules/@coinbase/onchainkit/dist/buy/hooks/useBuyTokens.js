import { useState } from "react";
import { useValue } from "../../internal/hooks/useValue.js";
import { useSwapBalances } from "../../swap/hooks/useSwapBalances.js";
import { usdcToken, ethToken } from "../../token/constants.js";
import { useBuyToken } from "./useBuyToken.js";
const useBuyTokens = (toToken, fromToken, address) => {
  const fromETH = useBuyToken(toToken, ethToken, address);
  const fromUSDC = useBuyToken(toToken, usdcToken, address);
  const from = useBuyToken(toToken, fromToken, address);
  const [toAmount, setToAmount] = useState("");
  const [toAmountUSD, setToAmountUSD] = useState("");
  const [toLoading, setToLoading] = useState(false);
  const token = (toToken == null ? void 0 : toToken.symbol) === "ETH" ? usdcToken : ethToken;
  const {
    toBalanceString: balance,
    toTokenBalanceError: error,
    toTokenResponse: balanceResponse
  } = useSwapBalances({ address, fromToken: token, toToken });
  const to = useValue({
    balance,
    balanceResponse,
    amount: toAmount,
    setAmount: setToAmount,
    amountUSD: toAmountUSD,
    setAmountUSD: setToAmountUSD,
    token: toToken,
    loading: toLoading,
    setLoading: setToLoading,
    error
  });
  return { fromETH, fromUSDC, from, to };
};
export {
  useBuyTokens
};
//# sourceMappingURL=useBuyTokens.js.map

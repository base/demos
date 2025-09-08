import { useState } from "react";
import { useValue } from "../../internal/hooks/useValue.js";
import { useSwapBalances } from "./useSwapBalances.js";
const useFromTo = (address) => {
  const [fromAmount, setFromAmount] = useState("");
  const [fromAmountUSD, setFromAmountUSD] = useState("");
  const [fromToken, setFromToken] = useState();
  const [toAmount, setToAmount] = useState("");
  const [toAmountUSD, setToAmountUSD] = useState("");
  const [toToken, setToToken] = useState();
  const [toLoading, setToLoading] = useState(false);
  const [fromLoading, setFromLoading] = useState(false);
  const {
    fromBalanceString,
    fromTokenBalanceError,
    toBalanceString,
    toTokenBalanceError,
    fromTokenResponse,
    toTokenResponse
  } = useSwapBalances({ address, fromToken, toToken });
  const from = useValue({
    balance: fromBalanceString,
    balanceResponse: fromTokenResponse,
    amount: fromAmount,
    setAmount: setFromAmount,
    amountUSD: fromAmountUSD,
    setAmountUSD: setFromAmountUSD,
    token: fromToken,
    setToken: setFromToken,
    loading: fromLoading,
    setLoading: setFromLoading,
    error: fromTokenBalanceError
  });
  const to = useValue({
    balance: toBalanceString,
    balanceResponse: toTokenResponse,
    amount: toAmount,
    amountUSD: toAmountUSD,
    setAmountUSD: setToAmountUSD,
    setAmount: setToAmount,
    token: toToken,
    setToken: setToToken,
    loading: toLoading,
    setLoading: setToLoading,
    error: toTokenBalanceError
  });
  return { from, to };
};
export {
  useFromTo
};
//# sourceMappingURL=useFromTo.js.map

import { useState } from "react";
import { useValue } from "../../internal/hooks/useValue.js";
import { useSwapBalances } from "../../swap/hooks/useSwapBalances.js";
const useBuyToken = (toToken, token, address) => {
  const [amount, setAmount] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    fromBalanceString: balance,
    fromTokenBalanceError: error,
    fromTokenResponse: balanceResponse
  } = useSwapBalances({ address, fromToken: token, toToken });
  return useValue({
    balance,
    balanceResponse,
    amount,
    setAmount,
    amountUSD,
    setAmountUSD,
    token,
    loading,
    setLoading,
    error
  });
};
export {
  useBuyToken
};
//# sourceMappingURL=useBuyToken.js.map

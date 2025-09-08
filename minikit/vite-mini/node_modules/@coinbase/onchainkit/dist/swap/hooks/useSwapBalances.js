import { useValue } from "../../internal/hooks/useValue.js";
import { useGetETHBalance } from "../../wallet/hooks/useGetETHBalance.js";
import { useGetTokenBalance } from "../../wallet/hooks/useGetTokenBalance.js";
function useSwapBalances({
  address,
  fromToken,
  toToken
}) {
  const {
    convertedBalance: convertedEthBalance,
    error: ethBalanceError,
    response: ethBalanceResponse
  } = useGetETHBalance(address);
  const {
    convertedBalance: convertedFromBalance,
    error: fromBalanceError,
    response: _fromTokenResponse
  } = useGetTokenBalance(address, fromToken);
  const {
    convertedBalance: convertedToBalance,
    error: toBalanceError,
    response: _toTokenResponse
  } = useGetTokenBalance(address, toToken);
  const isFromNativeToken = (fromToken == null ? void 0 : fromToken.symbol) === "ETH";
  const isToNativeToken = (toToken == null ? void 0 : toToken.symbol) === "ETH";
  const fromBalanceString = isFromNativeToken ? convertedEthBalance : convertedFromBalance;
  const fromTokenBalanceError = isFromNativeToken ? ethBalanceError : fromBalanceError;
  const toBalanceString = isToNativeToken ? convertedEthBalance : convertedToBalance;
  const toTokenBalanceError = isToNativeToken ? ethBalanceError : toBalanceError;
  const fromTokenResponse = isFromNativeToken ? ethBalanceResponse : _fromTokenResponse;
  const toTokenResponse = isToNativeToken ? ethBalanceResponse : _toTokenResponse;
  return useValue({
    fromBalanceString,
    fromTokenBalanceError,
    fromTokenResponse,
    toBalanceString,
    toTokenBalanceError,
    toTokenResponse
  });
}
export {
  useSwapBalances
};
//# sourceMappingURL=useSwapBalances.js.map

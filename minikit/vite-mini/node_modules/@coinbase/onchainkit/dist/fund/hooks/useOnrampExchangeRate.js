import { useCallback, useMemo } from "react";
import { fetchOnrampQuote } from "../utils/fetchOnrampQuote.js";
const useOnrampExchangeRate = ({
  asset,
  currency,
  country,
  subdivision,
  setExchangeRate,
  onError
}) => {
  const fetchExchangeRate = useCallback(async () => {
    try {
      const quote = await fetchOnrampQuote({
        purchaseCurrency: asset,
        paymentCurrency: currency,
        paymentAmount: "100",
        paymentMethod: "CARD",
        country,
        subdivision
      });
      setExchangeRate(
        Number(quote.purchaseAmount.value) / Number(quote.paymentSubtotal.value)
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching exchange rate:", err);
        onError == null ? void 0 : onError({
          errorType: "handled_error",
          code: "EXCHANGE_RATE_ERROR",
          debugMessage: err.message
        });
      } else {
        console.error("Unknown error fetching exchange rate:", err);
        onError == null ? void 0 : onError({
          errorType: "unknown_error",
          code: "EXCHANGE_RATE_ERROR",
          debugMessage: JSON.stringify(err)
        });
      }
    }
  }, [asset, country, subdivision, currency, onError, setExchangeRate]);
  return useMemo(() => ({ fetchExchangeRate }), [fetchExchangeRate]);
};
export {
  useOnrampExchangeRate
};
//# sourceMappingURL=useOnrampExchangeRate.js.map

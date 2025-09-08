import { useCallback, useEffect } from "react";
import { buildPaymentMethods } from "../utils/buildPaymentMethods.js";
import { fetchOnrampOptions } from "../utils/fetchOnrampOptions.js";
const usePaymentMethods = ({
  country,
  subdivision,
  currency,
  setPaymentMethods,
  setIsPaymentMethodsLoading,
  onError
}) => {
  const handleFetchPaymentMethods = useCallback(async () => {
    setIsPaymentMethodsLoading(true);
    try {
      const paymentOptions = await fetchOnrampOptions({
        country,
        subdivision
      });
      const paymentMethods = buildPaymentMethods(
        paymentOptions,
        currency,
        country
      );
      if (paymentMethods.length === 0) {
        console.error(
          "No payment methods found for the selected country and currency. See docs for more information: https://docs.cdp.coinbase.com/onramp/docs/api-configurations"
        );
        onError == null ? void 0 : onError({
          errorType: "handled_error",
          code: "NO_PAYMENT_METHODS",
          debugMessage: "No payment methods found for the selected country and currency. See docs for more information: https://docs.cdp.coinbase.com/onramp/docs/api-configurations"
        });
      }
      setPaymentMethods(paymentMethods);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching payment options:", error);
        onError == null ? void 0 : onError({
          errorType: "handled_error",
          code: "PAYMENT_METHODS_ERROR",
          debugMessage: error.message
        });
      }
    } finally {
      setIsPaymentMethodsLoading(false);
    }
  }, [
    country,
    subdivision,
    currency,
    setPaymentMethods,
    setIsPaymentMethodsLoading,
    onError
  ]);
  useEffect(() => {
    handleFetchPaymentMethods();
  }, []);
};
export {
  usePaymentMethods
};
//# sourceMappingURL=usePaymentMethods.js.map

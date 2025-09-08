import { truncateDecimalPlaces } from "../utils/truncateDecimalPlaces.js";
import { useCallback, useMemo } from "react";
const useAmountInput = ({
  setFiatAmount,
  setCryptoAmount,
  selectedInputType,
  exchangeRate
}) => {
  const handleFiatChange = useCallback(
    (value) => {
      const fiatValue = truncateDecimalPlaces(value, 2);
      setFiatAmount(fiatValue);
      const calculatedCryptoValue = String(
        Number(fiatValue) * Number(exchangeRate)
      );
      const resultCryptoValue = truncateDecimalPlaces(calculatedCryptoValue, 8);
      setCryptoAmount(calculatedCryptoValue === "0" ? "" : resultCryptoValue);
    },
    [exchangeRate, setFiatAmount, setCryptoAmount]
  );
  const handleCryptoChange = useCallback(
    (value) => {
      const truncatedValue = truncateDecimalPlaces(value, 8);
      setCryptoAmount(truncatedValue);
      const calculatedFiatValue = String(
        Number(truncatedValue) / Number(exchangeRate)
      );
      const resultFiatValue = truncateDecimalPlaces(calculatedFiatValue, 2);
      setFiatAmount(resultFiatValue === "0" ? "" : resultFiatValue);
    },
    [exchangeRate, setFiatAmount, setCryptoAmount]
  );
  const handleChange = useCallback(
    (value, onChange) => {
      if (selectedInputType === "fiat") {
        handleFiatChange(value);
      } else {
        handleCryptoChange(value);
      }
      onChange == null ? void 0 : onChange(value);
    },
    [handleFiatChange, handleCryptoChange, selectedInputType]
  );
  return useMemo(
    () => ({
      handleChange,
      handleFiatChange,
      handleCryptoChange
    }),
    [handleChange, handleFiatChange, handleCryptoChange]
  );
};
export {
  useAmountInput
};
//# sourceMappingURL=useAmountInput.js.map

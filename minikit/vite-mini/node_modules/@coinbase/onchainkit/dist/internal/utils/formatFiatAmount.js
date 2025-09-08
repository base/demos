const formatFiatAmount = ({
  amount,
  currency = "USD",
  locale,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
}) => {
  let parsedAmount = Number(amount);
  if (Number.isNaN(parsedAmount)) {
    parsedAmount = 0;
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(parsedAmount);
};
export {
  formatFiatAmount
};
//# sourceMappingURL=formatFiatAmount.js.map

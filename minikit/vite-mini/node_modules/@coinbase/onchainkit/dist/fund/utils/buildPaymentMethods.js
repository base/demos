const DEFAULT_MIN_AMOUNT = 2;
const DEFAULT_MAX_AMOUNT = 500;
const buildCoinbasePaymentMethodDescription = (paymentMethodLimits) => {
  const availableMethods = [
    // Check API-provided methods
    paymentMethodLimits.some((limit) => limit.id === "ACH_BANK_ACCOUNT") && "ACH",
    paymentMethodLimits.some((limit) => limit.id === "CARD") && "debit",
    // Always include these methods
    "cash",
    "crypto balance"
  ].filter(Boolean);
  return availableMethods.join(", ");
};
const buildCoinbasePaymentMethod = ({
  limits
}) => ({
  id: "",
  name: "Coinbase",
  description: buildCoinbasePaymentMethodDescription(limits),
  icon: "coinbaseLogo",
  minAmount: Math.min(...limits.map((l) => Number(l.min))),
  maxAmount: Math.max(...limits.map((l) => Number(l.max)))
});
const buildUSPaymentMethods = (paymentCurrency) => {
  const paymentMethodConfigs = [
    {
      id: "APPLE_PAY",
      name: "Apple Pay",
      icon: "apple"
    },
    {
      id: "CARD",
      name: "Debit card",
      icon: "creditCard"
    }
  ];
  return paymentMethodConfigs.map((config) => {
    const limit = paymentCurrency.limits.find(
      (limit2) => limit2.id === config.id
    );
    return {
      ...config,
      description: "Up to $500/week. No sign up required.",
      minAmount: Number(limit == null ? void 0 : limit.min) || DEFAULT_MIN_AMOUNT,
      maxAmount: Number(limit == null ? void 0 : limit.max) || DEFAULT_MAX_AMOUNT
    };
  });
};
const buildPaymentMethods = (paymentOptions, currency, country) => {
  const paymentCurrency = paymentOptions.paymentCurrencies.find(
    (paymentCurrency2) => paymentCurrency2.id === currency
  );
  if (!paymentCurrency) {
    return [];
  }
  const coinbasePaymentMethod = buildCoinbasePaymentMethod(paymentCurrency);
  let usPaymentMethods = [];
  if (country === "US" && currency === "USD") {
    usPaymentMethods = buildUSPaymentMethods(paymentCurrency);
  }
  return [coinbasePaymentMethod, ...usPaymentMethods];
};
export {
  buildCoinbasePaymentMethodDescription,
  buildPaymentMethods
};
//# sourceMappingURL=buildPaymentMethods.js.map

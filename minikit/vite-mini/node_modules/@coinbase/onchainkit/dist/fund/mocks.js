const quoteResponseDataMock = {
  paymentTotal: { value: "100.00", currency: "USD" },
  paymentSubtotal: { value: "120.00", currency: "USD" },
  purchaseAmount: { value: "0.1", currency: "BTC" },
  coinbaseFee: { value: "2.00", currency: "USD" },
  networkFee: { value: "1.00", currency: "USD" },
  quoteId: "quote-id-123"
};
const optionsResponseDataMock = {
  purchaseCurrencies: [],
  paymentCurrencies: [
    {
      id: "USD",
      iconUrl: "https://example.com/usd.png",
      limits: [
        {
          id: "ACH_BANK_ACCOUNT",
          min: "5",
          max: "500"
        },
        {
          id: "CARD",
          min: "5",
          max: "500"
        },
        {
          id: "APPLE_PAY",
          min: "5",
          max: "500"
        }
      ]
    }
  ]
};
export {
  optionsResponseDataMock,
  quoteResponseDataMock
};
//# sourceMappingURL=mocks.js.map

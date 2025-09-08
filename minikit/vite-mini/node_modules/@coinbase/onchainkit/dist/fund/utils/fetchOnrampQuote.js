import { convertSnakeToCamelCase } from "../../internal/utils/convertSnakeToCamelCase.js";
import { getApiKey } from "../../internal/utils/getApiKey.js";
import { ONRAMP_API_BASE_URL } from "../constants.js";
async function fetchOnrampQuote({
  purchaseCurrency,
  purchaseNetwork,
  paymentCurrency,
  paymentMethod,
  paymentAmount,
  country,
  subdivision,
  apiKey
}) {
  const cpdApiKey = apiKey || getApiKey();
  const response = await fetch(`${ONRAMP_API_BASE_URL}/buy/quote`, {
    method: "POST",
    body: JSON.stringify({
      purchase_currency: purchaseCurrency,
      purchase_network: purchaseNetwork,
      payment_currency: paymentCurrency,
      payment_method: paymentMethod,
      payment_amount: paymentAmount,
      country,
      subdivision
    }),
    headers: {
      Authorization: `Bearer ${cpdApiKey}`
    }
  });
  const responseJson = await response.json();
  return convertSnakeToCamelCase(responseJson);
}
export {
  fetchOnrampQuote
};
//# sourceMappingURL=fetchOnrampQuote.js.map

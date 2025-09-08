import { convertSnakeToCamelCase } from "../../internal/utils/convertSnakeToCamelCase.js";
import { getApiKey } from "../../internal/utils/getApiKey.js";
import { ONRAMP_API_BASE_URL } from "../constants.js";
async function fetchOnrampTransactionStatus({
  partnerUserId,
  nextPageKey,
  pageSize,
  apiKey
}) {
  const cpdApiKey = apiKey || getApiKey();
  const response = await fetch(
    `${ONRAMP_API_BASE_URL}/buy/user/${partnerUserId}/transactions?page_key=${nextPageKey}&page_size=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cpdApiKey}`
      }
    }
  );
  const responseJson = await response.json();
  return convertSnakeToCamelCase(
    responseJson
  );
}
export {
  fetchOnrampTransactionStatus
};
//# sourceMappingURL=fetchOnrampTransactionStatus.js.map

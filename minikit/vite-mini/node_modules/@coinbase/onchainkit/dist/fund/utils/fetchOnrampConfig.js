import { convertSnakeToCamelCase } from "../../internal/utils/convertSnakeToCamelCase.js";
import { getApiKey } from "../../internal/utils/getApiKey.js";
import { ONRAMP_API_BASE_URL } from "../constants.js";
async function fetchOnrampConfig(apiKey) {
  const cpdApiKey = apiKey || getApiKey();
  const response = await fetch(`${ONRAMP_API_BASE_URL}/buy/config`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cpdApiKey}`
    }
  });
  const responseJson = await response.json();
  return convertSnakeToCamelCase(responseJson);
}
export {
  fetchOnrampConfig
};
//# sourceMappingURL=fetchOnrampConfig.js.map

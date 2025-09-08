import { convertSnakeToCamelCase } from "../../internal/utils/convertSnakeToCamelCase.js";
import { getApiKey } from "../../internal/utils/getApiKey.js";
import { ONRAMP_API_BASE_URL } from "../constants.js";
async function fetchOnrampOptions({
  country,
  subdivision,
  apiKey
}) {
  const cpdApiKey = apiKey || getApiKey();
  let queryParams = `?country=${country}`;
  if (subdivision) {
    queryParams = `${queryParams}&subdivision=${subdivision}`;
  }
  const response = await fetch(
    `${ONRAMP_API_BASE_URL}/buy/options${queryParams}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cpdApiKey}`
      }
    }
  );
  const responseJson = await response.json();
  return convertSnakeToCamelCase(responseJson);
}
export {
  fetchOnrampOptions
};
//# sourceMappingURL=fetchOnrampOptions.js.map

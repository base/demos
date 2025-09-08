import { getOnchainKitConfig } from "../../OnchainKitConfig.js";
import { ANALYTICS_API_URL } from "../constants.js";
import { clientMetaManager } from "../../clientMeta/clientMetaManager.js";
import { JSON_HEADERS } from "../../network/constants.js";
function buildBody(event, data) {
  return {
    apiKey: getOnchainKitConfig("apiKey") ?? "undefined",
    sessionId: getOnchainKitConfig("sessionId") ?? "undefined",
    timestamp: Date.now(),
    eventType: event,
    data,
    origin: window.location.origin
  };
}
async function handleSendAnalytics(event, data) {
  var _a;
  const config = getOnchainKitConfig("config");
  if (!(config == null ? void 0 : config.analytics)) {
    return;
  }
  try {
    const clientMeta = await clientMetaManager.getClientMeta();
    await fetch((config == null ? void 0 : config.analyticsUrl) ?? ANALYTICS_API_URL, {
      method: "POST",
      headers: {
        ...JSON_HEADERS,
        "OnchainKit-App-Name": document.title,
        "OnchainKit-Client-Fid": ((_a = clientMeta.clientFid) == null ? void 0 : _a.toString()) ?? "",
        "OnchainKit-Mode": clientMeta.mode
      },
      body: JSON.stringify(buildBody(event, data))
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error sending analytics:", error);
    }
  }
}
const sendAnalyticsPayload = (event, data) => handleSendAnalytics(event, data);
export {
  sendAnalyticsPayload
};
//# sourceMappingURL=analyticsService.js.map

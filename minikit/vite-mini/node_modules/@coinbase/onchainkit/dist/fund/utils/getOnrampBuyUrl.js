import { version } from "../../version.js";
import { ONRAMP_BUY_URL } from "../constants.js";
function getOnrampBuyUrl({
  projectId,
  originComponentName,
  ...props
}) {
  const url = new URL(ONRAMP_BUY_URL);
  if (projectId !== void 0) {
    url.searchParams.append("appId", projectId);
  }
  for (const key of Object.keys(props)) {
    const value = props[key];
    if (value !== void 0) {
      if (["string", "number", "boolean"].includes(typeof value)) {
        url.searchParams.append(key, value.toString());
      } else {
        url.searchParams.append(key, JSON.stringify(value));
      }
    }
  }
  if (originComponentName) {
    url.searchParams.append(
      "sdkVersion",
      `onchainkit@${version}:${originComponentName}`
    );
  } else {
    url.searchParams.append("sdkVersion", `onchainkit@${version}`);
  }
  url.searchParams.sort();
  return url.toString();
}
export {
  getOnrampBuyUrl
};
//# sourceMappingURL=getOnrampBuyUrl.js.map

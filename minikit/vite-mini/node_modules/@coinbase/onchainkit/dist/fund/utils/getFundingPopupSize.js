import { getWindowDimensions } from "../../internal/utils/getWindowDimensions.js";
import { ONRAMP_BUY_URL, ONRAMP_POPUP_WIDTH, ONRAMP_POPUP_HEIGHT } from "../constants.js";
function getFundingPopupSize(size, fundingUrl) {
  if (fundingUrl == null ? void 0 : fundingUrl.includes(ONRAMP_BUY_URL)) {
    return {
      height: ONRAMP_POPUP_HEIGHT,
      width: ONRAMP_POPUP_WIDTH
    };
  }
  return getWindowDimensions(size);
}
export {
  getFundingPopupSize
};
//# sourceMappingURL=getFundingPopupSize.js.map

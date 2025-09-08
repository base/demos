import { applePaySvg } from "../svg/applePaySvg.js";
import { useMemo, isValidElement } from "react";
import { appleSvg } from "../svg/appleSvg.js";
import { coinbaseLogoSvg } from "../svg/coinbaseLogoSvg.js";
import { coinbasePaySvg } from "../svg/coinbasePaySvg.js";
import { creditCardSvg } from "../svg/creditCardSvg.js";
import { fundWalletSvg } from "../svg/fundWallet.js";
import { swapSettingsSvg } from "../svg/swapSettings.js";
import { toggleSvg } from "../svg/toggleSvg.js";
import { walletSvg } from "../svg/walletSvg.js";
const useIcon = ({ icon }) => {
  return useMemo(() => {
    if (icon === void 0) {
      return null;
    }
    switch (icon) {
      case "coinbasePay":
        return coinbasePaySvg;
      case "coinbaseLogo":
        return coinbaseLogoSvg;
      case "fundWallet":
        return fundWalletSvg;
      case "swapSettings":
        return swapSettingsSvg;
      case "wallet":
        return walletSvg;
      case "toggle":
        return toggleSvg;
      case "applePay":
        return applePaySvg;
      case "apple":
        return appleSvg;
      case "creditCard":
        return creditCardSvg;
    }
    if (isValidElement(icon)) {
      return icon;
    }
  }, [icon]);
};
export {
  useIcon
};
//# sourceMappingURL=useIcon.js.map

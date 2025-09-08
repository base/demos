import { b as bootstrapLazy } from './index-4b8a94c9.js';
export { s as setNonce } from './index-4b8a94c9.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["mm-install-modal_3",[[1,"mm-install-modal",{"link":[1],"sdkVersion":[1,"sdk-version"],"preferDesktop":[4,"prefer-desktop"],"tab":[32],"isDefaultTab":[32],"translationsLoaded":[32]},null,{"preferDesktop":["updatePreferDesktop"]}],[1,"mm-pending-modal",{"displayOTP":[4,"display-o-t-p"],"sdkVersion":[1,"sdk-version"],"otpCode":[1,"otp-code"],"translationsLoaded":[32]}],[1,"mm-select-modal",{"link":[1],"sdkVersion":[1,"sdk-version"],"preferDesktop":[4,"prefer-desktop"],"tab":[32],"isDefaultTab":[32],"translationsLoaded":[32]},null,{"preferDesktop":["updatePreferDesktop"]}]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map
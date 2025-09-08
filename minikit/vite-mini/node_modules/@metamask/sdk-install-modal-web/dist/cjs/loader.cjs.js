'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e2e1ee7a.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["mm-install-modal_3.cjs",[[1,"mm-install-modal",{"link":[1],"sdkVersion":[1,"sdk-version"],"preferDesktop":[4,"prefer-desktop"],"tab":[32],"isDefaultTab":[32],"translationsLoaded":[32]},null,{"preferDesktop":["updatePreferDesktop"]}],[1,"mm-pending-modal",{"displayOTP":[4,"display-o-t-p"],"sdkVersion":[1,"sdk-version"],"otpCode":[1,"otp-code"],"translationsLoaded":[32]}],[1,"mm-select-modal",{"link":[1],"sdkVersion":[1,"sdk-version"],"preferDesktop":[4,"prefer-desktop"],"tab":[32],"isDefaultTab":[32],"translationsLoaded":[32]},null,{"preferDesktop":["updatePreferDesktop"]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map
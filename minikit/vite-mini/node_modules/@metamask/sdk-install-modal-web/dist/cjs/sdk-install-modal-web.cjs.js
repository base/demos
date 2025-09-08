'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e2e1ee7a.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Browser v4.22.2 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('sdk-install-modal-web.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["mm-install-modal_3.cjs",[[1,"mm-install-modal",{"link":[1],"sdkVersion":[1,"sdk-version"],"preferDesktop":[4,"prefer-desktop"],"tab":[32],"isDefaultTab":[32],"translationsLoaded":[32]},null,{"preferDesktop":["updatePreferDesktop"]}],[1,"mm-pending-modal",{"displayOTP":[4,"display-o-t-p"],"sdkVersion":[1,"sdk-version"],"otpCode":[1,"otp-code"],"translationsLoaded":[32]}],[1,"mm-select-modal",{"link":[1],"sdkVersion":[1,"sdk-version"],"preferDesktop":[4,"prefer-desktop"],"tab":[32],"isDefaultTab":[32],"translationsLoaded":[32]},null,{"preferDesktop":["updatePreferDesktop"]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=sdk-install-modal-web.cjs.js.map
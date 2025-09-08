function isWalletInstalled(walletType) {
  var _a, _b, _c, _d;
  if (typeof window === "undefined") {
    return false;
  }
  if (!window.ethereum) {
    if (walletType === "phantom") {
      return !!((_b = (_a = window.phantom) == null ? void 0 : _a.ethereum) == null ? void 0 : _b.isPhantom);
    }
    return false;
  }
  switch (walletType) {
    case "phantom":
      return !!((_d = (_c = window.phantom) == null ? void 0 : _c.ethereum) == null ? void 0 : _d.isPhantom) || !!window.ethereum.isPhantom;
    case "rabby":
      return !!window.ethereum.isRabby;
    case "trust":
      return !!window.ethereum.isTrust || !!window.ethereum.isTrustWallet;
    case "frame":
      return !!window.ethereum.isFrame;
    default:
      return false;
  }
}
const WALLET_INSTALL_URLS = {
  phantom: "https://phantom.app/download",
  rabby: "https://rabby.io",
  trust: "https://trustwallet.com/download",
  frame: "https://frame.sh"
};
function redirectToWalletInstall(walletType) {
  const url = WALLET_INSTALL_URLS[walletType];
  if (!url) {
    return false;
  }
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
function checkWalletAndRedirect(walletType) {
  const isInstalled = isWalletInstalled(walletType);
  if (!isInstalled) {
    redirectToWalletInstall(walletType);
  }
  return isInstalled;
}
export {
  WALLET_INSTALL_URLS,
  checkWalletAndRedirect,
  isWalletInstalled,
  redirectToWalletInstall
};
//# sourceMappingURL=checkWalletAndRedirect.js.map

function IsValidIpfsUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const isValidIpfsUrl = parsedUrl.protocol === "ipfs:";
    return isValidIpfsUrl;
  } catch {
    return false;
  }
}
function convertIpfsToHttps(url) {
  if (!url) {
    return void 0;
  }
  const IPFS_GATEWAY_URL = "https://ipfs.io/ipfs/";
  if (IsValidIpfsUrl(url)) {
    return url.replace("ipfs://", IPFS_GATEWAY_URL);
  }
  return url;
}
export {
  IsValidIpfsUrl,
  convertIpfsToHttps
};
//# sourceMappingURL=ipfs.js.map

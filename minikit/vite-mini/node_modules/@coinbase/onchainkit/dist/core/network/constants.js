import { version } from "../../version.js";
const POST_METHOD = "POST";
const JSON_HEADERS = {
  "Content-Type": "application/json",
  "OnchainKit-Version": version
};
const CONTEXT_HEADER = "OnchainKit-Context";
const JSON_RPC_VERSION = "2.0";
var RequestContext = /* @__PURE__ */ ((RequestContext2) => {
  RequestContext2["API"] = "api";
  RequestContext2["Buy"] = "buy";
  RequestContext2["Checkout"] = "checkout";
  RequestContext2["Hook"] = "hook";
  RequestContext2["NFT"] = "nft";
  RequestContext2["Swap"] = "swap";
  RequestContext2["Wallet"] = "wallet";
  return RequestContext2;
})(RequestContext || {});
export {
  CONTEXT_HEADER,
  JSON_HEADERS,
  JSON_RPC_VERSION,
  POST_METHOD,
  RequestContext
};
//# sourceMappingURL=constants.js.map

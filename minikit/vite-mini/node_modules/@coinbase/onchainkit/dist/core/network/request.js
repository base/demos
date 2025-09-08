import { clientMetaManager } from "../clientMeta/clientMetaManager.js";
import { JSON_RPC_VERSION, POST_METHOD, JSON_HEADERS, RequestContext, CONTEXT_HEADER } from "./constants.js";
import { getRPCUrl } from "./getRPCUrl.js";
function buildRequestBody(method, params) {
  return {
    id: 1,
    jsonrpc: JSON_RPC_VERSION,
    method,
    params
  };
}
async function buildRequestHeaders(context) {
  var _a;
  const headers = {
    ...JSON_HEADERS
  };
  const clientMeta = await clientMetaManager.getClientMeta().catch(() => null);
  if (clientMeta) {
    headers["OnchainKit-Client-Fid"] = ((_a = clientMeta.clientFid) == null ? void 0 : _a.toString()) ?? "";
    headers["OnchainKit-Mode"] = clientMeta.mode;
  }
  if (context) {
    if (!Object.values(RequestContext).includes(context)) {
      return {
        ...headers,
        [CONTEXT_HEADER]: RequestContext.API
      };
    }
    return {
      ...headers,
      [CONTEXT_HEADER]: context
    };
  }
  return headers;
}
async function sendRequest(method, params, _context) {
  try {
    const body = buildRequestBody(method, params);
    const url = getRPCUrl();
    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: await buildRequestHeaders(_context),
      method: POST_METHOD
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(
      `sendRequest: error sending request: ${error.message}`
    );
    throw error;
  }
}
export {
  buildRequestBody,
  sendRequest
};
//# sourceMappingURL=request.js.map

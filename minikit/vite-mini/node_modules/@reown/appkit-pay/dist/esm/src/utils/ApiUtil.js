import { OptionsController } from '@reown/appkit-controllers';
import { API_URL } from './ConstantsUtil.js';
class JsonRpcError extends Error {
}
export function getApiUrl() {
    const projectId = OptionsController.getSnapshot().projectId;
    return `${API_URL}?projectId=${projectId}`;
}
async function sendRequest(method, params) {
    const url = getApiUrl();
    const requestBody = {
        jsonrpc: '2.0',
        id: 1,
        method,
        params
    };
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    if (json.error) {
        throw new JsonRpcError(json.error.message);
    }
    return json;
}
export async function getExchanges(params) {
    const response = await sendRequest('reown_getExchanges', params);
    return response.result;
}
export async function getPayUrl(params) {
    const response = await sendRequest('reown_getExchangePayUrl', params);
    return response.result;
}
export async function getBuyStatus(params) {
    const response = await sendRequest('reown_getExchangeBuyStatus', params);
    return response.result;
}
//# sourceMappingURL=ApiUtil.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEndpoint = postEndpoint;
exports.putEndpoint = putEndpoint;
exports.deleteEndpoint = deleteEndpoint;
exports.getEndpoint = getEndpoint;
const utils_1 = require("./utils");
function makeUrl(baseUrl, path, pathParams, query) {
    const pathname = (0, utils_1.insertParams)(path, pathParams);
    const search = (0, utils_1.stringifyQuery)(query);
    return `${baseUrl}${pathname}${search}`;
}
function postEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, 'POST', params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
function putEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, 'PUT', params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
function deleteEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, 'DELETE', params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
function getEndpoint(baseUrl, path, params, rawUrl) {
    if (rawUrl) {
        return (0, utils_1.getData)(rawUrl, undefined, params === null || params === void 0 ? void 0 : params.credentials);
    }
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.getData)(url, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
//# sourceMappingURL=endpoint.js.map
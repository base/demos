"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertParams = insertParams;
exports.stringifyQuery = stringifyQuery;
exports.fetchData = fetchData;
exports.getData = getData;
const isErrorResponse = (data) => {
    const isObject = typeof data === 'object' && data !== null;
    return isObject && ('code' in data || 'statusCode' in data) && 'message' in data;
};
function replaceParam(str, key, value) {
    return str.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
}
function insertParams(template, params) {
    return params
        ? Object.keys(params).reduce((result, key) => {
            return replaceParam(result, key, String(params[key]));
        }, template)
        : template;
}
function stringifyQuery(query) {
    if (!query) {
        return '';
    }
    const searchParams = new URLSearchParams();
    Object.keys(query).forEach((key) => {
        if (query[key] != null) {
            searchParams.append(key, String(query[key]));
        }
    });
    const searchString = searchParams.toString();
    return searchString ? `?${searchString}` : '';
}
function parseResponse(resp) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let json;
        try {
            json = yield resp.json();
        }
        catch (_b) {
            json = {};
        }
        if (!resp.ok) {
            const errTxt = isErrorResponse(json)
                ? `CGW error - ${(_a = json.code) !== null && _a !== void 0 ? _a : json.statusCode}: ${json.message}`
                : `CGW error - status ${resp.statusText}`;
            throw new Error(errTxt);
        }
        return json;
    });
}
function fetchData(url, method, body, headers, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestHeaders = Object.assign({ 'Content-Type': 'application/json' }, headers);
        const options = {
            method: method !== null && method !== void 0 ? method : 'POST',
            headers: requestHeaders,
        };
        if (credentials) {
            options['credentials'] = credentials;
        }
        if (body != null) {
            options.body = typeof body === 'string' ? body : JSON.stringify(body);
        }
        const resp = yield fetch(url, options);
        return parseResponse(resp);
    });
}
function getData(url, headers, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'GET',
        };
        if (headers) {
            options['headers'] = Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' });
        }
        if (credentials) {
            options['credentials'] = credentials;
        }
        const resp = yield fetch(url, options);
        return parseResponse(resp);
    });
}
//# sourceMappingURL=utils.js.map
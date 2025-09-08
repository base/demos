async function fetchData(...args) {
    const response = await fetch(...args);
    if (!response.ok) {
        // Create error object and reject if not a 2xx response code
        const err = new Error(`HTTP status code: ${response.status}`, {
            cause: response
        });
        throw err;
    }
    return response;
}
// -- Utility --------------------------------------------------------------------
export class FetchUtil {
    constructor({ baseUrl, clientId }) {
        this.baseUrl = baseUrl;
        this.clientId = clientId;
    }
    async get({ headers, signal, cache, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, { method: 'GET', headers, signal, cache });
        return response.json();
    }
    async getBlob({ headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, { method: 'GET', headers, signal });
        return response.blob();
    }
    async post({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'POST',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    async put({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'PUT',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    async delete({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'DELETE',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    createUrl({ path, params }) {
        const url = new URL(path, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) {
                    url.searchParams.append(key, value);
                }
            });
        }
        if (this.clientId) {
            url.searchParams.append('clientId', this.clientId);
        }
        return url;
    }
}
//# sourceMappingURL=FetchUtil.js.map
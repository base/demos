interface Options {
    baseUrl: string;
    clientId: string | null;
}
export interface RequestArguments {
    path: string;
    headers?: HeadersInit;
    params?: Record<string, string | undefined>;
    cache?: RequestCache;
    signal?: AbortSignal;
}
interface PostArguments extends RequestArguments {
    body?: Record<string, unknown>;
}
export declare class FetchUtil {
    baseUrl: Options['baseUrl'];
    clientId: Options['clientId'];
    constructor({ baseUrl, clientId }: Options);
    get<T>({ headers, signal, cache, ...args }: RequestArguments): Promise<T>;
    getBlob({ headers, signal, ...args }: RequestArguments): Promise<Blob>;
    post<T>({ body, headers, signal, ...args }: PostArguments): Promise<T>;
    put<T>({ body, headers, signal, ...args }: PostArguments): Promise<T>;
    delete<T>({ body, headers, signal, ...args }: PostArguments): Promise<T>;
    private createUrl;
}
export {};

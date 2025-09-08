export type Params = Record<string, string | number | boolean | null>;
export type ErrorResponse = {
    code: number;
    statusCode?: never;
    message: string;
} | {
    code?: never;
    statusCode: number;
    message: string;
};
export declare function insertParams(template: string, params?: Params): string;
export declare function stringifyQuery(query?: Params): string;
export declare function fetchData<T>(url: string, method: 'POST' | 'PUT' | 'DELETE', body?: unknown, headers?: Record<string, string>, credentials?: RequestCredentials): Promise<T>;
export declare function getData<T>(url: string, headers?: Record<string, string>, credentials?: RequestCredentials): Promise<T>;

type ViewCastParams = {
    /** The hash of the cast to view. */
    hash: string;
    /** Whether the app should be closed after this action is called. */
    close?: boolean;
};
/**
 * Open a cast by its hash in the current client.
 */
export declare function useViewCast(): {
    viewCast: import('@tanstack/react-query').UseMutateFunction<void, Error, ViewCastParams, unknown>;
    viewCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<void, Error, ViewCastParams, unknown>;
    data: undefined;
    variables: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isPending: false;
    isSuccess: false;
    status: "idle";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
} | {
    viewCast: import('@tanstack/react-query').UseMutateFunction<void, Error, ViewCastParams, unknown>;
    viewCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<void, Error, ViewCastParams, unknown>;
    data: undefined;
    variables: ViewCastParams;
    error: null;
    isError: false;
    isIdle: false;
    isPending: true;
    isSuccess: false;
    status: "pending";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
} | {
    viewCast: import('@tanstack/react-query').UseMutateFunction<void, Error, ViewCastParams, unknown>;
    viewCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<void, Error, ViewCastParams, unknown>;
    data: undefined;
    error: Error;
    variables: ViewCastParams;
    isError: true;
    isIdle: false;
    isPending: false;
    isSuccess: false;
    status: "error";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
} | {
    viewCast: import('@tanstack/react-query').UseMutateFunction<void, Error, ViewCastParams, unknown>;
    viewCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<void, Error, ViewCastParams, unknown>;
    data: void;
    error: null;
    variables: ViewCastParams;
    isError: false;
    isIdle: false;
    isPending: false;
    isSuccess: true;
    status: "success";
    reset: () => void;
    context: unknown;
    failureCount: number;
    failureReason: Error | null;
    isPaused: boolean;
    submittedAt: number;
};
export {};
//# sourceMappingURL=useViewCast.d.ts.map
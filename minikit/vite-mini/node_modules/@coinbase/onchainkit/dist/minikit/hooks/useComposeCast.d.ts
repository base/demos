import { ComposeCast } from '@farcaster/frame-sdk';
type ComposeCastParams<TClose extends boolean | undefined = undefined> = {
    /** Text used to prepopulate the cast body. */
    text?: string;
    /** Suggested embeds. Max two. */
    embeds?: [] | [string] | [string, string];
    /** Parent cast to reply to. */
    parent?: {
        type: 'cast';
        hash: string;
    };
    /** Whether the app should be closed after this action is called. */
    close?: TClose;
    /** Channel key to post the cast to. */
    channelKey?: string;
};
/**
 * Opens the cast composer with the suggested text and embeds.
 */
export declare function useComposeCast(): {
    composeCast: import('@tanstack/react-query').UseMutateFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
    composeCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
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
    composeCast: import('@tanstack/react-query').UseMutateFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
    composeCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
    data: undefined;
    variables: ComposeCastParams<undefined>;
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
    composeCast: import('@tanstack/react-query').UseMutateFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
    composeCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
    data: undefined;
    error: Error;
    variables: ComposeCastParams<undefined>;
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
    composeCast: import('@tanstack/react-query').UseMutateFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
    composeCastAsync: import('@tanstack/react-query').UseMutateAsyncFunction<{
        cast: ComposeCast.ComposeCastInnerResult | null;
    }, Error, ComposeCastParams<undefined>, unknown>;
    data: {
        cast: ComposeCast.ComposeCastInnerResult | null;
    };
    error: null;
    variables: ComposeCastParams<undefined>;
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
//# sourceMappingURL=useComposeCast.d.ts.map
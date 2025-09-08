import { SignIn } from '@farcaster/miniapp-core';
export declare namespace getToken {
    type Options = {
        /**
         * Use a custom Quick Auth server, otherwise defaults to the public
         * instance provided by Farcaster.
         *
         * @default https://auth.farcaster.xyz
         */
        quickAuthServerOrigin?: string;
        /**
         * Acquire a new token even if one is already in memory and not expired.
         *
         * @default false
         */
        force?: string;
    };
    type ReturnValue = {
        token: string;
    };
    type ReturnType = Promise<ReturnValue>;
    type ErrorType = SignIn.RejectedByUser | Error;
}
export type QuickAuth = {
    /**
     * Returns the session token if one is present and not expired.
     */
    readonly token: string | undefined;
    /**
     * Get a Quick Auth JWT.
     *
     * If a token is already in memory and not expired it will be returned unless
     * `force` is used. Otherwise a new token will be acquired.
     */
    getToken: (options?: getToken.Options) => getToken.ReturnType;
    /**
     * Make an authenticated fetch request. The `Authorization` header will
     * contain `Bearer ${token}` where token is a Quick Auth session token.
     */
    fetch: typeof fetch;
};
export declare const quickAuth: QuickAuth;

import type { Config, State } from '../createConfig.js';
export declare const cookieStorage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
};
export declare function cookieToInitialState(config: Config, cookie?: string | null): State | undefined;
export declare function parseCookie(cookie: string, key: string): string | undefined;
//# sourceMappingURL=cookie.d.ts.map
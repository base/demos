import type { CaipNetworkId, CustomRpcUrl } from '@reown/appkit-common';
import type { SIWXConfig } from '../utils/SIWXUtil.js';
import type { ConnectMethod, CustomWallet, Features, Metadata, PreferredAccountTypes, ProjectId, RemoteFeatures, SdkVersion, SocialProvider, Tokens, WalletFeature } from '../utils/TypeUtil.js';
export interface OptionsControllerStatePublic {
    /**
     * A boolean that allows you to add or remove the "All Wallets" button on the modal
     * @default 'SHOW'
     * @see https://docs.reown.com/appkit/react/core/options#allwallets
     */
    allWallets?: 'SHOW' | 'HIDE' | 'ONLY_MOBILE';
    /**
     * The project ID for the AppKit. You can find or create your project ID in the Cloud.
     * @see https://cloud.walletconnect.com/
     */
    projectId: ProjectId;
    /**
     * A map of CAIP network ID and custom RPC URLs to be used by the AppKit.
     * @default {}
     * @see https://docs.reown.com/appkit/react/core/options#customrpcurls
     */
    customRpcUrls?: Record<CaipNetworkId, CustomRpcUrl[]>;
    /**
     * Array of wallet ids to be shown in the modal's connection view with priority. These wallets will also show up first in `All Wallets` view
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#featuredwalletids
     */
    featuredWalletIds?: string[];
    /**
     * Array of wallet ids to be shown (order is respected). Unlike `featuredWalletIds`, these wallets will be the only ones shown in `All Wallets` view and as recommended wallets.
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#includewalletids
     */
    includeWalletIds?: string[];
    /**
     * Array of wallet ids to be excluded from the wallet list in the modal.
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#excludewalletids
     */
    excludeWalletIds?: string[];
    /**
     * Array of tokens to show the user's balance of. Each key represents the chain id of the token's blockchain
     * @default {}
     * @see https://docs.reown.com/appkit/react/core/options#tokens
     */
    tokens?: Tokens;
    /**
     * Add custom wallets to the modal. CustomWallets is an array of objects, where each object contains specific information of a custom wallet.
     * @default []
     * @see https://docs.reown.com/appkit/react/core/options#customwallets
     *
     */
    customWallets?: CustomWallet[];
    /**
     * You can add an url for the terms and conditions link.
     * @default undefined
     */
    termsConditionsUrl?: string;
    /**
     * You can add an url for the privacy policy link.
     * @default undefined
     */
    privacyPolicyUrl?: string;
    /**
     * Set of fields that related to your project which will be used to populate the metadata of the modal.
     * @default {}
     */
    metadata?: Metadata;
    /**
     * Enable or disable the appending the AppKit to the DOM. Created for specific use cases like WebGL.
     * @default false
     */
    disableAppend?: boolean;
    /**
     * Enable or disable the all the wallet options (injected, Coinbase, QR, etc.). This is useful if you want to use only email and socials.
     * @default true
     */
    enableWallets?: boolean;
    /**
     * Enable or disable the EIP6963 feature.
     * @default false
     */
    enableEIP6963?: boolean;
    /**
     * Enable or disable the Coinbase wallet.
     * @default true
     */
    enableCoinbase?: boolean;
    /**
     * Enable or disable the Injected wallet.
     * @default true
     */
    enableInjected?: boolean;
    /**
     * Enable or disable the WalletConnect QR code.
     * @default true
     */
    enableWalletConnect?: boolean;
    /**
     * Enable or disable the wallet guide footer in AppKit if you have email or social login configured.
     * @default true
     */
    enableWalletGuide?: boolean;
    /**
     * Enable or disable logs from email/social login.
     * @default true
     */
    enableAuthLogger?: boolean;
    /**
     * Enable or disable Universal Links to open the wallets as default option instead of Deep Links.
     * @default true
     */
    experimental_preferUniversalLinks?: boolean;
    /**
     * Enable or disable debug mode. This is useful if you want to see UI alerts when debugging.
     * @default true
     */
    debug?: boolean;
    /**
     * Features configuration object.
     * @default { swaps: true, onramp: true, email: true, socials: ['google', 'x', 'discord', 'farcaster', 'github', 'apple', 'facebook'], history: true, analytics: true, allWallets: true }
     * @see https://docs.reown.com/appkit/react/core/options#features
     */
    features?: Features;
    /**
     * @experimental - This feature is not production ready.
     * Enable Sign In With X (SIWX) feature.
     * @default undefined
     */
    siwx?: SIWXConfig;
    /**
     * Renders the AppKit to DOM instead of the default modal.
     * @default false
     */
    enableEmbedded?: boolean;
    /**
     * Allow users to switch to an unsupported chain.
     * @default false
     */
    allowUnsupportedChain?: boolean;
    /**
     * Default account types for each namespace.
     * @default "{ bip122: 'payment', eip155: 'smartAccount', polkadot: 'eoa', solana: 'eoa' }"
     */
    defaultAccountTypes: PreferredAccountTypes;
    /**
     * Allows users to indicate if they want to handle the WC connection themselves.
     * @default false
     * @see https://docs.reown.com/appkit/react/core/options#manualwccontrol
     */
    manualWCControl?: boolean;
    /**
     * Custom Universal Provider configuration to override the default one.
     * If `methods` is provided, it will override the default methods.
     * If `chains` is provided, it will override the default chains.
     * If `events` is provided, it will override the default events.
     * If `rpcMap` is provided, it will override the default rpcMap.
     * If `defaultChain` is provided, it will override the default defaultChain.
     * @default undefined
     */
    universalProviderConfigOverride?: {
        methods?: Record<string, string[]>;
        chains?: Record<string, string[]>;
        events?: Record<string, string[]>;
        rpcMap?: Record<string, string>;
        defaultChain?: string;
    };
    /**
     * Enable or disable the network switching functionality in the modal.
     * @default true
     */
    enableNetworkSwitch?: boolean;
}
export interface OptionsControllerStateInternal {
    sdkType: 'appkit';
    sdkVersion: SdkVersion;
    isSiweEnabled?: boolean;
    isUniversalProvider?: boolean;
    hasMultipleAddresses?: boolean;
    remoteFeatures?: RemoteFeatures;
}
type StateKey = keyof OptionsControllerStatePublic | keyof OptionsControllerStateInternal;
type OptionsControllerState = OptionsControllerStatePublic & OptionsControllerStateInternal;
export declare const OptionsController: {
    state: OptionsControllerState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: OptionsControllerState[K]) => void): () => void;
    setOptions(options: OptionsControllerState): void;
    setRemoteFeatures(remoteFeatures: OptionsControllerState["remoteFeatures"]): void;
    setFeatures(features: OptionsControllerState["features"] | undefined): void;
    setProjectId(projectId: OptionsControllerState["projectId"]): void;
    setCustomRpcUrls(customRpcUrls: OptionsControllerState["customRpcUrls"]): void;
    setAllWallets(allWallets: OptionsControllerState["allWallets"]): void;
    setIncludeWalletIds(includeWalletIds: OptionsControllerState["includeWalletIds"]): void;
    setExcludeWalletIds(excludeWalletIds: OptionsControllerState["excludeWalletIds"]): void;
    setFeaturedWalletIds(featuredWalletIds: OptionsControllerState["featuredWalletIds"]): void;
    setTokens(tokens: OptionsControllerState["tokens"]): void;
    setTermsConditionsUrl(termsConditionsUrl: OptionsControllerState["termsConditionsUrl"]): void;
    setPrivacyPolicyUrl(privacyPolicyUrl: OptionsControllerState["privacyPolicyUrl"]): void;
    setCustomWallets(customWallets: OptionsControllerState["customWallets"]): void;
    setIsSiweEnabled(isSiweEnabled: OptionsControllerState["isSiweEnabled"]): void;
    setIsUniversalProvider(isUniversalProvider: OptionsControllerState["isUniversalProvider"]): void;
    setSdkVersion(sdkVersion: OptionsControllerState["sdkVersion"]): void;
    setMetadata(metadata: OptionsControllerState["metadata"]): void;
    setDisableAppend(disableAppend: OptionsControllerState["disableAppend"]): void;
    setEIP6963Enabled(enableEIP6963: OptionsControllerState["enableEIP6963"]): void;
    setDebug(debug: OptionsControllerState["debug"]): void;
    setEnableWalletConnect(enableWalletConnect: OptionsControllerState["enableWalletConnect"]): void;
    setEnableWalletGuide(enableWalletGuide: OptionsControllerState["enableWalletGuide"]): void;
    setEnableAuthLogger(enableAuthLogger: OptionsControllerState["enableAuthLogger"]): void;
    setEnableWallets(enableWallets: OptionsControllerState["enableWallets"]): void;
    setPreferUniversalLinks(preferUniversalLinks: OptionsControllerState["experimental_preferUniversalLinks"]): void;
    setHasMultipleAddresses(hasMultipleAddresses: OptionsControllerState["hasMultipleAddresses"]): void;
    setSIWX(siwx: OptionsControllerState["siwx"]): void;
    setConnectMethodsOrder(connectMethodsOrder: ConnectMethod[]): void;
    setWalletFeaturesOrder(walletFeaturesOrder: WalletFeature[]): void;
    setSocialsOrder(socialsOrder: SocialProvider[]): void;
    setCollapseWallets(collapseWallets: boolean): void;
    setEnableEmbedded(enableEmbedded: OptionsControllerState["enableEmbedded"]): void;
    setAllowUnsupportedChain(allowUnsupportedChain: OptionsControllerState["allowUnsupportedChain"]): void;
    setManualWCControl(manualWCControl: OptionsControllerState["manualWCControl"]): void;
    setEnableNetworkSwitch(enableNetworkSwitch: OptionsControllerState["enableNetworkSwitch"]): void;
    setDefaultAccountTypes(defaultAccountType?: Partial<OptionsControllerState["defaultAccountTypes"]>): void;
    setUniversalProviderConfigOverride(universalProviderConfigOverride: OptionsControllerState["universalProviderConfigOverride"]): void;
    getUniversalProviderConfigOverride(): {
        methods?: Record<string, string[]>;
        chains?: Record<string, string[]>;
        events?: Record<string, string[]>;
        rpcMap?: Record<string, string>;
        defaultChain?: string;
    } | undefined;
    getSnapshot(): {
        readonly allWallets?: "SHOW" | "HIDE" | "ONLY_MOBILE"
        /**
         * The project ID for the AppKit. You can find or create your project ID in the Cloud.
         * @see https://cloud.walletconnect.com/
         */
         | undefined;
        readonly projectId: ProjectId;
        readonly customRpcUrls?: {
            readonly [x: `eip155:${string}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `eip155:${number}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `solana:${string}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `solana:${number}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `polkadot:${string}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `polkadot:${number}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `bip122:${string}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `bip122:${number}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `cosmos:${string}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
            readonly [x: `cosmos:${number}`]: readonly {
                readonly url: string;
                readonly config?: {
                    readonly batch?: boolean | {
                        readonly batchSize?: number | undefined | undefined;
                        readonly wait?: number | undefined | undefined;
                    } | undefined;
                    readonly fetchOptions?: {
                        readonly headers?: readonly (readonly [string, string])[] | {
                            readonly [x: string]: string;
                        } | {
                            readonly append: (name: string, value: string) => void;
                            readonly delete: (name: string) => void;
                            readonly get: (name: string) => string | null;
                            readonly getSetCookie: () => string[];
                            readonly has: (name: string) => boolean;
                            readonly set: (name: string, value: string) => void;
                            readonly forEach: (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any) => void;
                            readonly entries: () => HeadersIterator<[string, string]>;
                            readonly keys: () => HeadersIterator<string>;
                            readonly values: () => HeadersIterator<string>;
                            readonly [Symbol.iterator]: () => HeadersIterator<[string, string]>;
                        } | undefined;
                        readonly signal?: {
                            readonly aborted: boolean;
                            readonly onabort: ((this: AbortSignal, ev: Event) => any) | null;
                            readonly reason: any;
                            readonly throwIfAborted: {
                                (): void;
                                (): void;
                                (): void;
                            };
                            readonly addEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                            };
                            readonly removeEventListener: {
                                <K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                                (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                            };
                            readonly dispatchEvent: (event: Event) => boolean;
                        } | null | undefined;
                        readonly cache?: RequestCache | undefined;
                        readonly method?: string | undefined;
                        readonly redirect?: RequestRedirect | undefined;
                        readonly window?: null | undefined;
                        readonly referrerPolicy?: ReferrerPolicy | undefined;
                        readonly credentials?: RequestCredentials | undefined;
                        readonly integrity?: string | undefined;
                        readonly keepalive?: boolean | undefined;
                        readonly mode?: RequestMode | undefined;
                        readonly priority?: RequestPriority | undefined;
                        readonly referrer?: string | undefined;
                    } | undefined;
                    readonly onFetchRequest?: ((request: Request, init: RequestInit) => import("viem").MaybePromise<void | undefined | (RequestInit & {
                        url?: string | undefined;
                    })>) | undefined;
                    readonly onFetchResponse?: ((response: Response) => Promise<void> | void) | undefined;
                    readonly key?: string | undefined;
                    readonly methods?: {
                        readonly include?: readonly string[] | undefined;
                        readonly exclude?: undefined;
                    } | {
                        readonly exclude?: readonly string[] | undefined;
                        readonly include?: undefined;
                    } | undefined;
                    readonly name?: string | undefined;
                    readonly raw?: boolean | undefined;
                    readonly retryCount?: number | undefined;
                    readonly retryDelay?: number | undefined;
                    readonly rpcSchema?: readonly {
                        readonly Method: string;
                        readonly Parameters?: unknown | undefined;
                        readonly ReturnType: unknown;
                    }[] | undefined;
                    readonly timeout?: number | undefined;
                } | undefined;
            }[];
        } | undefined;
        readonly featuredWalletIds?: readonly string[] | undefined;
        readonly includeWalletIds?: readonly string[] | undefined;
        readonly excludeWalletIds?: readonly string[] | undefined;
        readonly tokens?: {
            readonly [x: `eip155:${string}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `eip155:${number}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `solana:${string}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `solana:${number}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `polkadot:${string}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `polkadot:${number}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `bip122:${string}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `bip122:${number}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `cosmos:${string}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
            readonly [x: `cosmos:${number}`]: {
                readonly address: string;
                readonly image?: string | undefined;
            };
        } | undefined;
        readonly customWallets?: readonly {
            readonly id: string;
            readonly name: string;
            readonly image_url?: string | undefined;
            readonly homepage?: string | undefined;
            readonly mobile_link?: string | null | undefined;
            readonly desktop_link?: string | null | undefined;
            readonly webapp_link?: string | null | undefined;
            readonly app_store?: string | null | undefined;
            readonly play_store?: string | null | undefined;
        }[] | undefined;
        readonly termsConditionsUrl?: string
        /**
         * You can add an url for the privacy policy link.
         * @default undefined
         */
         | undefined;
        readonly privacyPolicyUrl?: string
        /**
         * Set of fields that related to your project which will be used to populate the metadata of the modal.
         * @default {}
         */
         | undefined;
        readonly metadata?: {
            readonly name: string;
            readonly description: string;
            readonly url: string;
            readonly icons: readonly string[];
        } | undefined;
        readonly disableAppend?: boolean
        /**
         * Enable or disable the all the wallet options (injected, Coinbase, QR, etc.). This is useful if you want to use only email and socials.
         * @default true
         */
         | undefined;
        readonly enableWallets?: boolean
        /**
         * Enable or disable the EIP6963 feature.
         * @default false
         */
         | undefined;
        readonly enableEIP6963?: boolean
        /**
         * Enable or disable the Coinbase wallet.
         * @default true
         */
         | undefined;
        readonly enableCoinbase?: boolean
        /**
         * Enable or disable the Injected wallet.
         * @default true
         */
         | undefined;
        readonly enableInjected?: boolean
        /**
         * Enable or disable the WalletConnect QR code.
         * @default true
         */
         | undefined;
        readonly enableWalletConnect?: boolean
        /**
         * Enable or disable the wallet guide footer in AppKit if you have email or social login configured.
         * @default true
         */
         | undefined;
        readonly enableWalletGuide?: boolean
        /**
         * Enable or disable logs from email/social login.
         * @default true
         */
         | undefined;
        readonly enableAuthLogger?: boolean
        /**
         * Enable or disable Universal Links to open the wallets as default option instead of Deep Links.
         * @default true
         */
         | undefined;
        readonly experimental_preferUniversalLinks?: boolean
        /**
         * Enable or disable debug mode. This is useful if you want to see UI alerts when debugging.
         * @default true
         */
         | undefined;
        readonly debug?: boolean
        /**
         * Features configuration object.
         * @default { swaps: true, onramp: true, email: true, socials: ['google', 'x', 'discord', 'farcaster', 'github', 'apple', 'facebook'], history: true, analytics: true, allWallets: true }
         * @see https://docs.reown.com/appkit/react/core/options#features
         */
         | undefined;
        readonly features?: {
            readonly swaps?: boolean | undefined;
            readonly onramp?: boolean | undefined;
            readonly receive?: boolean | undefined;
            readonly send?: boolean | undefined;
            readonly email?: boolean | undefined;
            readonly emailShowWallets?: boolean | undefined;
            readonly socials?: false | readonly SocialProvider[] | undefined;
            readonly history?: boolean | undefined;
            readonly analytics?: boolean | undefined;
            readonly allWallets?: boolean | undefined;
            readonly smartSessions?: boolean | undefined;
            readonly legalCheckbox?: boolean | undefined;
            readonly connectorTypeOrder?: readonly import("../utils/TypeUtil.js").ConnectorTypeOrder[] | undefined;
            readonly connectMethodsOrder?: readonly ConnectMethod[] | undefined;
            readonly walletFeaturesOrder?: readonly WalletFeature[] | undefined;
            readonly collapseWallets?: boolean | undefined;
            readonly pay?: boolean | undefined;
        } | undefined;
        readonly siwx?: {
            readonly createMessage: (input: import("../utils/SIWXUtil.js").SIWXMessage.Input) => Promise<import("../utils/SIWXUtil.js").SIWXMessage>;
            readonly addSession: (session: import("../utils/SIWXUtil.js").SIWXSession) => Promise<void>;
            readonly revokeSession: (chainId: CaipNetworkId, address: string) => Promise<void>;
            readonly setSessions: (sessions: import("../utils/SIWXUtil.js").SIWXSession[]) => Promise<void>;
            readonly getSessions: (chainId: CaipNetworkId, address: string) => Promise<import("../utils/SIWXUtil.js").SIWXSession[]>;
            readonly getRequired?: (() => boolean) | undefined;
        } | undefined;
        readonly enableEmbedded?: boolean
        /**
         * Allow users to switch to an unsupported chain.
         * @default false
         */
         | undefined;
        readonly allowUnsupportedChain?: boolean
        /**
         * Default account types for each namespace.
         * @default "{ bip122: 'payment', eip155: 'smartAccount', polkadot: 'eoa', solana: 'eoa' }"
         */
         | undefined;
        readonly defaultAccountTypes: {
            readonly eip155?: "smartAccount" | "eoa" | undefined;
            readonly solana?: "eoa" | undefined;
            readonly bip122?: "payment" | "ordinal" | "stx" | undefined;
            readonly polkadot?: "eoa" | undefined;
            readonly cosmos?: "eoa" | undefined;
        };
        readonly manualWCControl?: boolean
        /**
         * Custom Universal Provider configuration to override the default one.
         * If `methods` is provided, it will override the default methods.
         * If `chains` is provided, it will override the default chains.
         * If `events` is provided, it will override the default events.
         * If `rpcMap` is provided, it will override the default rpcMap.
         * If `defaultChain` is provided, it will override the default defaultChain.
         * @default undefined
         */
         | undefined;
        readonly universalProviderConfigOverride?: {
            readonly methods?: {
                readonly [x: string]: readonly string[];
            } | undefined;
            readonly chains?: {
                readonly [x: string]: readonly string[];
            } | undefined;
            readonly events?: {
                readonly [x: string]: readonly string[];
            } | undefined;
            readonly rpcMap?: {
                readonly [x: string]: string;
            } | undefined;
            readonly defaultChain?: string | undefined;
        } | undefined;
        readonly enableNetworkSwitch?: boolean | undefined;
        readonly sdkType: "appkit";
        readonly sdkVersion: SdkVersion;
        readonly isSiweEnabled?: boolean | undefined;
        readonly isUniversalProvider?: boolean | undefined;
        readonly hasMultipleAddresses?: boolean | undefined;
        readonly remoteFeatures?: {
            readonly swaps?: false | readonly "1inch"[] | undefined;
            readonly onramp?: false | readonly import("@reown/appkit-common").OnRampProvider[] | undefined;
            readonly email?: boolean | undefined;
            readonly socials?: false | readonly SocialProvider[] | undefined;
            readonly activity?: boolean | undefined;
            readonly reownBranding?: boolean | undefined;
        } | undefined;
    };
};
export {};

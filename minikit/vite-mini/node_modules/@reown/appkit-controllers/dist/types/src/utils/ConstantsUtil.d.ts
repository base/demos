import { type ChainNamespace, type OnRampProvider, type SocialProvider, type SwapProvider } from '@reown/appkit-common';
export declare const ONRAMP_PROVIDERS: {
    label: string;
    name: string;
    feeRange: string;
    url: string;
    supportedChains: string[];
}[];
export declare const MELD_PUBLIC_KEY = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU";
export declare const ConstantsUtil: {
    FOUR_MINUTES_MS: number;
    TEN_SEC_MS: number;
    FIVE_SEC_MS: number;
    THREE_SEC_MS: number;
    ONE_SEC_MS: number;
    SECURE_SITE: string;
    SECURE_SITE_DASHBOARD: string;
    SECURE_SITE_FAVICON: string;
    RESTRICTED_TIMEZONES: string[];
    /**
     * Network name to Coinbase Pay SDK chain name map object
     * @see supported chain names on Coinbase for Pay SDK: https://github.com/coinbase/cbpay-js/blob/d4bda2c05c4d5917c8db6a05476b603546046394/src/types/onramp.ts
     */
    WC_COINBASE_PAY_SDK_CHAINS: string[];
    WC_COINBASE_PAY_SDK_FALLBACK_CHAIN: string;
    WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP: {
        Ethereum: string;
        'Arbitrum One': string;
        Polygon: string;
        Berachain: string;
        Avalanche: string;
        'OP Mainnet': string;
        Celo: string;
        Base: string;
    };
    WC_COINBASE_ONRAMP_APP_ID: string;
    SWAP_SUGGESTED_TOKENS: string[];
    SWAP_POPULAR_TOKENS: string[];
    BALANCE_SUPPORTED_CHAINS: ChainNamespace[];
    SWAP_SUPPORTED_NETWORKS: string[];
    NAMES_SUPPORTED_CHAIN_NAMESPACES: ChainNamespace[];
    ONRAMP_SUPPORTED_CHAIN_NAMESPACES: ChainNamespace[];
    ACTIVITY_ENABLED_CHAIN_NAMESPACES: ChainNamespace[];
    NATIVE_TOKEN_ADDRESS: {
        readonly eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
        readonly solana: "So11111111111111111111111111111111111111111";
        readonly polkadot: "0x";
        readonly bip122: "0x";
        readonly cosmos: "0x";
    };
    CONVERT_SLIPPAGE_TOLERANCE: number;
    CONNECT_LABELS: {
        MOBILE: string;
        WEB: string;
    };
    SEND_SUPPORTED_NAMESPACES: ChainNamespace[];
    DEFAULT_REMOTE_FEATURES: {
        swaps: SwapProvider[];
        onramp: OnRampProvider[];
        email: boolean;
        socials: SocialProvider[];
        activity: boolean;
        reownBranding: boolean;
    };
    DEFAULT_REMOTE_FEATURES_DISABLED: {
        readonly email: false;
        readonly socials: false;
        readonly swaps: false;
        readonly onramp: false;
        readonly activity: false;
        readonly reownBranding: false;
    };
    DEFAULT_FEATURES: {
        receive: true;
        send: true;
        emailShowWallets: true;
        connectorTypeOrder: ("walletConnect" | "recent" | "injected" | "featured" | "custom" | "external" | "recommended")[];
        analytics: true;
        allWallets: true;
        legalCheckbox: false;
        smartSessions: false;
        collapseWallets: false;
        walletFeaturesOrder: ("swaps" | "onramp" | "receive" | "send")[];
        connectMethodsOrder: undefined;
        pay: false;
    };
    DEFAULT_SOCIALS: SocialProvider[];
    DEFAULT_ACCOUNT_TYPES: {
        readonly bip122: "payment";
        readonly eip155: "smartAccount";
        readonly polkadot: "eoa";
        readonly solana: "eoa";
    };
    ADAPTER_TYPES: {
        UNIVERSAL: string;
        SOLANA: string;
        WAGMI: string;
        ETHERS: string;
        ETHERS5: string;
        BITCOIN: string;
    };
};

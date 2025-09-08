export declare const solanaDevnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Solscan";
            readonly url: "https://solscan.io";
        };
    };
    contracts?: {
        [x: string]: import("viem").ChainContract | {
            [sourceId: number]: import("viem").ChainContract | undefined;
        } | undefined;
        ensRegistry?: import("viem").ChainContract | undefined;
        ensUniversalResolver?: import("viem").ChainContract | undefined;
        multicall3?: import("viem").ChainContract | undefined;
        universalSignatureVerifier?: import("viem").ChainContract | undefined;
    } | undefined;
    ensTlds?: readonly string[] | undefined;
    name: "Solana Devnet";
    nativeCurrency: {
        readonly name: "Solana";
        readonly symbol: "SOL";
        readonly decimals: 9;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.walletconnect.org/v1"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
    id: "EtWTRABZaYq6iMfeYKouRu166VU2xqa1";
    chainNamespace: "solana";
    caipNetworkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1";
    assets?: {
        imageId: string | undefined;
        imageUrl: string | undefined;
    } | undefined;
    readonly network: "solana-devnet";
    readonly deprecatedCaipNetworkId: "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K";
};

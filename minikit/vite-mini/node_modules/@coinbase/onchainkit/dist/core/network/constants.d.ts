export declare const POST_METHOD = "POST";
export declare const JSON_HEADERS: {
    'Content-Type': string;
    'OnchainKit-Version': string;
};
export declare const CONTEXT_HEADER = "OnchainKit-Context";
export declare const JSON_RPC_VERSION = "2.0";
/**
 * Internal - The context where the request originated
 *
 * @enum {string}
 * @readonly
 */
export declare enum RequestContext {
    API = "api",
    Buy = "buy",
    Checkout = "checkout",
    Hook = "hook",
    NFT = "nft",
    Swap = "swap",
    Wallet = "wallet"
}
//# sourceMappingURL=constants.d.ts.map
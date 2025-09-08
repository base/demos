import type { Page } from './common';
export declare enum RPC_AUTHENTICATION {
    API_KEY_PATH = "API_KEY_PATH",
    NO_AUTHENTICATION = "NO_AUTHENTICATION",
    UNKNOWN = "UNKNOWN"
}
export type RpcUri = {
    authentication: RPC_AUTHENTICATION;
    value: string;
};
export type BlockExplorerUriTemplate = {
    address: string;
    txHash: string;
    api: string;
};
export type NativeCurrency = {
    name: string;
    symbol: string;
    decimals: number;
    logoUri: string;
};
export type Theme = {
    textColor: string;
    backgroundColor: string;
};
export declare enum GAS_PRICE_TYPE {
    ORACLE = "ORACLE",
    FIXED = "FIXED",
    FIXED_1559 = "FIXED1559",
    UNKNOWN = "UNKNOWN"
}
export type GasPriceOracle = {
    type: GAS_PRICE_TYPE.ORACLE;
    uri: string;
    gasParameter: string;
    gweiFactor: string;
};
export type GasPriceFixed = {
    type: GAS_PRICE_TYPE.FIXED;
    weiValue: string;
};
export type GasPriceFixedEIP1559 = {
    type: GAS_PRICE_TYPE.FIXED_1559;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
};
export type GasPriceUnknown = {
    type: GAS_PRICE_TYPE.UNKNOWN;
};
export type GasPrice = (GasPriceOracle | GasPriceFixed | GasPriceFixedEIP1559 | GasPriceUnknown)[];
export declare enum FEATURES {
    ERC721 = "ERC721",
    SAFE_APPS = "SAFE_APPS",
    CONTRACT_INTERACTION = "CONTRACT_INTERACTION",
    DOMAIN_LOOKUP = "DOMAIN_LOOKUP",
    SPENDING_LIMIT = "SPENDING_LIMIT",
    EIP1559 = "EIP1559",
    SAFE_TX_GAS_OPTIONAL = "SAFE_TX_GAS_OPTIONAL",
    TX_SIMULATION = "TX_SIMULATION",
    EIP1271 = "EIP1271"
}
export type ChainInfo = {
    transactionService: string;
    chainId: string;
    chainName: string;
    shortName: string;
    l2: boolean;
    isTestnet: boolean;
    description: string;
    chainLogoUri: string | null;
    rpcUri: RpcUri;
    safeAppsRpcUri: RpcUri;
    publicRpcUri: RpcUri;
    blockExplorerUriTemplate: BlockExplorerUriTemplate;
    nativeCurrency: NativeCurrency;
    theme: Theme;
    ensRegistryAddress?: string | null;
    gasPrice: GasPrice;
    disabledWallets: string[];
    features: FEATURES[];
    balancesProvider: {
        chainName: string | null;
        enabled: boolean;
    };
    contractAddresses: {
        safeSingletonAddress: `0x${string}` | null;
        safeProxyFactoryAddress: `0x${string}` | null;
        multiSendAddress: `0x${string}` | null;
        multiSendCallOnlyAddress: `0x${string}` | null;
        fallbackHandlerAddress: `0x${string}` | null;
        signMessageLibAddress: `0x${string}` | null;
        createCallAddress: `0x${string}` | null;
        simulateTxAccessorAddress: `0x${string}` | null;
        safeWebAuthnSignerFactoryAddress: `0x${string}` | null;
    };
    recommendedMasterCopyVersion: string | null;
};
export type ChainListResponse = Page<ChainInfo>;
export type ChainIndexingStatus = {
    lastSync: number;
    synced: boolean;
};

import type { ChainNamespace } from './TypeUtil.js';
export declare const ConstantsUtil: {
    readonly WC_NAME_SUFFIX: ".reown.id";
    readonly WC_NAME_SUFFIX_LEGACY: ".wcn.id";
    readonly BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org";
    readonly PULSE_API_URL: "https://pulse.walletconnect.org";
    readonly W3M_API_URL: "https://api.web3modal.org";
    readonly CONNECTOR_ID: {
        readonly WALLET_CONNECT: "walletConnect";
        readonly INJECTED: "injected";
        readonly WALLET_STANDARD: "announced";
        readonly COINBASE: "coinbaseWallet";
        readonly COINBASE_SDK: "coinbaseWalletSDK";
        readonly SAFE: "safe";
        readonly LEDGER: "ledger";
        readonly OKX: "okx";
        readonly EIP6963: "eip6963";
        readonly AUTH: "ID_AUTH";
    };
    readonly CONNECTOR_NAMES: {
        readonly AUTH: "Auth";
    };
    readonly AUTH_CONNECTOR_SUPPORTED_CHAINS: ChainNamespace[];
    readonly LIMITS: {
        readonly PENDING_TRANSACTIONS: 99;
    };
    readonly CHAIN: {
        readonly EVM: "eip155";
        readonly SOLANA: "solana";
        readonly POLKADOT: "polkadot";
        readonly BITCOIN: "bip122";
    };
    readonly CHAIN_NAME_MAP: {
        readonly eip155: "EVM Networks";
        readonly solana: "Solana";
        readonly polkadot: "Polkadot";
        readonly bip122: "Bitcoin";
        readonly cosmos: "Cosmos";
    };
    readonly ADAPTER_TYPES: {
        readonly BITCOIN: "bitcoin";
        readonly SOLANA: "solana";
        readonly WAGMI: "wagmi";
        readonly ETHERS: "ethers";
        readonly ETHERS5: "ethers5";
    };
    readonly USDT_CONTRACT_ADDRESSES: readonly ["0xdac17f958d2ee523a2206206994597c13d831ec7", "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7", "0x919C1c267BC06a7039e03fcc2eF738525769109c", "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e", "0x55d398326f99059fF775485246999027B3197955", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"];
    readonly HTTP_STATUS_CODES: {
        readonly SERVICE_UNAVAILABLE: 503;
        readonly FORBIDDEN: 403;
    };
    readonly UNSUPPORTED_NETWORK_NAME: "Unknown Network";
    readonly SECURE_SITE_SDK_ORIGIN: string;
};

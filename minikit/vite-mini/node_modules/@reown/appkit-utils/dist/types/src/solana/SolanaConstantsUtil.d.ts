import { PublicKey } from '@solana/web3.js';
import { type CaipNetwork } from '@reown/appkit-common';
export declare const SolConstantsUtil: {
    readonly UNIVERSAL_PROVIDER_RELAY_URL: "wss://relay.walletconnect.org";
    readonly HASH_PREFIX: "SPL Name Service";
    readonly ROOT_DOMAIN_ACCOUNT: PublicKey;
    readonly NAME_PROGRAM_ID: PublicKey;
    readonly REVERSE_LOOKUP_CLASS: PublicKey;
    readonly DEFAULT_CHAIN: CaipNetwork;
    readonly CHAIN_IDS: {
        readonly Mainnet: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";
        readonly Devnet: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1";
        readonly Testnet: "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z";
        readonly Deprecated_Mainnet: "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ";
        readonly Deprecated_Devnet: "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K";
    };
    readonly LAMPORTS_PER_SOL: 1000000000;
};

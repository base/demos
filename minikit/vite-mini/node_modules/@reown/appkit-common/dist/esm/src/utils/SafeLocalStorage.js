export const SafeLocalStorageKeys = {
    WALLET_ID: '@appkit/wallet_id',
    WALLET_NAME: '@appkit/wallet_name',
    SOLANA_WALLET: '@appkit/solana_wallet',
    SOLANA_CAIP_CHAIN: '@appkit/solana_caip_chain',
    ACTIVE_CAIP_NETWORK_ID: '@appkit/active_caip_network_id',
    CONNECTED_SOCIAL: '@appkit/connected_social',
    CONNECTED_SOCIAL_USERNAME: '@appkit-wallet/SOCIAL_USERNAME',
    RECENT_WALLETS: '@appkit/recent_wallets',
    DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',
    ACTIVE_NAMESPACE: '@appkit/active_namespace',
    CONNECTED_NAMESPACES: '@appkit/connected_namespaces',
    CONNECTION_STATUS: '@appkit/connection_status',
    SIWX_AUTH_TOKEN: '@appkit/siwx-auth-token',
    SIWX_NONCE_TOKEN: '@appkit/siwx-nonce-token',
    TELEGRAM_SOCIAL_PROVIDER: '@appkit/social_provider',
    NATIVE_BALANCE_CACHE: '@appkit/native_balance_cache',
    PORTFOLIO_CACHE: '@appkit/portfolio_cache',
    ENS_CACHE: '@appkit/ens_cache',
    IDENTITY_CACHE: '@appkit/identity_cache',
    PREFERRED_ACCOUNT_TYPES: '@appkit/preferred_account_types',
    CONNECTIONS: '@appkit/connections'
};
export function getSafeConnectorIdKey(namespace) {
    if (!namespace) {
        throw new Error('Namespace is required for CONNECTED_CONNECTOR_ID');
    }
    return `@appkit/${namespace}:connected_connector_id`;
}
export const SafeLocalStorage = {
    setItem(key, value) {
        if (isSafe() && value !== undefined) {
            localStorage.setItem(key, value);
        }
    },
    getItem(key) {
        if (isSafe()) {
            return localStorage.getItem(key) || undefined;
        }
        return undefined;
    },
    removeItem(key) {
        if (isSafe()) {
            localStorage.removeItem(key);
        }
    },
    clear() {
        if (isSafe()) {
            localStorage.clear();
        }
    }
};
export function isSafe() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}
//# sourceMappingURL=SafeLocalStorage.js.map
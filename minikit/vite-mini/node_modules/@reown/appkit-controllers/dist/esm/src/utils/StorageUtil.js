/* eslint-disable no-console */
import { SafeLocalStorage, SafeLocalStorageKeys, getSafeConnectorIdKey } from '@reown/appkit-common';
// -- Utility -----------------------------------------------------------------
export const StorageUtil = {
    // Cache expiry in milliseconds
    cacheExpiry: {
        portfolio: 30000,
        nativeBalance: 30000,
        ens: 300000,
        identity: 300000
    },
    isCacheExpired(timestamp, cacheExpiry) {
        return Date.now() - timestamp > cacheExpiry;
    },
    getActiveNetworkProps() {
        const namespace = StorageUtil.getActiveNamespace();
        const caipNetworkId = StorageUtil.getActiveCaipNetworkId();
        const stringChainId = caipNetworkId ? caipNetworkId.split(':')[1] : undefined;
        // eslint-disable-next-line no-nested-ternary
        const chainId = stringChainId
            ? isNaN(Number(stringChainId))
                ? stringChainId
                : Number(stringChainId)
            : undefined;
        return {
            namespace,
            caipNetworkId,
            chainId
        };
    },
    setWalletConnectDeepLink({ name, href }) {
        try {
            SafeLocalStorage.setItem(SafeLocalStorageKeys.DEEPLINK_CHOICE, JSON.stringify({ href, name }));
        }
        catch {
            console.info('Unable to set WalletConnect deep link');
        }
    },
    getWalletConnectDeepLink() {
        try {
            const deepLink = SafeLocalStorage.getItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
            if (deepLink) {
                return JSON.parse(deepLink);
            }
        }
        catch {
            console.info('Unable to get WalletConnect deep link');
        }
        return undefined;
    },
    deleteWalletConnectDeepLink() {
        try {
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.DEEPLINK_CHOICE);
        }
        catch {
            console.info('Unable to delete WalletConnect deep link');
        }
    },
    setActiveNamespace(namespace) {
        try {
            SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE, namespace);
        }
        catch {
            console.info('Unable to set active namespace');
        }
    },
    setActiveCaipNetworkId(caipNetworkId) {
        try {
            SafeLocalStorage.setItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID, caipNetworkId);
            StorageUtil.setActiveNamespace(caipNetworkId.split(':')[0]);
        }
        catch {
            console.info('Unable to set active caip network id');
        }
    },
    getActiveCaipNetworkId() {
        try {
            return SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
        }
        catch {
            console.info('Unable to get active caip network id');
            return undefined;
        }
    },
    deleteActiveCaipNetworkId() {
        try {
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
        }
        catch {
            console.info('Unable to delete active caip network id');
        }
    },
    deleteConnectedConnectorId(namespace) {
        try {
            const key = getSafeConnectorIdKey(namespace);
            SafeLocalStorage.removeItem(key);
        }
        catch {
            console.info('Unable to delete connected connector id');
        }
    },
    setAppKitRecent(wallet) {
        try {
            const recentWallets = StorageUtil.getRecentWallets();
            const exists = recentWallets.find(w => w.id === wallet.id);
            if (!exists) {
                recentWallets.unshift(wallet);
                if (recentWallets.length > 2) {
                    recentWallets.pop();
                }
                SafeLocalStorage.setItem(SafeLocalStorageKeys.RECENT_WALLETS, JSON.stringify(recentWallets));
            }
        }
        catch {
            console.info('Unable to set AppKit recent');
        }
    },
    getRecentWallets() {
        try {
            const recent = SafeLocalStorage.getItem(SafeLocalStorageKeys.RECENT_WALLETS);
            return recent ? JSON.parse(recent) : [];
        }
        catch {
            console.info('Unable to get AppKit recent');
        }
        return [];
    },
    setConnectedConnectorId(namespace, connectorId) {
        try {
            const key = getSafeConnectorIdKey(namespace);
            SafeLocalStorage.setItem(key, connectorId);
        }
        catch {
            console.info('Unable to set Connected Connector Id');
        }
    },
    getActiveNamespace() {
        try {
            const activeNamespace = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_NAMESPACE);
            return activeNamespace;
        }
        catch {
            console.info('Unable to get active namespace');
        }
        return undefined;
    },
    getConnectedConnectorId(namespace) {
        if (!namespace) {
            return undefined;
        }
        try {
            const key = getSafeConnectorIdKey(namespace);
            return SafeLocalStorage.getItem(key);
        }
        catch (e) {
            console.info('Unable to get connected connector id in namespace ', namespace);
        }
        return undefined;
    },
    setConnectedSocialProvider(socialProvider) {
        try {
            SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_SOCIAL, socialProvider);
        }
        catch {
            console.info('Unable to set connected social provider');
        }
    },
    getConnectedSocialProvider() {
        try {
            return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
        }
        catch {
            console.info('Unable to get connected social provider');
        }
        return undefined;
    },
    deleteConnectedSocialProvider() {
        try {
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.CONNECTED_SOCIAL);
        }
        catch {
            console.info('Unable to delete connected social provider');
        }
    },
    getConnectedSocialUsername() {
        try {
            return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_SOCIAL_USERNAME);
        }
        catch {
            console.info('Unable to get connected social username');
        }
        return undefined;
    },
    getStoredActiveCaipNetworkId() {
        const storedCaipNetworkId = SafeLocalStorage.getItem(SafeLocalStorageKeys.ACTIVE_CAIP_NETWORK_ID);
        const networkId = storedCaipNetworkId?.split(':')?.[1];
        return networkId;
    },
    setConnectionStatus(status) {
        try {
            SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTION_STATUS, status);
        }
        catch {
            console.info('Unable to set connection status');
        }
    },
    getConnectionStatus() {
        try {
            return SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTION_STATUS);
        }
        catch {
            return undefined;
        }
    },
    getConnectedNamespaces() {
        try {
            const namespaces = SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES);
            if (!namespaces?.length) {
                return [];
            }
            return namespaces.split(',');
        }
        catch {
            return [];
        }
    },
    setConnectedNamespaces(namespaces) {
        try {
            const uniqueNamespaces = Array.from(new Set(namespaces));
            SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTED_NAMESPACES, uniqueNamespaces.join(','));
        }
        catch {
            console.info('Unable to set namespaces in storage');
        }
    },
    addConnectedNamespace(namespace) {
        try {
            const namespaces = StorageUtil.getConnectedNamespaces();
            if (!namespaces.includes(namespace)) {
                namespaces.push(namespace);
                StorageUtil.setConnectedNamespaces(namespaces);
            }
        }
        catch {
            console.info('Unable to add connected namespace');
        }
    },
    removeConnectedNamespace(namespace) {
        try {
            const namespaces = StorageUtil.getConnectedNamespaces();
            const index = namespaces.indexOf(namespace);
            if (index > -1) {
                namespaces.splice(index, 1);
                StorageUtil.setConnectedNamespaces(namespaces);
            }
        }
        catch {
            console.info('Unable to remove connected namespace');
        }
    },
    getTelegramSocialProvider() {
        try {
            return SafeLocalStorage.getItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
        }
        catch {
            console.info('Unable to get telegram social provider');
            return null;
        }
    },
    setTelegramSocialProvider(socialProvider) {
        try {
            SafeLocalStorage.setItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER, socialProvider);
        }
        catch {
            console.info('Unable to set telegram social provider');
        }
    },
    removeTelegramSocialProvider() {
        try {
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.TELEGRAM_SOCIAL_PROVIDER);
        }
        catch {
            console.info('Unable to remove telegram social provider');
        }
    },
    getBalanceCache() {
        let cache = {};
        try {
            const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
            cache = result ? JSON.parse(result) : {};
        }
        catch {
            console.info('Unable to get balance cache');
        }
        return cache;
    },
    removeAddressFromBalanceCache(caipAddress) {
        try {
            const cache = StorageUtil.getBalanceCache();
            SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify({ ...cache, [caipAddress]: undefined }));
        }
        catch {
            console.info('Unable to remove address from balance cache', caipAddress);
        }
    },
    getBalanceCacheForCaipAddress(caipAddress) {
        try {
            const cache = StorageUtil.getBalanceCache();
            const balanceCache = cache[caipAddress];
            // We want to discard cache if it's older than the cache expiry
            if (balanceCache &&
                !this.isCacheExpired(balanceCache.timestamp, this.cacheExpiry.portfolio)) {
                return balanceCache.balance;
            }
            StorageUtil.removeAddressFromBalanceCache(caipAddress);
        }
        catch {
            console.info('Unable to get balance cache for address', caipAddress);
        }
        return undefined;
    },
    updateBalanceCache(params) {
        try {
            const cache = StorageUtil.getBalanceCache();
            cache[params.caipAddress] = params;
            SafeLocalStorage.setItem(SafeLocalStorageKeys.PORTFOLIO_CACHE, JSON.stringify(cache));
        }
        catch {
            console.info('Unable to update balance cache', params);
        }
    },
    getNativeBalanceCache() {
        let cache = {};
        try {
            const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
            cache = result ? JSON.parse(result) : {};
        }
        catch {
            console.info('Unable to get balance cache');
        }
        return cache;
    },
    removeAddressFromNativeBalanceCache(caipAddress) {
        try {
            const cache = StorageUtil.getBalanceCache();
            SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify({ ...cache, [caipAddress]: undefined }));
        }
        catch {
            console.info('Unable to remove address from balance cache', caipAddress);
        }
    },
    getNativeBalanceCacheForCaipAddress(caipAddress) {
        try {
            const cache = StorageUtil.getNativeBalanceCache();
            const nativeBalanceCache = cache[caipAddress];
            // We want to discard cache if it's older than the cache expiry
            if (nativeBalanceCache &&
                !this.isCacheExpired(nativeBalanceCache.timestamp, this.cacheExpiry.nativeBalance)) {
                return nativeBalanceCache;
            }
            console.info('Discarding cache for address', caipAddress);
            StorageUtil.removeAddressFromBalanceCache(caipAddress);
        }
        catch {
            console.info('Unable to get balance cache for address', caipAddress);
        }
        return undefined;
    },
    updateNativeBalanceCache(params) {
        try {
            const cache = StorageUtil.getNativeBalanceCache();
            cache[params.caipAddress] = params;
            SafeLocalStorage.setItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE, JSON.stringify(cache));
        }
        catch {
            console.info('Unable to update balance cache', params);
        }
    },
    getEnsCache() {
        let cache = {};
        try {
            const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.ENS_CACHE);
            cache = result ? JSON.parse(result) : {};
        }
        catch {
            console.info('Unable to get ens name cache');
        }
        return cache;
    },
    getEnsFromCacheForAddress(address) {
        try {
            const cache = StorageUtil.getEnsCache();
            const ensCache = cache[address];
            // We want to discard cache if it's older than the cache expiry
            if (ensCache && !this.isCacheExpired(ensCache.timestamp, this.cacheExpiry.ens)) {
                return ensCache.ens;
            }
            StorageUtil.removeEnsFromCache(address);
        }
        catch {
            console.info('Unable to get ens name from cache', address);
        }
        return undefined;
    },
    updateEnsCache(params) {
        try {
            const cache = StorageUtil.getEnsCache();
            cache[params.address] = params;
            SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify(cache));
        }
        catch {
            console.info('Unable to update ens name cache', params);
        }
    },
    removeEnsFromCache(address) {
        try {
            const cache = StorageUtil.getEnsCache();
            SafeLocalStorage.setItem(SafeLocalStorageKeys.ENS_CACHE, JSON.stringify({ ...cache, [address]: undefined }));
        }
        catch {
            console.info('Unable to remove ens name from cache', address);
        }
    },
    getIdentityCache() {
        let cache = {};
        try {
            const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.IDENTITY_CACHE);
            cache = result ? JSON.parse(result) : {};
        }
        catch {
            console.info('Unable to get identity cache');
        }
        return cache;
    },
    getIdentityFromCacheForAddress(address) {
        try {
            const cache = StorageUtil.getIdentityCache();
            const identityCache = cache[address];
            // We want to discard cache if it's older than the cache expiry
            if (identityCache &&
                !this.isCacheExpired(identityCache.timestamp, this.cacheExpiry.identity)) {
                return identityCache.identity;
            }
            StorageUtil.removeIdentityFromCache(address);
        }
        catch {
            console.info('Unable to get identity from cache', address);
        }
        return undefined;
    },
    updateIdentityCache(params) {
        try {
            const cache = StorageUtil.getIdentityCache();
            cache[params.address] = {
                identity: params.identity,
                timestamp: params.timestamp
            };
            SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify(cache));
        }
        catch {
            console.info('Unable to update identity cache', params);
        }
    },
    removeIdentityFromCache(address) {
        try {
            const cache = StorageUtil.getIdentityCache();
            SafeLocalStorage.setItem(SafeLocalStorageKeys.IDENTITY_CACHE, JSON.stringify({ ...cache, [address]: undefined }));
        }
        catch {
            console.info('Unable to remove identity from cache', address);
        }
    },
    clearAddressCache() {
        try {
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.PORTFOLIO_CACHE);
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.NATIVE_BALANCE_CACHE);
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.ENS_CACHE);
            SafeLocalStorage.removeItem(SafeLocalStorageKeys.IDENTITY_CACHE);
        }
        catch {
            console.info('Unable to clear address cache');
        }
    },
    setPreferredAccountTypes(accountTypes) {
        try {
            SafeLocalStorage.setItem(SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES, JSON.stringify(accountTypes));
        }
        catch {
            console.info('Unable to set preferred account types', accountTypes);
        }
    },
    getPreferredAccountTypes() {
        try {
            const result = SafeLocalStorage.getItem(SafeLocalStorageKeys.PREFERRED_ACCOUNT_TYPES);
            if (!result) {
                return {};
            }
            return JSON.parse(result);
        }
        catch {
            console.info('Unable to get preferred account types');
        }
        return {};
    },
    setConnections(connections, chainNamespace) {
        try {
            const newConnections = {
                ...StorageUtil.getConnections(),
                [chainNamespace]: connections
            };
            SafeLocalStorage.setItem(SafeLocalStorageKeys.CONNECTIONS, JSON.stringify(newConnections));
        }
        catch (error) {
            console.error('Unable to sync connections to storage', error);
        }
    },
    getConnections() {
        try {
            const connectionsStorage = SafeLocalStorage.getItem(SafeLocalStorageKeys.CONNECTIONS);
            if (!connectionsStorage) {
                return {};
            }
            return JSON.parse(connectionsStorage);
        }
        catch (error) {
            console.error('Unable to get connections from storage', error);
            return {};
        }
    }
};
//# sourceMappingURL=StorageUtil.js.map
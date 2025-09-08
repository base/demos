import { proxy, ref, snapshot, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { ConstantsUtil, getW3mThemeVariables } from '@reown/appkit-common';
import { MobileWalletUtil } from '../utils/MobileWallet.js';
import { StorageUtil } from '../utils/StorageUtil.js';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
import { ApiController } from './ApiController.js';
import { ChainController } from './ChainController.js';
import { OptionsController } from './OptionsController.js';
import { RouterController } from './RouterController.js';
import { ThemeController } from './ThemeController.js';
const defaultActiveConnectors = {
    eip155: undefined,
    solana: undefined,
    polkadot: undefined,
    bip122: undefined,
    cosmos: undefined
};
// -- State --------------------------------------------- //
const state = proxy({
    allConnectors: [],
    connectors: [],
    activeConnector: undefined,
    filterByNamespace: undefined,
    activeConnectorIds: { ...defaultActiveConnectors },
    filterByNamespaceMap: {
        eip155: true,
        solana: true,
        polkadot: true,
        bip122: true,
        cosmos: true
    }
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe(callback) {
        return sub(state, () => {
            callback(state);
        });
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    initialize(namespaces) {
        namespaces.forEach(namespace => {
            const connectorId = StorageUtil.getConnectedConnectorId(namespace);
            if (connectorId) {
                ConnectorController.setConnectorId(connectorId, namespace);
            }
        });
    },
    setActiveConnector(connector) {
        if (connector) {
            state.activeConnector = ref(connector);
        }
    },
    setConnectors(connectors) {
        const newConnectors = connectors.filter(newConnector => !state.allConnectors.some(existingConnector => existingConnector.id === newConnector.id &&
            ConnectorController.getConnectorName(existingConnector.name) ===
                ConnectorController.getConnectorName(newConnector.name) &&
            existingConnector.chain === newConnector.chain));
        /**
         * We are reassigning the state of the proxy to a new array of new objects, ConnectorController can cause issues. So it is better to use ref in ConnectorController case.
         * Check more about proxy on https://valtio.dev/docs/api/basic/proxy#Gotchas
         * Check more about ref on https://valtio.dev/docs/api/basic/ref
         */
        newConnectors.forEach(connector => {
            if (connector.type !== 'MULTI_CHAIN') {
                state.allConnectors.push(ref(connector));
            }
        });
        const enabledNamespaces = ConnectorController.getEnabledNamespaces();
        const connectorsFilteredByNamespaces = ConnectorController.getEnabledConnectors(enabledNamespaces);
        state.connectors = ConnectorController.mergeMultiChainConnectors(connectorsFilteredByNamespaces);
    },
    filterByNamespaces(enabledNamespaces) {
        Object.keys(state.filterByNamespaceMap).forEach(namespace => {
            state.filterByNamespaceMap[namespace] = false;
        });
        enabledNamespaces.forEach(namespace => {
            state.filterByNamespaceMap[namespace] = true;
        });
        ConnectorController.updateConnectorsForEnabledNamespaces();
    },
    filterByNamespace(namespace, enabled) {
        state.filterByNamespaceMap[namespace] = enabled;
        ConnectorController.updateConnectorsForEnabledNamespaces();
    },
    updateConnectorsForEnabledNamespaces() {
        const enabledNamespaces = ConnectorController.getEnabledNamespaces();
        const enabledConnectors = ConnectorController.getEnabledConnectors(enabledNamespaces);
        const areAllNamespacesEnabled = ConnectorController.areAllNamespacesEnabled();
        state.connectors = ConnectorController.mergeMultiChainConnectors(enabledConnectors);
        if (areAllNamespacesEnabled) {
            ApiController.clearFilterByNamespaces();
        }
        else {
            ApiController.filterByNamespaces(enabledNamespaces);
        }
    },
    getEnabledNamespaces() {
        return Object.entries(state.filterByNamespaceMap)
            .filter(([_, enabled]) => enabled)
            .map(([namespace]) => namespace);
    },
    getEnabledConnectors(enabledNamespaces) {
        return state.allConnectors.filter(connector => enabledNamespaces.includes(connector.chain));
    },
    areAllNamespacesEnabled() {
        return Object.values(state.filterByNamespaceMap).every(enabled => enabled);
    },
    mergeMultiChainConnectors(connectors) {
        const connectorsByNameMap = ConnectorController.generateConnectorMapByName(connectors);
        const mergedConnectors = [];
        connectorsByNameMap.forEach(keyConnectors => {
            const firstItem = keyConnectors[0];
            const isAuthConnector = firstItem?.id === ConstantsUtil.CONNECTOR_ID.AUTH;
            if (keyConnectors.length > 1 && firstItem) {
                mergedConnectors.push({
                    name: firstItem.name,
                    imageUrl: firstItem.imageUrl,
                    imageId: firstItem.imageId,
                    connectors: [...keyConnectors],
                    type: isAuthConnector ? 'AUTH' : 'MULTI_CHAIN',
                    // These values are just placeholders, we don't use them in multi-chain connector select screen
                    chain: 'eip155',
                    id: firstItem?.id || ''
                });
            }
            else if (firstItem) {
                mergedConnectors.push(firstItem);
            }
        });
        return mergedConnectors;
    },
    generateConnectorMapByName(connectors) {
        const connectorsByNameMap = new Map();
        connectors.forEach(connector => {
            const { name } = connector;
            const connectorName = ConnectorController.getConnectorName(name);
            if (!connectorName) {
                return;
            }
            const connectorsByName = connectorsByNameMap.get(connectorName) || [];
            const haveSameConnector = connectorsByName.find(c => c.chain === connector.chain);
            if (!haveSameConnector) {
                connectorsByName.push(connector);
            }
            connectorsByNameMap.set(connectorName, connectorsByName);
        });
        return connectorsByNameMap;
    },
    getConnectorName(name) {
        if (!name) {
            return name;
        }
        const nameOverrideMap = {
            'Trust Wallet': 'Trust'
        };
        return nameOverrideMap[name] || name;
    },
    getUniqueConnectorsByName(connectors) {
        const uniqueConnectors = [];
        connectors.forEach(c => {
            if (!uniqueConnectors.find(uc => uc.chain === c.chain)) {
                uniqueConnectors.push(c);
            }
        });
        return uniqueConnectors;
    },
    addConnector(connector) {
        if (connector.id === ConstantsUtil.CONNECTOR_ID.AUTH) {
            const authConnector = connector;
            const optionsState = snapshot(OptionsController.state);
            const themeMode = ThemeController.getSnapshot().themeMode;
            const themeVariables = ThemeController.getSnapshot().themeVariables;
            authConnector?.provider?.syncDappData?.({
                metadata: optionsState.metadata,
                sdkVersion: optionsState.sdkVersion,
                projectId: optionsState.projectId,
                sdkType: optionsState.sdkType
            });
            authConnector?.provider?.syncTheme({
                themeMode,
                themeVariables,
                w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
            });
            ConnectorController.setConnectors([connector]);
        }
        else {
            ConnectorController.setConnectors([connector]);
        }
    },
    getAuthConnector(chainNamespace) {
        const activeNamespace = chainNamespace || ChainController.state.activeChain;
        const authConnector = state.connectors.find(c => c.id === ConstantsUtil.CONNECTOR_ID.AUTH);
        if (!authConnector) {
            return undefined;
        }
        if (authConnector?.connectors?.length) {
            const connector = authConnector.connectors.find(c => c.chain === activeNamespace);
            return connector;
        }
        return authConnector;
    },
    getAnnouncedConnectorRdns() {
        return state.connectors.filter(c => c.type === 'ANNOUNCED').map(c => c.info?.rdns);
    },
    getConnectorById(id) {
        return state.allConnectors.find(c => c.id === id);
    },
    getConnector(id, rdns) {
        const connectorsByNamespace = state.allConnectors.filter(c => c.chain === ChainController.state.activeChain);
        return connectorsByNamespace.find(c => c.explorerId === id || c.info?.rdns === rdns);
    },
    syncIfAuthConnector(connector) {
        if (connector.id !== 'ID_AUTH') {
            return;
        }
        const authConnector = connector;
        const optionsState = snapshot(OptionsController.state);
        const themeMode = ThemeController.getSnapshot().themeMode;
        const themeVariables = ThemeController.getSnapshot().themeVariables;
        authConnector?.provider?.syncDappData?.({
            metadata: optionsState.metadata,
            sdkVersion: optionsState.sdkVersion,
            sdkType: optionsState.sdkType,
            projectId: optionsState.projectId
        });
        authConnector.provider.syncTheme({
            themeMode,
            themeVariables,
            w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
        });
    },
    /**
     * Returns the connectors filtered by namespace.
     * @param namespace - The namespace to filter the connectors by.
     * @returns ConnectorWithProviders[].
     */
    getConnectorsByNamespace(namespace) {
        const namespaceConnectors = state.allConnectors.filter(connector => connector.chain === namespace);
        return ConnectorController.mergeMultiChainConnectors(namespaceConnectors);
    },
    selectWalletConnector(wallet) {
        const connector = ConnectorController.getConnector(wallet.id, wallet.rdns);
        const namespace = ChainController.state.activeChain;
        MobileWalletUtil.handleMobileDeeplinkRedirect(connector?.explorerId || wallet.id, namespace);
        if (connector) {
            RouterController.push('ConnectingExternal', { connector });
        }
        else {
            RouterController.push('ConnectingWalletConnect', { wallet });
        }
    },
    /**
     * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
     * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
     * @returns ConnectorWithProviders[].
     */
    getConnectors(namespace) {
        if (namespace) {
            return ConnectorController.getConnectorsByNamespace(namespace);
        }
        return ConnectorController.mergeMultiChainConnectors(state.allConnectors);
    },
    /**
     * Sets the filter by namespace and updates the connectors.
     * @param namespace - The namespace to filter the connectors by.
     */
    setFilterByNamespace(namespace) {
        state.filterByNamespace = namespace;
        state.connectors = ConnectorController.getConnectors(namespace);
        ApiController.setFilterByNamespace(namespace);
    },
    setConnectorId(connectorId, namespace) {
        if (connectorId) {
            state.activeConnectorIds = {
                ...state.activeConnectorIds,
                [namespace]: connectorId
            };
            StorageUtil.setConnectedConnectorId(namespace, connectorId);
        }
    },
    removeConnectorId(namespace) {
        state.activeConnectorIds = {
            ...state.activeConnectorIds,
            [namespace]: undefined
        };
        StorageUtil.deleteConnectedConnectorId(namespace);
    },
    getConnectorId(namespace) {
        if (!namespace) {
            return undefined;
        }
        return state.activeConnectorIds[namespace];
    },
    isConnected(namespace) {
        if (!namespace) {
            return Object.values(state.activeConnectorIds).some(id => Boolean(id));
        }
        return Boolean(state.activeConnectorIds[namespace]);
    },
    resetConnectorIds() {
        state.activeConnectorIds = { ...defaultActiveConnectors };
    }
};
// Export the controller wrapped with our error boundary
export const ConnectorController = withErrorBoundary(controller);
//# sourceMappingURL=ConnectorController.js.map
import { proxy, subscribe as sub } from 'valtio/vanilla';
import { proxyMap, subscribeKey as subKey } from 'valtio/vanilla/utils';
import { ConstantsUtil as CommonConstantsUtil, NetworkUtil } from '@reown/appkit-common';
import { ConstantsUtil } from '../utils/ConstantsUtil.js';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
import { StorageUtil } from '../utils/StorageUtil.js';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
import { AccountController } from './AccountController.js';
import { ConnectionController } from './ConnectionController.js';
import { ConnectorController } from './ConnectorController.js';
import { EventsController } from './EventsController.js';
import { ModalController } from './ModalController.js';
import { OptionsController } from './OptionsController.js';
import { PublicStateController } from './PublicStateController.js';
import { RouterController } from './RouterController.js';
import { SendController } from './SendController.js';
// -- Constants ----------------------------------------- //
const accountState = {
    currentTab: 0,
    tokenBalance: [],
    smartAccountDeployed: false,
    addressLabels: new Map(),
    allAccounts: [],
    user: undefined
};
const networkState = {
    caipNetwork: undefined,
    supportsAllNetworks: true,
    smartAccountEnabledNetworks: []
};
// -- State --------------------------------------------- //
const state = proxy({
    chains: proxyMap(),
    activeCaipAddress: undefined,
    activeChain: undefined,
    activeCaipNetwork: undefined,
    noAdapters: false,
    universalAdapter: {
        networkControllerClient: undefined,
        connectionControllerClient: undefined
    },
    isSwitchingNamespace: false
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
    subscribeChainProp(property, callback, chain) {
        let prev = undefined;
        return sub(state.chains, () => {
            const activeChain = chain || state.activeChain;
            if (activeChain) {
                const nextValue = state.chains.get(activeChain)?.[property];
                if (prev !== nextValue) {
                    prev = nextValue;
                    callback(nextValue);
                }
            }
        });
    },
    initialize(adapters, caipNetworks, clients) {
        const { chainId: activeChainId, namespace: activeNamespace } = StorageUtil.getActiveNetworkProps();
        const activeCaipNetwork = caipNetworks?.find(network => network.id.toString() === activeChainId?.toString());
        const defaultAdapter = adapters.find(adapter => adapter?.namespace === activeNamespace);
        const adapterToActivate = defaultAdapter || adapters?.[0];
        const namespacesFromAdapters = adapters.map(a => a.namespace).filter(n => n !== undefined);
        /**
         * If the AppKit is in embedded mode (for Demo app), we should get the available namespaces from the adapters.
         */
        const namespaces = OptionsController.state.enableEmbedded
            ? new Set([...namespacesFromAdapters])
            : new Set([...(caipNetworks?.map(network => network.chainNamespace) ?? [])]);
        if (adapters?.length === 0 || !adapterToActivate) {
            state.noAdapters = true;
        }
        if (!state.noAdapters) {
            state.activeChain = adapterToActivate?.namespace;
            state.activeCaipNetwork = activeCaipNetwork;
            ChainController.setChainNetworkData(adapterToActivate?.namespace, {
                caipNetwork: activeCaipNetwork
            });
            if (state.activeChain) {
                PublicStateController.set({ activeChain: adapterToActivate?.namespace });
            }
        }
        namespaces.forEach(namespace => {
            const namespaceNetworks = caipNetworks?.filter(network => network.chainNamespace === namespace);
            ChainController.state.chains.set(namespace, {
                namespace,
                networkState: proxy({
                    ...networkState,
                    caipNetwork: namespaceNetworks?.[0]
                }),
                accountState: proxy(accountState),
                caipNetworks: namespaceNetworks ?? [],
                ...clients
            });
            ChainController.setRequestedCaipNetworks(namespaceNetworks ?? [], namespace);
        });
    },
    removeAdapter(namespace) {
        if (state.activeChain === namespace) {
            const nextAdapter = Array.from(state.chains.entries()).find(([chainNamespace]) => chainNamespace !== namespace);
            if (nextAdapter) {
                const caipNetwork = nextAdapter[1]?.caipNetworks?.[0];
                if (caipNetwork) {
                    ChainController.setActiveCaipNetwork(caipNetwork);
                }
            }
        }
        state.chains.delete(namespace);
    },
    addAdapter(adapter, { networkControllerClient, connectionControllerClient }, caipNetworks) {
        state.chains.set(adapter.namespace, {
            namespace: adapter.namespace,
            networkState: {
                ...networkState,
                caipNetwork: caipNetworks[0]
            },
            accountState,
            caipNetworks,
            connectionControllerClient,
            networkControllerClient
        });
        ChainController.setRequestedCaipNetworks(caipNetworks?.filter(caipNetwork => caipNetwork.chainNamespace === adapter.namespace) ?? [], adapter.namespace);
    },
    addNetwork(network) {
        const chainAdapter = state.chains.get(network.chainNamespace);
        if (chainAdapter) {
            const newNetworks = [...(chainAdapter.caipNetworks || [])];
            if (!chainAdapter.caipNetworks?.find(caipNetwork => caipNetwork.id === network.id)) {
                newNetworks.push(network);
            }
            state.chains.set(network.chainNamespace, { ...chainAdapter, caipNetworks: newNetworks });
            ChainController.setRequestedCaipNetworks(newNetworks, network.chainNamespace);
            ConnectorController.filterByNamespace(network.chainNamespace, true);
        }
    },
    removeNetwork(namespace, networkId) {
        const chainAdapter = state.chains.get(namespace);
        if (chainAdapter) {
            // Check if network being removed is active network
            const isActiveNetwork = state.activeCaipNetwork?.id === networkId;
            // Filter out the network being removed
            const newCaipNetworksOfAdapter = [
                ...(chainAdapter.caipNetworks?.filter(network => network.id !== networkId) || [])
            ];
            // If active network was removed and there are other networks available, switch to first one
            if (isActiveNetwork && chainAdapter?.caipNetworks?.[0]) {
                ChainController.setActiveCaipNetwork(chainAdapter.caipNetworks[0]);
            }
            state.chains.set(namespace, { ...chainAdapter, caipNetworks: newCaipNetworksOfAdapter });
            ChainController.setRequestedCaipNetworks(newCaipNetworksOfAdapter || [], namespace);
            if (newCaipNetworksOfAdapter.length === 0) {
                ConnectorController.filterByNamespace(namespace, false);
            }
        }
    },
    setAdapterNetworkState(chain, props) {
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            chainAdapter.networkState = {
                ...(chainAdapter.networkState || networkState),
                ...props
            };
            state.chains.set(chain, chainAdapter);
        }
    },
    setChainAccountData(chain, accountProps, _unknown = true) {
        if (!chain) {
            throw new Error('Chain is required to update chain account data');
        }
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            const newAccountState = { ...(chainAdapter.accountState || accountState), ...accountProps };
            state.chains.set(chain, { ...chainAdapter, accountState: newAccountState });
            if (state.chains.size === 1 || state.activeChain === chain) {
                if (accountProps.caipAddress) {
                    state.activeCaipAddress = accountProps.caipAddress;
                }
                AccountController.replaceState(newAccountState);
            }
        }
    },
    setChainNetworkData(chain, networkProps) {
        if (!chain) {
            return;
        }
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            const newNetworkState = { ...(chainAdapter.networkState || networkState), ...networkProps };
            state.chains.set(chain, { ...chainAdapter, networkState: newNetworkState });
        }
    },
    // eslint-disable-next-line max-params
    setAccountProp(prop, value, chain, replaceState = true) {
        ChainController.setChainAccountData(chain, { [prop]: value }, replaceState);
        if (prop === 'status' && value === 'disconnected' && chain) {
            ConnectorController.removeConnectorId(chain);
        }
    },
    setActiveNamespace(chain) {
        state.activeChain = chain;
        const newAdapter = chain ? state.chains.get(chain) : undefined;
        const caipNetwork = newAdapter?.networkState?.caipNetwork;
        if (caipNetwork?.id && chain) {
            state.activeCaipAddress = newAdapter?.accountState?.caipAddress;
            state.activeCaipNetwork = caipNetwork;
            ChainController.setChainNetworkData(chain, { caipNetwork });
            StorageUtil.setActiveCaipNetworkId(caipNetwork?.caipNetworkId);
            PublicStateController.set({
                activeChain: chain,
                selectedNetworkId: caipNetwork?.caipNetworkId
            });
        }
    },
    setActiveCaipNetwork(caipNetwork) {
        if (!caipNetwork) {
            return;
        }
        if (state.activeChain !== caipNetwork.chainNamespace) {
            ChainController.setIsSwitchingNamespace(true);
        }
        const newAdapter = state.chains.get(caipNetwork.chainNamespace);
        state.activeChain = caipNetwork.chainNamespace;
        state.activeCaipNetwork = caipNetwork;
        ChainController.setChainNetworkData(caipNetwork.chainNamespace, { caipNetwork });
        if (newAdapter?.accountState?.address) {
            state.activeCaipAddress = `${caipNetwork.chainNamespace}:${caipNetwork.id}:${newAdapter?.accountState?.address}`;
        }
        else {
            state.activeCaipAddress = undefined;
        }
        // Update the chain's account state with the new caip address value
        ChainController.setAccountProp('caipAddress', state.activeCaipAddress, caipNetwork.chainNamespace);
        if (newAdapter) {
            AccountController.replaceState(newAdapter.accountState);
        }
        // Reset send state when switching networks
        SendController.resetSend();
        PublicStateController.set({
            activeChain: state.activeChain,
            selectedNetworkId: state.activeCaipNetwork?.caipNetworkId
        });
        StorageUtil.setActiveCaipNetworkId(caipNetwork.caipNetworkId);
        const isSupported = ChainController.checkIfSupportedNetwork(caipNetwork.chainNamespace);
        if (!isSupported &&
            OptionsController.state.enableNetworkSwitch &&
            !OptionsController.state.allowUnsupportedChain &&
            !ConnectionController.state.wcBasic) {
            ChainController.showUnsupportedChainUI();
        }
    },
    addCaipNetwork(caipNetwork) {
        if (!caipNetwork) {
            return;
        }
        const chain = state.chains.get(caipNetwork.chainNamespace);
        if (chain) {
            chain?.caipNetworks?.push(caipNetwork);
        }
    },
    async switchActiveNamespace(namespace) {
        if (!namespace) {
            return;
        }
        const isDifferentChain = namespace !== ChainController.state.activeChain;
        const caipNetworkOfNamespace = ChainController.getNetworkData(namespace)?.caipNetwork;
        const firstNetworkWithChain = ChainController.getCaipNetworkByNamespace(namespace, caipNetworkOfNamespace?.id);
        if (isDifferentChain && firstNetworkWithChain) {
            await ChainController.switchActiveNetwork(firstNetworkWithChain);
        }
    },
    async switchActiveNetwork(network) {
        const activeAdapter = ChainController.state.chains.get(ChainController.state.activeChain);
        const unsupportedNetwork = !activeAdapter?.caipNetworks?.some(caipNetwork => caipNetwork.id === state.activeCaipNetwork?.id);
        const networkControllerClient = ChainController.getNetworkControllerClient(network.chainNamespace);
        if (networkControllerClient) {
            try {
                await networkControllerClient.switchCaipNetwork(network);
                if (unsupportedNetwork) {
                    ModalController.close();
                }
            }
            catch (error) {
                RouterController.goBack();
            }
            EventsController.sendEvent({
                type: 'track',
                event: 'SWITCH_NETWORK',
                properties: { network: network.caipNetworkId }
            });
        }
    },
    getNetworkControllerClient(chainNamespace) {
        const chain = chainNamespace || state.activeChain;
        const chainAdapter = state.chains.get(chain);
        if (!chainAdapter) {
            throw new Error('Chain adapter not found');
        }
        if (!chainAdapter.networkControllerClient) {
            throw new Error('NetworkController client not set');
        }
        return chainAdapter.networkControllerClient;
    },
    getConnectionControllerClient(_chain) {
        const chain = _chain || state.activeChain;
        if (!chain) {
            throw new Error('Chain is required to get connection controller client');
        }
        const chainAdapter = state.chains.get(chain);
        if (!chainAdapter?.connectionControllerClient) {
            throw new Error('ConnectionController client not set');
        }
        return chainAdapter.connectionControllerClient;
    },
    getAccountProp(key, _chain) {
        let chain = state.activeChain;
        if (_chain) {
            chain = _chain;
        }
        if (!chain) {
            return undefined;
        }
        const chainAccountState = state.chains.get(chain)?.accountState;
        if (!chainAccountState) {
            return undefined;
        }
        return chainAccountState[key];
    },
    getNetworkProp(key, namespace) {
        const chainNetworkState = state.chains.get(namespace)?.networkState;
        if (!chainNetworkState) {
            return undefined;
        }
        return chainNetworkState[key];
    },
    getRequestedCaipNetworks(chainToFilter) {
        const adapter = state.chains.get(chainToFilter);
        const { approvedCaipNetworkIds = [], requestedCaipNetworks = [] } = adapter?.networkState || {};
        const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
        return sortedNetworks;
    },
    getAllRequestedCaipNetworks() {
        const requestedCaipNetworks = [];
        state.chains.forEach(chainAdapter => {
            const caipNetworks = ChainController.getRequestedCaipNetworks(chainAdapter.namespace);
            requestedCaipNetworks.push(...caipNetworks);
        });
        return requestedCaipNetworks;
    },
    setRequestedCaipNetworks(caipNetworks, chain) {
        ChainController.setAdapterNetworkState(chain, { requestedCaipNetworks: caipNetworks });
        const allRequestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
        const namespaces = allRequestedCaipNetworks.map(network => network.chainNamespace);
        const uniqueNamespaces = Array.from(new Set(namespaces));
        ConnectorController.filterByNamespaces(uniqueNamespaces);
    },
    getAllApprovedCaipNetworkIds() {
        const approvedCaipNetworkIds = [];
        state.chains.forEach(chainAdapter => {
            const approvedIds = ChainController.getApprovedCaipNetworkIds(chainAdapter.namespace);
            approvedCaipNetworkIds.push(...approvedIds);
        });
        return approvedCaipNetworkIds;
    },
    getActiveCaipNetwork() {
        return state.activeCaipNetwork;
    },
    getActiveCaipAddress() {
        return state.activeCaipAddress;
    },
    getApprovedCaipNetworkIds(namespace) {
        const adapter = state.chains.get(namespace);
        const approvedCaipNetworkIds = adapter?.networkState?.approvedCaipNetworkIds || [];
        return approvedCaipNetworkIds;
    },
    async setApprovedCaipNetworksData(namespace) {
        const networkControllerClient = ChainController.getNetworkControllerClient();
        const data = await networkControllerClient?.getApprovedCaipNetworksData();
        ChainController.setAdapterNetworkState(namespace, {
            approvedCaipNetworkIds: data?.approvedCaipNetworkIds,
            supportsAllNetworks: data?.supportsAllNetworks
        });
    },
    checkIfSupportedNetwork(namespace, caipNetwork) {
        const activeCaipNetwork = caipNetwork || state.activeCaipNetwork;
        const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(namespace);
        if (!requestedCaipNetworks.length) {
            return true;
        }
        return requestedCaipNetworks?.some(network => network.id === activeCaipNetwork?.id);
    },
    checkIfSupportedChainId(chainId) {
        if (!state.activeChain) {
            return true;
        }
        const requestedCaipNetworks = ChainController.getRequestedCaipNetworks(state.activeChain);
        return requestedCaipNetworks?.some(network => network.id === chainId);
    },
    // Smart Account Network Handlers
    setSmartAccountEnabledNetworks(smartAccountEnabledNetworks, chain) {
        ChainController.setAdapterNetworkState(chain, { smartAccountEnabledNetworks });
    },
    checkIfSmartAccountEnabled() {
        const networkId = NetworkUtil.caipNetworkIdToNumber(state.activeCaipNetwork?.caipNetworkId);
        const activeChain = state.activeChain;
        if (!activeChain || !networkId) {
            return false;
        }
        const smartAccountEnabledNetworks = ChainController.getNetworkProp('smartAccountEnabledNetworks', activeChain);
        return Boolean(smartAccountEnabledNetworks?.includes(Number(networkId)));
    },
    getActiveNetworkTokenAddress() {
        const namespace = state.activeCaipNetwork?.chainNamespace || 'eip155';
        const chainId = state.activeCaipNetwork?.id || 1;
        const address = ConstantsUtil.NATIVE_TOKEN_ADDRESS[namespace];
        return `${namespace}:${chainId}:${address}`;
    },
    showUnsupportedChainUI() {
        ModalController.open({ view: 'UnsupportedChain' });
    },
    checkIfNamesSupported() {
        const activeCaipNetwork = state.activeCaipNetwork;
        return Boolean(activeCaipNetwork?.chainNamespace &&
            ConstantsUtil.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(activeCaipNetwork.chainNamespace));
    },
    resetNetwork(namespace) {
        ChainController.setAdapterNetworkState(namespace, {
            approvedCaipNetworkIds: undefined,
            supportsAllNetworks: true,
            smartAccountEnabledNetworks: []
        });
    },
    resetAccount(chain) {
        const chainToWrite = chain;
        if (!chainToWrite) {
            throw new Error('Chain is required to set account prop');
        }
        state.activeCaipAddress = undefined;
        ChainController.setChainAccountData(chainToWrite, {
            smartAccountDeployed: false,
            currentTab: 0,
            caipAddress: undefined,
            address: undefined,
            balance: undefined,
            balanceSymbol: undefined,
            profileName: undefined,
            profileImage: undefined,
            addressExplorerUrl: undefined,
            tokenBalance: [],
            connectedWalletInfo: undefined,
            preferredAccountTypes: undefined,
            socialProvider: undefined,
            socialWindow: undefined,
            farcasterUrl: undefined,
            allAccounts: [],
            user: undefined,
            status: 'disconnected'
        });
        ConnectorController.removeConnectorId(chainToWrite);
    },
    setIsSwitchingNamespace(isSwitchingNamespace) {
        state.isSwitchingNamespace = isSwitchingNamespace;
    },
    getFirstCaipNetworkSupportsAuthConnector() {
        const availableChains = [];
        let firstCaipNetwork = undefined;
        state.chains.forEach(chain => {
            if (CommonConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(ns => ns === chain.namespace)) {
                if (chain.namespace) {
                    availableChains.push(chain.namespace);
                }
            }
        });
        if (availableChains.length > 0) {
            const firstAvailableChain = availableChains[0];
            firstCaipNetwork = firstAvailableChain
                ? state.chains.get(firstAvailableChain)?.caipNetworks?.[0]
                : undefined;
            return firstCaipNetwork;
        }
        return undefined;
    },
    getAccountData(chainNamespace) {
        if (!chainNamespace) {
            return AccountController.state;
        }
        return ChainController.state.chains.get(chainNamespace)?.accountState;
    },
    getNetworkData(chainNamespace) {
        const namespace = chainNamespace || state.activeChain;
        if (!namespace) {
            return undefined;
        }
        return ChainController.state.chains.get(namespace)?.networkState;
    },
    getCaipNetworkByNamespace(chainNamespace, chainId) {
        if (!chainNamespace) {
            return undefined;
        }
        const chain = ChainController.state.chains.get(chainNamespace);
        const byChainId = chain?.caipNetworks?.find(network => network.id === chainId);
        if (byChainId) {
            return byChainId;
        }
        return chain?.networkState?.caipNetwork || chain?.caipNetworks?.[0];
    },
    /**
     * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
     * @param namespace - The namespace to get the requested CaipNetwork IDs for
     * @returns The requested CaipNetwork IDs
     */
    getRequestedCaipNetworkIds() {
        const namespace = ConnectorController.state.filterByNamespace;
        const chains = namespace ? [state.chains.get(namespace)] : Array.from(state.chains.values());
        return chains
            .flatMap(chain => chain?.caipNetworks || [])
            .map(caipNetwork => caipNetwork.caipNetworkId);
    },
    getCaipNetworks(namespace) {
        if (namespace) {
            return ChainController.getRequestedCaipNetworks(namespace);
        }
        return ChainController.getAllRequestedCaipNetworks();
    }
};
// Export the controller wrapped with our error boundary
export const ChainController = withErrorBoundary(controller);
//# sourceMappingURL=ChainController.js.map
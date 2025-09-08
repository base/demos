import UniversalProvider from '@walletconnect/universal-provider';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { AccountController, ChainController } from '@reown/appkit-controllers';
import { PresetsUtil } from '@reown/appkit-utils';
import { WalletConnectConnector } from '../connectors/WalletConnectConnector.js';
/**
 * Abstract class representing a chain adapter blueprint.
 * @template Connector - The type of connector extending ChainAdapterConnector
 */
export class AdapterBlueprint {
    /**
     * Creates an instance of AdapterBlueprint.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */
    constructor(params) {
        this.availableConnectors = [];
        this.eventListeners = new Map();
        this.getCaipNetworks = (namespace) => ChainController.getCaipNetworks(namespace);
        if (params) {
            this.construct(params);
        }
    }
    /**
     * Initializes the adapter with the given parameters.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */
    construct(params) {
        this.projectId = params.projectId;
        this.namespace = params.namespace;
        this.adapterType = params.adapterType;
    }
    /**
     * Gets the available connectors.
     * @returns {Connector[]} An array of available connectors
     */
    get connectors() {
        return this.availableConnectors;
    }
    /**
     * Gets the supported networks.
     * @returns {CaipNetwork[]} An array of supported networks
     */
    get networks() {
        return this.getCaipNetworks(this.namespace);
    }
    /**
     * Sets the auth provider.
     * @param {W3mFrameProvider} authProvider - The auth provider instance
     */
    setAuthProvider(authProvider) {
        this.addConnector({
            id: CommonConstantsUtil.CONNECTOR_ID.AUTH,
            type: 'AUTH',
            name: CommonConstantsUtil.CONNECTOR_NAMES.AUTH,
            provider: authProvider,
            imageId: PresetsUtil.ConnectorImageIds[CommonConstantsUtil.CONNECTOR_ID.AUTH],
            chain: this.namespace,
            chains: []
        });
    }
    /**
     * Adds one or more connectors to the available connectors list.
     * @param {...Connector} connectors - The connectors to add
     */
    addConnector(...connectors) {
        const connectorsAdded = new Set();
        this.availableConnectors = [...connectors, ...this.availableConnectors].filter(connector => {
            if (connectorsAdded.has(connector.id)) {
                return false;
            }
            connectorsAdded.add(connector.id);
            return true;
        });
        this.emit('connectors', this.availableConnectors);
    }
    setStatus(status, chainNamespace) {
        AccountController.setStatus(status, chainNamespace);
    }
    /**
     * Adds an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
     */
    on(eventName, callback) {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, new Set());
        }
        this.eventListeners.get(eventName)?.add(callback);
    }
    /**
     * Removes an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be removed
     */
    off(eventName, callback) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
        }
    }
    /**
     * Removes all event listeners.
     */
    removeAllEventListeners() {
        this.eventListeners.forEach(listeners => {
            listeners.clear();
        });
    }
    /**
     * Emits an event with the given name and optional data.
     * @template T
     * @param {T} eventName - The name of the event to emit
     * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
     */
    emit(eventName, data) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.forEach(callback => callback(data));
        }
    }
    /**
     * Connects to WalletConnect.
     * @param {number | string} [_chainId] - Optional chain ID to connect to
     */
    async connectWalletConnect(_chainId) {
        const connector = this.getWalletConnectConnector();
        const result = await connector.connectWalletConnect();
        return { clientId: result.clientId };
    }
    /**
     * Switches the network.
     * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
     */
    async switchNetwork(params) {
        const { caipNetwork, providerType } = params;
        if (!params.provider) {
            return;
        }
        const provider = 'provider' in params.provider ? params.provider.provider : params.provider;
        if (providerType === 'WALLET_CONNECT') {
            ;
            provider.setDefaultChain(caipNetwork.caipNetworkId);
            return;
        }
        if (provider && providerType === 'AUTH') {
            const authProvider = provider;
            const preferredAccountType = AccountController.state.preferredAccountTypes?.[caipNetwork.chainNamespace];
            await authProvider.switchNetwork(caipNetwork.caipNetworkId);
            const user = await authProvider.getUser({
                chainId: caipNetwork.caipNetworkId,
                preferredAccountType
            });
            this.emit('switchNetwork', user);
        }
    }
    getWalletConnectConnector() {
        const connector = this.connectors.find(c => c instanceof WalletConnectConnector);
        if (!connector) {
            throw new Error('WalletConnectConnector not found');
        }
        return connector;
    }
}
//# sourceMappingURL=ChainAdapterBlueprint.js.map
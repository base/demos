/* eslint-disable no-console */
import { proxy, ref } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import {} from '@reown/appkit-common';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
import { StorageUtil } from '../utils/StorageUtil.js';
import { AppKitError, withErrorBoundary } from '../utils/withErrorBoundary.js';
import { AccountController } from './AccountController.js';
import { ChainController } from './ChainController.js';
import { ConnectorController } from './ConnectorController.js';
import { EventsController } from './EventsController.js';
import { ModalController } from './ModalController.js';
import { RouterController } from './RouterController.js';
import { TransactionsController } from './TransactionsController.js';
// -- State --------------------------------------------- //
const state = proxy({
    connections: new Map(),
    wcError: false,
    buffering: false,
    status: 'disconnected'
});
// eslint-disable-next-line init-declarations
let wcConnectionPromise;
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    _getClient() {
        return state._client;
    },
    setClient(client) {
        state._client = ref(client);
    },
    async connectWalletConnect() {
        if (CoreHelperUtil.isTelegram() || (CoreHelperUtil.isSafari() && CoreHelperUtil.isIos())) {
            if (wcConnectionPromise) {
                await wcConnectionPromise;
                wcConnectionPromise = undefined;
                return;
            }
            if (!CoreHelperUtil.isPairingExpired(state?.wcPairingExpiry)) {
                const link = state.wcUri;
                state.wcUri = link;
                return;
            }
            wcConnectionPromise = ConnectionController._getClient()
                ?.connectWalletConnect?.()
                .catch(() => undefined);
            ConnectionController.state.status = 'connecting';
            await wcConnectionPromise;
            wcConnectionPromise = undefined;
            state.wcPairingExpiry = undefined;
            ConnectionController.state.status = 'connected';
        }
        else {
            await ConnectionController._getClient()?.connectWalletConnect?.();
        }
    },
    async connectExternal(options, chain, setChain = true) {
        await ConnectionController._getClient()?.connectExternal?.(options);
        if (setChain) {
            ChainController.setActiveNamespace(chain);
        }
    },
    async reconnectExternal(options) {
        await ConnectionController._getClient()?.reconnectExternal?.(options);
        const namespace = options.chain || ChainController.state.activeChain;
        if (namespace) {
            ConnectorController.setConnectorId(options.id, namespace);
        }
    },
    async setPreferredAccountType(accountType, namespace) {
        ModalController.setLoading(true, ChainController.state.activeChain);
        const authConnector = ConnectorController.getAuthConnector();
        if (!authConnector) {
            return;
        }
        AccountController.setPreferredAccountType(accountType, namespace);
        await authConnector.provider.setPreferredAccount(accountType);
        StorageUtil.setPreferredAccountTypes(AccountController.state.preferredAccountTypes ?? { [namespace]: accountType });
        await ConnectionController.reconnectExternal(authConnector);
        ModalController.setLoading(false, ChainController.state.activeChain);
        EventsController.sendEvent({
            type: 'track',
            event: 'SET_PREFERRED_ACCOUNT_TYPE',
            properties: {
                accountType,
                network: ChainController.state.activeCaipNetwork?.caipNetworkId || ''
            }
        });
    },
    async signMessage(message) {
        return ConnectionController._getClient()?.signMessage(message);
    },
    parseUnits(value, decimals) {
        return ConnectionController._getClient()?.parseUnits(value, decimals);
    },
    formatUnits(value, decimals) {
        return ConnectionController._getClient()?.formatUnits(value, decimals);
    },
    async sendTransaction(args) {
        return ConnectionController._getClient()?.sendTransaction(args);
    },
    async getCapabilities(params) {
        return ConnectionController._getClient()?.getCapabilities(params);
    },
    async grantPermissions(params) {
        return ConnectionController._getClient()?.grantPermissions(params);
    },
    async walletGetAssets(params) {
        return ConnectionController._getClient()?.walletGetAssets(params) ?? {};
    },
    async estimateGas(args) {
        return ConnectionController._getClient()?.estimateGas(args);
    },
    async writeContract(args) {
        return ConnectionController._getClient()?.writeContract(args);
    },
    async getEnsAddress(value) {
        return ConnectionController._getClient()?.getEnsAddress(value);
    },
    async getEnsAvatar(value) {
        return ConnectionController._getClient()?.getEnsAvatar(value);
    },
    checkInstalled(ids) {
        return ConnectionController._getClient()?.checkInstalled?.(ids) || false;
    },
    resetWcConnection() {
        state.wcUri = undefined;
        state.wcPairingExpiry = undefined;
        state.wcLinking = undefined;
        state.recentWallet = undefined;
        state.status = 'disconnected';
        TransactionsController.resetTransactions();
        StorageUtil.deleteWalletConnectDeepLink();
    },
    resetUri() {
        state.wcUri = undefined;
        state.wcPairingExpiry = undefined;
        wcConnectionPromise = undefined;
    },
    finalizeWcConnection() {
        const { wcLinking, recentWallet } = ConnectionController.state;
        if (wcLinking) {
            StorageUtil.setWalletConnectDeepLink(wcLinking);
        }
        if (recentWallet) {
            StorageUtil.setAppKitRecent(recentWallet);
        }
        EventsController.sendEvent({
            type: 'track',
            event: 'CONNECT_SUCCESS',
            properties: {
                method: wcLinking ? 'mobile' : 'qrcode',
                name: RouterController.state.data?.wallet?.name || 'Unknown'
            }
        });
    },
    setWcBasic(wcBasic) {
        state.wcBasic = wcBasic;
    },
    setUri(uri) {
        state.wcUri = uri;
        state.wcPairingExpiry = CoreHelperUtil.getPairingExpiry();
    },
    setWcLinking(wcLinking) {
        state.wcLinking = wcLinking;
    },
    setWcError(wcError) {
        state.wcError = wcError;
        state.buffering = false;
    },
    setRecentWallet(wallet) {
        state.recentWallet = wallet;
    },
    setBuffering(buffering) {
        state.buffering = buffering;
    },
    setStatus(status) {
        state.status = status;
    },
    async disconnect(namespace) {
        try {
            await ConnectionController._getClient()?.disconnect(namespace);
        }
        catch (error) {
            throw new AppKitError('Failed to disconnect', 'INTERNAL_SDK_ERROR', error);
        }
    },
    setConnections(connections, chainNamespace) {
        state.connections.set(chainNamespace, connections);
    },
    switchAccount({ connection, address, namespace }) {
        const connectedConnectorId = ConnectorController.state.activeConnectorIds[namespace];
        const isConnectorConnected = connectedConnectorId === connection.connectorId;
        if (isConnectorConnected) {
            const currentNetwork = ChainController.state.activeCaipNetwork;
            if (currentNetwork) {
                const caipAddress = `${namespace}:${currentNetwork.id}:${address}`;
                AccountController.setCaipAddress(caipAddress, namespace);
            }
            else {
                console.warn(`No current network found for namespace "${namespace}"`);
            }
        }
        else {
            const connector = ConnectorController.getConnector(connection.connectorId);
            if (connector) {
                ConnectionController.connectExternal(connector, namespace);
            }
            else {
                console.warn(`No connector found for namespace "${namespace}"`);
            }
        }
    }
};
// Export the controller wrapped with our error boundary
export const ConnectionController = withErrorBoundary(controller);
//# sourceMappingURL=ConnectionController.js.map
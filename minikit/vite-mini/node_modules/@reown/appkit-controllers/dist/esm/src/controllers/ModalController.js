import { proxy, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import {} from '@reown/appkit-common';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
import { NetworkUtil } from '../utils/NetworkUtil.js';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
import { AccountController } from './AccountController.js';
import { ApiController } from './ApiController.js';
import { ChainController } from './ChainController.js';
import { ConnectionController } from './ConnectionController.js';
import { ConnectorController } from './ConnectorController.js';
import { EventsController } from './EventsController.js';
import { OptionsController } from './OptionsController.js';
import { PublicStateController } from './PublicStateController.js';
import { RouterController } from './RouterController.js';
// -- State --------------------------------------------- //
const state = proxy({
    loading: false,
    loadingNamespaceMap: new Map(),
    open: false,
    shake: false,
    namespace: undefined
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    async open(options) {
        const isConnected = AccountController.state.status === 'connected';
        const namespace = options?.namespace;
        const currentNamespace = ChainController.state.activeChain;
        const isSwitchingNamespace = namespace && namespace !== currentNamespace;
        const caipAddress = ChainController.getAccountData(options?.namespace)?.caipAddress;
        if (ConnectionController.state.wcBasic) {
            // No need to add an await here if we are use basic
            ApiController.prefetch({ fetchNetworkImages: false, fetchConnectorImages: false });
        }
        else {
            await ApiController.prefetch({
                fetchConnectorImages: !isConnected,
                fetchFeaturedWallets: !isConnected,
                fetchRecommendedWallets: !isConnected
            });
        }
        ConnectorController.setFilterByNamespace(options?.namespace);
        ModalController.setLoading(true, namespace);
        if (namespace && isSwitchingNamespace) {
            const namespaceNetwork = ChainController.getNetworkData(namespace)?.caipNetwork ||
                ChainController.getRequestedCaipNetworks(namespace)[0];
            if (namespaceNetwork) {
                NetworkUtil.onSwitchNetwork({ network: namespaceNetwork, ignoreSwitchConfirmation: true });
            }
        }
        else {
            const hasNoAdapters = ChainController.state.noAdapters;
            if (OptionsController.state.manualWCControl || (hasNoAdapters && !caipAddress)) {
                if (CoreHelperUtil.isMobile()) {
                    RouterController.reset('AllWallets');
                }
                else {
                    RouterController.reset('ConnectingWalletConnectBasic');
                }
            }
            else if (options?.view) {
                RouterController.reset(options.view, options.data);
            }
            else if (caipAddress) {
                RouterController.reset('Account');
            }
            else {
                RouterController.reset('Connect');
            }
        }
        state.open = true;
        PublicStateController.set({ open: true });
        EventsController.sendEvent({
            type: 'track',
            event: 'MODAL_OPEN',
            properties: { connected: Boolean(caipAddress) }
        });
    },
    close() {
        const isEmbeddedEnabled = OptionsController.state.enableEmbedded;
        const isConnected = Boolean(ChainController.state.activeCaipAddress);
        // Only send the event if the modal is open and is about to be closed
        if (state.open) {
            EventsController.sendEvent({
                type: 'track',
                event: 'MODAL_CLOSE',
                properties: { connected: isConnected }
            });
        }
        state.open = false;
        RouterController.reset('Connect');
        ModalController.clearLoading();
        if (isEmbeddedEnabled) {
            if (isConnected) {
                RouterController.replace('Account');
            }
            else {
                RouterController.push('Connect');
            }
        }
        else {
            PublicStateController.set({ open: false });
        }
        ConnectionController.resetUri();
    },
    setLoading(loading, namespace) {
        if (namespace) {
            state.loadingNamespaceMap.set(namespace, loading);
        }
        state.loading = loading;
        PublicStateController.set({ loading });
    },
    clearLoading() {
        state.loadingNamespaceMap.clear();
        state.loading = false;
    },
    shake() {
        if (state.shake) {
            return;
        }
        state.shake = true;
        setTimeout(() => {
            state.shake = false;
        }, 500);
    }
};
// Export the controller wrapped with our error boundary
export const ModalController = withErrorBoundary(controller);
//# sourceMappingURL=ModalController.js.map
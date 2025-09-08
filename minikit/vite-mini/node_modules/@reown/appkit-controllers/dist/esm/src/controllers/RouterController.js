import { proxy, snapshot } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
import { AccountController } from './AccountController.js';
import { ChainController } from './ChainController.js';
import { ConnectorController } from './ConnectorController.js';
import { ModalController } from './ModalController.js';
import { OptionsController } from './OptionsController.js';
// -- State --------------------------------------------- //
const state = proxy({
    view: 'Connect',
    history: ['Connect'],
    transactionStack: []
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    pushTransactionStack(action) {
        state.transactionStack.push(action);
    },
    popTransactionStack(status) {
        const action = state.transactionStack.pop();
        if (!action) {
            return;
        }
        const { onSuccess, onError, onCancel } = action;
        switch (status) {
            case 'success':
                onSuccess?.();
                break;
            case 'error':
                onError?.();
                RouterController.goBack();
                break;
            case 'cancel':
                onCancel?.();
                RouterController.goBack();
                break;
            default:
        }
    },
    push(view, data) {
        if (view !== state.view) {
            state.view = view;
            state.history.push(view);
            state.data = data;
        }
    },
    reset(view, data) {
        state.view = view;
        state.history = [view];
        state.data = data;
    },
    replace(view, data) {
        const lastView = state.history.at(-1);
        const isSameView = lastView === view;
        if (!isSameView) {
            state.view = view;
            state.history[state.history.length - 1] = view;
            state.data = data;
        }
    },
    goBack() {
        const isConnected = ChainController.state.activeCaipAddress;
        const isFarcasterView = RouterController.state.view === 'ConnectingFarcaster';
        const shouldReload = !isConnected && isFarcasterView;
        if (state.history.length > 1) {
            state.history.pop();
            const [last] = state.history.slice(-1);
            if (last) {
                const isConnectView = last === 'Connect';
                if (isConnected && isConnectView) {
                    state.view = 'Account';
                }
                else {
                    state.view = last;
                }
            }
        }
        else {
            ModalController.close();
        }
        if (state.data?.wallet) {
            state.data.wallet = undefined;
        }
        // Reloading the iframe contentwindow and doing the view animation in the modal causes a small freeze in the transition. Doing these separately fixes that.
        setTimeout(() => {
            if (shouldReload) {
                AccountController.setFarcasterUrl(undefined, ChainController.state.activeChain);
                const authConnector = ConnectorController.getAuthConnector();
                authConnector?.provider?.reload();
                const optionsState = snapshot(OptionsController.state);
                authConnector?.provider?.syncDappData?.({
                    metadata: optionsState.metadata,
                    sdkVersion: optionsState.sdkVersion,
                    projectId: optionsState.projectId,
                    sdkType: optionsState.sdkType
                });
            }
        }, 100);
    },
    goBackToIndex(historyIndex) {
        if (state.history.length > 1) {
            state.history = state.history.slice(0, historyIndex + 1);
            const [last] = state.history.slice(-1);
            if (last) {
                state.view = last;
            }
        }
    },
    goBackOrCloseModal() {
        if (RouterController.state.history.length > 1) {
            RouterController.goBack();
        }
        else {
            ModalController.close();
        }
    }
};
// Export the controller wrapped with our error boundary
export const RouterController = withErrorBoundary(controller);
//# sourceMappingURL=RouterController.js.map
import { onMounted, onUnmounted, ref } from 'vue';
import { ConstantsUtil } from '@reown/appkit-common';
import { AccountController } from '../src/controllers/AccountController.js';
import { ChainController } from '../src/controllers/ChainController.js';
import { ConnectionController } from '../src/controllers/ConnectionController.js';
import { ConnectorController } from '../src/controllers/ConnectorController.js';
import { CoreHelperUtil } from '../src/utils/CoreHelperUtil.js';
import { StorageUtil } from '../src/utils/StorageUtil.js';
// -- Hooks ------------------------------------------------------------
export function useAppKitAccount(options) {
    const chainNamespace = ref(options?.namespace || ChainController.state.activeChain);
    const chains = ref(ChainController.state.chains);
    const state = ref({
        allAccounts: [],
        address: undefined,
        caipAddress: undefined,
        status: undefined,
        isConnected: false,
        embeddedWalletInfo: undefined
    });
    function updateState(_chains, _chainNamespace) {
        const activeConnectorId = StorageUtil.getConnectedConnectorId(_chainNamespace);
        const authConnector = _chainNamespace
            ? ConnectorController.getAuthConnector(_chainNamespace)
            : undefined;
        const accountState = _chainNamespace
            ? _chains.get(_chainNamespace)?.accountState
            : AccountController.state;
        state.value.allAccounts = accountState?.allAccounts || [];
        state.value.address = CoreHelperUtil.getPlainAddress(accountState?.caipAddress);
        state.value.caipAddress = accountState?.caipAddress;
        state.value.status = accountState?.status;
        state.value.isConnected = Boolean(accountState?.caipAddress);
        const activeChainNamespace = _chainNamespace || ChainController.state.activeChain;
        state.value.embeddedWalletInfo =
            authConnector && activeConnectorId === ConstantsUtil.CONNECTOR_ID.AUTH
                ? {
                    user: accountState?.user,
                    authProvider: accountState?.socialProvider ?? 'email',
                    accountType: accountState?.preferredAccountTypes?.[activeChainNamespace],
                    isSmartAccountDeployed: Boolean(accountState?.smartAccountDeployed)
                }
                : undefined;
    }
    const unsubscribeActiveChain = ChainController.subscribeKey('activeChain', val => {
        chainNamespace.value = options?.namespace || val;
        updateState(chains.value, chainNamespace.value);
    });
    const unsubscribeChains = ChainController.subscribe(val => {
        chains.value = val['chains'];
        updateState(chains.value, chainNamespace.value);
    });
    onMounted(() => {
        updateState(chains.value, chainNamespace.value);
    });
    onUnmounted(() => {
        unsubscribeChains();
        unsubscribeActiveChain();
    });
    return state;
}
export function useDisconnect() {
    async function disconnect(props) {
        await ConnectionController.disconnect(props?.namespace);
    }
    return { disconnect };
}
//# sourceMappingURL=vue.js.map
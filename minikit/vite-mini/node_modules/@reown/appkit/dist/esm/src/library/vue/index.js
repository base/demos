import { onUnmounted, reactive, ref } from 'vue';
import {} from '@reown/appkit-controllers';
import { ProviderUtil } from '@reown/appkit-utils';
let modal = undefined;
export function getAppKit(appKit) {
    if (appKit) {
        modal = appKit;
    }
}
// -- Core Hooks ---------------------------------------------------------------
export * from '@reown/appkit-controllers/vue';
export function useAppKitProvider(chainNamespace) {
    const walletProvider = ref(ProviderUtil.state.providers[chainNamespace]);
    const walletProviderType = ref(ProviderUtil.state.providerIds[chainNamespace]);
    const unsubscribe = ProviderUtil.subscribe(newState => {
        walletProvider.value = newState.providers[chainNamespace];
        walletProviderType.value = newState.providerIds[chainNamespace];
    });
    onUnmounted(() => {
        unsubscribe?.();
    });
    return reactive({
        walletProvider,
        walletProviderType
    });
}
export function useAppKitTheme() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitTheme" hook');
    }
    function setThemeMode(themeMode) {
        if (themeMode) {
            modal?.setThemeMode(themeMode);
        }
    }
    function setThemeVariables(themeVariables) {
        if (themeVariables) {
            modal?.setThemeVariables(themeVariables);
        }
    }
    const themeMode = ref(modal.getThemeMode());
    const themeVariables = ref(modal.getThemeVariables());
    const unsubscribe = modal?.subscribeTheme(state => {
        themeMode.value = state.themeMode;
        themeVariables.value = state.themeVariables;
    });
    onUnmounted(() => {
        unsubscribe?.();
    });
    return reactive({
        setThemeMode,
        setThemeVariables,
        themeMode,
        themeVariables
    });
}
export function useAppKit() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKit" composable');
    }
    async function open(options) {
        await modal?.open(options);
    }
    async function close() {
        await modal?.close();
    }
    return reactive({
        open,
        close
    });
}
export function useWalletInfo() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKit" composable');
    }
    const walletInfo = ref(modal.getWalletInfo());
    const unsubscribe = modal.subscribeWalletInfo(newValue => {
        walletInfo.value = newValue;
    });
    onUnmounted(() => {
        unsubscribe?.();
    });
    return reactive({ walletInfo });
}
export function useAppKitState() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitState" composable');
    }
    const initial = modal.getState();
    const open = ref(initial.open);
    const selectedNetworkId = ref(initial.selectedNetworkId);
    const unsubscribe = modal?.subscribeState(next => {
        open.value = next.open;
        selectedNetworkId.value = next.selectedNetworkId;
    });
    onUnmounted(() => {
        unsubscribe?.();
    });
    return reactive({ open, selectedNetworkId });
}
export function useAppKitEvents() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitEvents" composable');
    }
    const event = reactive(modal.getEvent());
    const unsubscribe = modal?.subscribeEvents(next => {
        event.data = next.data;
        event.timestamp = next.timestamp;
    });
    onUnmounted(() => {
        unsubscribe?.();
    });
    return event;
}
//# sourceMappingURL=index.js.map
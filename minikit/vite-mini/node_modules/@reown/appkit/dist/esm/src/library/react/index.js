import { useEffect, useState, useSyncExternalStore } from 'react';
import { useSnapshot } from 'valtio';
import { ProviderUtil } from '@reown/appkit-utils';
let modal = undefined;
export function getAppKit(appKit) {
    if (appKit) {
        modal = appKit;
    }
}
// -- Core Hooks ---------------------------------------------------------------
export * from '@reown/appkit-controllers/react';
export function useAppKitProvider(chainNamespace) {
    const { providers, providerIds } = useSnapshot(ProviderUtil.state);
    const walletProvider = providers[chainNamespace];
    const walletProviderType = providerIds[chainNamespace];
    return {
        walletProvider,
        walletProviderType
    };
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
    const [themeMode, setInternalThemeMode] = useState(modal.getThemeMode());
    const [themeVariables, setInternalThemeVariables] = useState(modal.getThemeVariables());
    useEffect(() => {
        const unsubscribe = modal?.subscribeTheme(state => {
            setInternalThemeMode(state.themeMode);
            setInternalThemeVariables(state.themeVariables);
        });
        return () => {
            unsubscribe?.();
        };
    }, []);
    return {
        themeMode,
        themeVariables,
        setThemeMode,
        setThemeVariables
    };
}
export function useAppKit() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKit" hook');
    }
    async function open(options) {
        await modal?.open(options);
    }
    async function close() {
        await modal?.close();
    }
    return { open, close };
}
export function useWalletInfo() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useWalletInfo" hook');
    }
    const walletInfo = useSyncExternalStore(modal.subscribeWalletInfo, modal.getWalletInfo, modal.getWalletInfo);
    return { walletInfo };
}
export function useAppKitState() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitState" hook');
    }
    const [state, setState] = useState({ ...modal.getState(), initialized: false });
    useEffect(() => {
        if (modal) {
            setState({ ...modal.getState() });
            const unsubscribe = modal?.subscribeState(newState => {
                setState({ ...newState });
            });
            return () => {
                unsubscribe?.();
            };
        }
        return () => null;
    }, []);
    return state;
}
export function useAppKitEvents() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitEvents" hook');
    }
    const [event, setEvents] = useState(modal.getEvent());
    useEffect(() => {
        const unsubscribe = modal?.subscribeEvents(newEvent => {
            setEvents({ ...newEvent });
        });
        return () => {
            unsubscribe?.();
        };
    }, []);
    return event;
}
//# sourceMappingURL=index.js.map
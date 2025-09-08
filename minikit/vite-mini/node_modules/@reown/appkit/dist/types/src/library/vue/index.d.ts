import type { ChainNamespace } from '@reown/appkit-common';
import { type ConnectorType, type Event } from '@reown/appkit-controllers';
import type { AppKitAccountButton, AppKitButton, AppKitConnectButton, AppKitNetworkButton, W3mAccountButton, W3mButton, W3mConnectButton, W3mNetworkButton } from '@reown/appkit-scaffold-ui';
import type { AppKitBaseClient as AppKit, OpenOptions, Views } from '../../client/appkit-base-client.js';
import type { AppKitOptions } from '../../utils/TypesUtil.js';
export interface AppKitEvent {
    timestamp: number;
    data: Event;
}
type ThemeModeOptions = AppKitOptions['themeMode'];
type ThemeVariablesOptions = AppKitOptions['themeVariables'];
type UseAppKitReturnType<T> = {
    walletProvider: T | undefined;
    walletProviderType: ConnectorType | undefined;
};
declare module 'vue' {
    interface ComponentCustomProperties {
        AppKitButton: Pick<AppKitButton, 'size' | 'label' | 'loadingLabel' | 'disabled' | 'balance' | 'namespace'>;
        AppKitConnectButton: Pick<AppKitConnectButton, 'size' | 'label' | 'loadingLabel'>;
        AppKitAccountButton: Pick<AppKitAccountButton, 'disabled' | 'balance'>;
        AppKitNetworkButton: Pick<AppKitNetworkButton, 'disabled'>;
        W3mConnectButton: Pick<W3mConnectButton, 'size' | 'label' | 'loadingLabel'>;
        W3mAccountButton: Pick<W3mAccountButton, 'disabled' | 'balance'>;
        W3mButton: Pick<W3mButton, 'size' | 'label' | 'loadingLabel' | 'disabled' | 'balance'>;
        W3mNetworkButton: Pick<W3mNetworkButton, 'disabled'>;
    }
}
export declare function getAppKit(appKit: AppKit): void;
export * from '@reown/appkit-controllers/vue';
export declare function useAppKitProvider<T>(chainNamespace: ChainNamespace): UseAppKitReturnType<T>;
export declare function useAppKitTheme(): {
    setThemeMode: (themeMode: ThemeModeOptions) => void;
    setThemeVariables: (themeVariables: ThemeVariablesOptions) => void;
    themeMode: import("@reown/appkit-controllers").ThemeMode;
    themeVariables: {
        '--w3m-font-family'?: string | undefined;
        '--w3m-accent'?: string | undefined;
        '--w3m-color-mix'?: string | undefined;
        '--w3m-color-mix-strength'?: number | undefined;
        '--w3m-font-size-master'?: string | undefined;
        '--w3m-border-radius-master'?: string | undefined;
        '--w3m-z-index'?: number | undefined;
        '--w3m-qr-color'?: string | undefined;
    };
};
export declare function useAppKit(): {
    open: <View extends Views>(options?: OpenOptions<View>) => Promise<void>;
    close: () => Promise<void>;
};
export declare function useWalletInfo(): {
    walletInfo: {
        [x: string]: unknown;
        name: string;
        icon?: string | undefined;
        type?: string | undefined;
    } | undefined;
};
export declare function useAppKitState(): {
    open: boolean;
    selectedNetworkId: import("@reown/appkit-common").CaipNetworkId | undefined;
};
export declare function useAppKitEvents(): AppKitEvent;

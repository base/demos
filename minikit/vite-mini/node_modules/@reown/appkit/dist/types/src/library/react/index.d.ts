import type { ChainNamespace } from '@reown/appkit-common';
import type { AppKitAccountButton, AppKitButton, AppKitConnectButton, AppKitNetworkButton, W3mAccountButton, W3mButton, W3mConnectButton, W3mNetworkButton } from '@reown/appkit-scaffold-ui';
import type { AppKitBaseClient as AppKit, OpenOptions, Views } from '../../client/appkit-base-client.js';
import type { AppKitOptions } from '../../utils/TypesUtil.js';
type ThemeModeOptions = AppKitOptions['themeMode'];
type ThemeVariablesOptions = AppKitOptions['themeVariables'];
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'appkit-modal': {
                class?: string;
            };
            'appkit-button': Pick<AppKitButton, 'size' | 'label' | 'loadingLabel' | 'disabled' | 'balance' | 'namespace'>;
            'appkit-connect-button': Pick<AppKitConnectButton, 'size' | 'label' | 'loadingLabel'>;
            'appkit-account-button': Pick<AppKitAccountButton, 'disabled' | 'balance'>;
            'appkit-network-button': Pick<AppKitNetworkButton, 'disabled'>;
            'w3m-connect-button': Pick<W3mConnectButton, 'size' | 'label' | 'loadingLabel'>;
            'w3m-account-button': Pick<W3mAccountButton, 'disabled' | 'balance'>;
            'w3m-button': Pick<W3mButton, 'size' | 'label' | 'loadingLabel' | 'disabled' | 'balance'>;
            'w3m-network-button': Pick<W3mNetworkButton, 'disabled'>;
        }
    }
}
export declare function getAppKit(appKit: AppKit): void;
export * from '@reown/appkit-controllers/react';
export declare function useAppKitProvider<T>(chainNamespace: ChainNamespace): {
    walletProvider: T;
    walletProviderType: import("@reown/appkit-controllers").ConnectorType | undefined;
};
export declare function useAppKitTheme(): {
    themeMode: "dark" | "light";
    themeVariables: import("@reown/appkit-controllers").ThemeVariables;
    setThemeMode: (themeMode: ThemeModeOptions) => void;
    setThemeVariables: (themeVariables: ThemeVariablesOptions) => void;
};
export declare function useAppKit(): {
    open: <View extends Views>(options?: OpenOptions<View>) => Promise<void>;
    close: () => Promise<void>;
};
export declare function useWalletInfo(): {
    walletInfo: import("@reown/appkit-controllers").ConnectedWalletInfo | undefined;
};
export declare function useAppKitState(): {
    initialized: boolean;
    loading: boolean;
    open: boolean;
    selectedNetworkId?: import("@reown/appkit-common").CaipNetworkId | undefined;
    activeChain?: ChainNamespace | undefined;
};
export declare function useAppKitEvents(): {
    timestamp: number;
    reportedErrors: Record<string, boolean>;
    data: import("@reown/appkit-controllers").Event;
};

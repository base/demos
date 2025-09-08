import type { W3mThemeVariables } from '@reown/appkit-common';
import type { ThemeMode, ThemeVariables } from '../utils/TypeUtil.js';
export interface ThemeControllerState {
    themeMode: ThemeMode;
    themeVariables: ThemeVariables;
    w3mThemeVariables: W3mThemeVariables | undefined;
}
export declare const ThemeController: {
    state: ThemeControllerState;
    subscribe(callback: (newState: ThemeControllerState) => void): () => void;
    setThemeMode(themeMode: ThemeControllerState["themeMode"]): void;
    setThemeVariables(themeVariables: ThemeControllerState["themeVariables"]): void;
    getSnapshot(): {
        readonly themeMode: ThemeMode;
        readonly themeVariables: {
            readonly '--w3m-font-family'?: string | undefined;
            readonly '--w3m-accent'?: string | undefined;
            readonly '--w3m-color-mix'?: string | undefined;
            readonly '--w3m-color-mix-strength'?: number | undefined;
            readonly '--w3m-font-size-master'?: string | undefined;
            readonly '--w3m-border-radius-master'?: string | undefined;
            readonly '--w3m-z-index'?: number | undefined;
            readonly '--w3m-qr-color'?: string | undefined;
        };
        readonly w3mThemeVariables: {
            readonly '--w3m-accent': string;
            readonly '--w3m-background': string;
        } | undefined;
    };
};

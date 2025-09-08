import type { ThemeType, ThemeVariables } from '@reown/appkit-common';
export declare function initializeTheming(themeVariables?: ThemeVariables, themeMode?: ThemeType): void;
export declare function setColorTheme(themeMode?: string): void;
export declare function setThemeVariables(themeVariables: ThemeVariables): void;
export declare const resetStyles: import("lit").CSSResult;
export declare const elementStyles: import("lit").CSSResult;
export declare const colorStyles: import("lit").CSSResult;

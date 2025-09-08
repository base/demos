import type { SpacingType, ThemeType, TruncateOptions } from './TypeUtil.js';
export declare const UiHelperUtil: {
    getSpacingStyles(spacing: SpacingType | SpacingType[], index: number): string | undefined;
    getFormattedDate(date: Date): string;
    getHostName(url: string): string;
    getTruncateString({ string, charsStart, charsEnd, truncate }: TruncateOptions): string;
    generateAvatarColors(address: string): string;
    hexToRgb(hex: string): [number, number, number];
    tintColor(rgb: [number, number, number], tint: number): [number, number, number];
    isNumber(character: string): boolean;
    getColorTheme(theme: ThemeType | undefined): ThemeType;
    splitBalance(input: string): [string, string];
    roundNumber(number: number, threshold: number, fixed: number): string | number;
    formatNumberToLocalString(value: string | number | undefined, decimals?: number): string;
};

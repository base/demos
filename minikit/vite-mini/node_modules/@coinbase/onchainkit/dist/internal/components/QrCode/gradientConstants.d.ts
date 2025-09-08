export declare const QR_CODE_SIZE = 237;
export declare const QR_LOGO_SIZE = 50;
export declare const QR_LOGO_RADIUS = 10;
export declare const QR_LOGO_BACKGROUND_COLOR = "#ffffff";
export declare const GRADIENT_START_COORDINATES: {
    x: number;
    y: number;
};
export declare const GRADIENT_END_COORDINATES: {
    x: number;
    y: number;
};
export declare const GRADIENT_END_STYLE: {
    borderRadius: number;
};
type LinearGradient = {
    startColor: string;
    endColor: string;
};
export declare const ockThemeToLinearGradientColorMap: {
    default: string;
    base: string;
    cyberpunk: string;
    hacker: string;
};
export declare const ockThemeToRadialGradientColorMap: {
    default: string;
    base: string;
    cyberpunk: string;
    hacker: string;
};
export declare const linearGradientStops: Record<string, LinearGradient>;
export declare const presetGradients: {
    default: string[][];
    blue: string[][];
    magenta: string[][];
    black: string[][];
};
export {};
//# sourceMappingURL=gradientConstants.d.ts.map
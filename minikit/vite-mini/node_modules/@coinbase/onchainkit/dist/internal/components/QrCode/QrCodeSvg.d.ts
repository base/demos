export type QRCodeSVGProps = {
    value?: string | null;
    size?: number;
    backgroundColor?: string;
    logo?: React.ReactNode;
    logoSize?: number;
    logoBackgroundColor?: string;
    logoMargin?: number;
    logoBorderRadius?: number;
    quietZone?: number;
    quietZoneBorderRadius?: number;
    ecl?: 'L' | 'M' | 'Q' | 'H';
    gradientType?: 'radial' | 'linear';
};
export declare function QrCodeSvg({ value, size, backgroundColor, logo, logoSize, logoBackgroundColor, logoMargin, logoBorderRadius, quietZone, quietZoneBorderRadius, ecl, gradientType, }: QRCodeSVGProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=QrCodeSvg.d.ts.map
import { default as React } from 'react';
type RenderLogoProps = {
    size: number;
    logo: {
        uri: string;
    } | React.ReactNode | undefined;
    logoSize: number;
    logoBackgroundColor: string;
    logoMargin: number;
    logoBorderRadius: number;
};
export declare function useLogo({ size, logo, logoSize, logoBackgroundColor, logoMargin, logoBorderRadius, }: RenderLogoProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=useLogo.d.ts.map
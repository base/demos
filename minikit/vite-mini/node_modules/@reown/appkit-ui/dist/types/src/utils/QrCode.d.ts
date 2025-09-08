import type { TemplateResult } from 'lit';
export declare const QrCodeUtil: {
    generate({ uri, size, logoSize, dotColor }: {
        uri: string;
        size: number;
        logoSize: number;
        dotColor?: string;
    }): TemplateResult[];
};

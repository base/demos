import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import type { ThemeType } from '../../utils/TypeUtil.js';
export declare class WuiQrCode extends LitElement {
    static styles: import("lit").CSSResult[];
    uri: string;
    size: number;
    theme: ThemeType;
    imageSrc?: string;
    alt?: string;
    color?: string;
    arenaClear?: boolean;
    farcaster?: boolean;
    render(): import("lit").TemplateResult<1>;
    private templateSvg;
    private templateVisual;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-qr-code': WuiQrCode;
    }
}

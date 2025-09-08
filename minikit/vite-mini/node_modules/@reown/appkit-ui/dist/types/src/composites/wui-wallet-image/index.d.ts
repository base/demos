import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../layout/wui-flex/index.js';
import type { IconType, SizeType } from '../../utils/TypeUtil.js';
import '../wui-icon-box/index.js';
export declare class WuiWalletImage extends LitElement {
    static styles: import("lit").CSSResult[];
    size: Exclude<SizeType, 'xl' | 'xs' | 'xxs'>;
    name: string;
    imageSrc?: string;
    walletIcon?: IconType;
    installed: boolean;
    badgeSize: SizeType;
    render(): import("lit").TemplateResult<1>;
    private templateVisual;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-wallet-image': WuiWalletImage;
    }
}

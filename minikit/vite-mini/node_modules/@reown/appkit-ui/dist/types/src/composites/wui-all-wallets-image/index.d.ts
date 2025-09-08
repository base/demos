import { LitElement } from 'lit';
import '../../layout/wui-flex/index.js';
import type { IWalletImage } from '../../utils/TypeUtil.js';
import '../wui-icon-box/index.js';
import '../wui-wallet-image/index.js';
export declare class WuiAllWalletsImage extends LitElement {
    static styles: import("lit").CSSResult[];
    walletImages: IWalletImage[];
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-all-wallets-image': WuiAllWalletsImage;
    }
}

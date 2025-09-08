import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import '../../composites/wui-icon-box/index.js';
import type { IconType, SizeType } from '../../utils/TypeUtil.js';
export declare class WuiWalletButton extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc?: string | undefined;
    name?: string | undefined;
    walletConnect: boolean;
    icon?: IconType;
    iconSize?: SizeType;
    loading: boolean;
    error: boolean;
    disabled: boolean;
    shake: boolean;
    render(): import("lit").TemplateResult<1>;
    private leftViewTemplate;
    private rightViewTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-wallet-button': WuiWalletButton;
    }
}

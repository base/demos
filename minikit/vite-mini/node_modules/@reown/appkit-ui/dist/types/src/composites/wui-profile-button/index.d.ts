import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import type { IconType } from '../../utils/TypeUtil.js';
import '../wui-avatar/index.js';
import '../wui-icon-box/index.js';
export declare class WuiProfileButton extends LitElement {
    static styles: import("lit").CSSResult[];
    networkSrc?: string;
    avatarSrc?: string;
    profileName?: string;
    address: string;
    icon: IconType;
    render(): import("lit").TemplateResult<1>;
    private networkImageTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-profile-button': WuiProfileButton;
    }
}

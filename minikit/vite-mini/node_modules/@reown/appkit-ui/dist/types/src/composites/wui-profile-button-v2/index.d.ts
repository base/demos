import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import type { IconType } from '../../utils/TypeUtil.js';
import '../wui-avatar/index.js';
import '../wui-icon-box/index.js';
export declare class WuiProfileButtonV2 extends LitElement {
    static styles: import("lit").CSSResult[];
    avatarSrc?: string;
    profileName?: string;
    address: string;
    icon: IconType;
    onProfileClick?: (event: Event) => void;
    onCopyClick?: (event: Event) => void;
    render(): import("lit").TemplateResult<1>;
    private handleClick;
    private getIconTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-profile-button-v2': WuiProfileButtonV2;
    }
}

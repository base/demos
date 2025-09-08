import { LitElement } from 'lit';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import '../wui-network-image/index.js';
export declare class WuiListNetwork extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc?: string | undefined;
    name: string;
    disabled: boolean;
    selected: boolean;
    transparent: boolean;
    render(): import("lit").TemplateResult<1>;
    private checkmarkTemplate;
    private templateNetworkImage;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-network': WuiListNetwork;
    }
}

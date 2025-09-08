import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiTokenListItem extends LitElement {
    static styles: import("lit").CSSResult[];
    private observer;
    imageSrc?: string;
    name?: string;
    symbol?: string;
    price?: string;
    amount?: string;
    private visible;
    private imageError;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private visualTemplate;
    private imageLoadError;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-token-list-item': WuiTokenListItem;
    }
}

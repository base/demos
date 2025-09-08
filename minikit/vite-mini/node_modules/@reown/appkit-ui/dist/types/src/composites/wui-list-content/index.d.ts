import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
export declare class WuiListContent extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc?: string;
    textTitle: string;
    textValue?: string;
    render(): import("lit").TemplateResult<1>;
    private templateContent;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-list-content': WuiListContent;
    }
}

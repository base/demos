import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../composites/wui-icon-box/index.js';
export declare class WuiSelect extends LitElement {
    static styles: import("lit").CSSResult[];
    imageSrc: string;
    render(): import("lit").TemplateResult<1>;
    private imageTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-select': WuiSelect;
    }
}

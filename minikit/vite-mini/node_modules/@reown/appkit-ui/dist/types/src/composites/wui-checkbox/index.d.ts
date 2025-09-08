import { LitElement } from 'lit';
import { type Ref } from 'lit/directives/ref.js';
import '../../components/wui-icon/index.js';
export declare class WuiCheckBox extends LitElement {
    static styles: import("lit").CSSResult[];
    inputElementRef: Ref<HTMLInputElement>;
    checked?: boolean;
    render(): import("lit").TemplateResult<1>;
    private dispatchChangeEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-checkbox': WuiCheckBox;
    }
}

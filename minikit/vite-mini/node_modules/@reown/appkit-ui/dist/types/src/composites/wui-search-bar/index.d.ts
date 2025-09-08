import { LitElement } from 'lit';
import { type Ref } from 'lit/directives/ref.js';
import '../../composites/wui-input-element/index.js';
import '../wui-input-text/index.js';
import type { WuiInputText } from '../wui-input-text/index.js';
export declare class WuiSearchBar extends LitElement {
    static styles: import("lit").CSSResult[];
    inputComponentRef: Ref<WuiInputText>;
    render(): import("lit").TemplateResult<1>;
    private clearValue;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-search-bar': WuiSearchBar;
    }
}

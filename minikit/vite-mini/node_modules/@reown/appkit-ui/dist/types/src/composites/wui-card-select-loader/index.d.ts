import { LitElement } from 'lit';
import '../../components/wui-shimmer/index.js';
import type { CardSelectType } from '../../utils/TypeUtil.js';
export declare class WuiCardSelectLoader extends LitElement {
    static styles: import("lit").CSSResult[];
    type: CardSelectType;
    render(): import("lit").TemplateResult<1>;
    private shimmerTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-card-select-loader': WuiCardSelectLoader;
    }
}

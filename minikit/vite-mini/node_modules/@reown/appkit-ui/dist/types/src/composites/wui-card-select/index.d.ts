import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import type { CardSelectType } from '../../utils/TypeUtil.js';
import '../wui-network-image/index.js';
import '../wui-wallet-image/index.js';
export declare class WuiCardSelect extends LitElement {
    static styles: import("lit").CSSResult[];
    name: string;
    type: CardSelectType;
    imageSrc?: string;
    disabled?: boolean;
    selected?: boolean;
    installed?: boolean;
    render(): import("lit").TemplateResult<1>;
    private imageTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-card-select': WuiCardSelect;
    }
}

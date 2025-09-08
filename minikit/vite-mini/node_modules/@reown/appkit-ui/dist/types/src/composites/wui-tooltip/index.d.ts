import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import type { PlacementType } from '../../utils/TypeUtil.js';
export declare class WuiTooltip extends LitElement {
    static styles: import("lit").CSSResult[];
    placement: PlacementType;
    variant: 'shade' | 'fill';
    message: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-tooltip': WuiTooltip;
    }
}

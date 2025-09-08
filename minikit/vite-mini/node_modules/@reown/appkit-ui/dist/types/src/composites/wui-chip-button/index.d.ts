import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import type { ChipButtonVariant, IconType } from '../../utils/TypeUtil.js';
export declare class WuiChipButton extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: ChipButtonVariant;
    imageSrc: string;
    disabled: boolean;
    icon: IconType;
    size: 'sm' | 'md';
    text: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-chip-button': WuiChipButton;
    }
}

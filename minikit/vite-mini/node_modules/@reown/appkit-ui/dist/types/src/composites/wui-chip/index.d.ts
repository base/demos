import { LitElement } from 'lit';
import '../../components/wui-icon/index.js';
import '../../components/wui-image/index.js';
import '../../components/wui-text/index.js';
import type { ChipType, IconType, SizeType } from '../../utils/TypeUtil.js';
export declare class WuiChip extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: ChipType;
    imageSrc?: string;
    imageIcon?: IconType;
    imageIconSize: SizeType;
    disabled: boolean;
    icon: IconType;
    href: string;
    text?: string;
    render(): import("lit").TemplateResult<1>;
    private imageTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-chip': WuiChip;
    }
}

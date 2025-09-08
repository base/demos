import { LitElement } from 'lit';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import type { BorderRadiusType, ButtonSize, ButtonVariant } from '../../utils/TypeUtil.js';
export declare class WuiButton extends LitElement {
    static styles: import("lit").CSSResult[];
    size: ButtonSize;
    disabled: boolean;
    fullWidth: boolean;
    loading: boolean;
    variant: ButtonVariant;
    private hasIconLeft;
    private hasIconRight;
    borderRadius: Exclude<BorderRadiusType, 'inherit' | 'xxs'>;
    textVariant?: string;
    render(): import("lit").TemplateResult<1>;
    handleSlotLeftChange(): void;
    handleSlotRightChange(): void;
    loadingTemplate(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-button': WuiButton;
    }
}

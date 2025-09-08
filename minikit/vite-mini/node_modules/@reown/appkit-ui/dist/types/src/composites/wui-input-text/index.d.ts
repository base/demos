import { LitElement } from 'lit';
import { type Ref } from 'lit/directives/ref.js';
import '../../components/wui-icon/index.js';
import type { IconType, InputType, SizeType, SpacingType } from '../../utils/TypeUtil.js';
export declare class WuiInputText extends LitElement {
    static styles: import("lit").CSSResult[];
    inputElementRef: Ref<HTMLInputElement>;
    size: Exclude<SizeType, 'inherit' | 'xs' | 'xxs'>;
    icon?: IconType;
    disabled: boolean;
    placeholder: string;
    type: InputType;
    keyHint?: HTMLInputElement['enterKeyHint'];
    value?: string;
    inputRightPadding?: SpacingType;
    tabIdx?: number;
    render(): import("lit").TemplateResult<1>;
    private templateIcon;
    private dispatchInputChangeEvent;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-input-text': WuiInputText;
    }
}

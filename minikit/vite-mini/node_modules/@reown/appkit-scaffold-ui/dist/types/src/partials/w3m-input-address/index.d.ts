import { LitElement } from 'lit';
import type { Ref } from 'lit/directives/ref.js';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
export declare class W3mInputAddress extends LitElement {
    static styles: import("lit").CSSResult;
    inputElementRef: Ref<HTMLInputElement>;
    instructionElementRef: Ref<HTMLElement>;
    value?: string;
    private instructionHidden;
    private pasting;
    protected firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private focusInput;
    private focusInstruction;
    private toggleInstructionFocus;
    private onBoxClick;
    private onBlur;
    private checkHidden;
    private onPasteClick;
    private onInputChange;
    private onDebouncedSearch;
    private setReceiverAddress;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-input-address': W3mInputAddress;
    }
}

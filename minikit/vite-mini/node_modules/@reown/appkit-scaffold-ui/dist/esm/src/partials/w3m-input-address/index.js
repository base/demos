var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ChainController, ConnectionController, CoreHelperUtil, SendController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-button';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mInputAddress = class W3mInputAddress extends LitElement {
    constructor() {
        super(...arguments);
        this.inputElementRef = createRef();
        this.instructionElementRef = createRef();
        this.instructionHidden = Boolean(this.value);
        this.pasting = false;
        this.onDebouncedSearch = CoreHelperUtil.debounce(async (value) => {
            if (!value.length) {
                this.setReceiverAddress('');
                return;
            }
            const activeChain = ChainController.state.activeChain;
            const isValidAddress = CoreHelperUtil.isAddress(value, activeChain);
            if (isValidAddress) {
                this.setReceiverAddress(value);
                return;
            }
            try {
                const resolvedAddress = await ConnectionController.getEnsAddress(value);
                if (resolvedAddress) {
                    SendController.setReceiverProfileName(value);
                    SendController.setReceiverAddress(resolvedAddress);
                    const avatar = await ConnectionController.getEnsAvatar(value);
                    SendController.setReceiverProfileImageUrl(avatar || undefined);
                }
            }
            catch (error) {
                this.setReceiverAddress(value);
            }
            finally {
                SendController.setLoading(false);
            }
        });
    }
    firstUpdated() {
        if (this.value) {
            this.instructionHidden = true;
        }
        this.checkHidden();
    }
    render() {
        return html ` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="4xs"
      .padding=${['2xl', 'l', 'xl', 'l']}
    >
      <wui-text
        ${ref(this.instructionElementRef)}
        class="instruction"
        color="fg-300"
        variant="medium-400"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${ref(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value ?? ''}
        autocomplete="off"
      >
${this.value ?? ''}</textarea
      >
    </wui-flex>`;
    }
    async focusInput() {
        if (this.instructionElementRef.value) {
            this.instructionHidden = true;
            await this.toggleInstructionFocus(false);
            this.instructionElementRef.value.style.pointerEvents = 'none';
            this.inputElementRef.value?.focus();
            if (this.inputElementRef.value) {
                this.inputElementRef.value.selectionStart = this.inputElementRef.value.selectionEnd =
                    this.inputElementRef.value.value.length;
            }
        }
    }
    async focusInstruction() {
        if (this.instructionElementRef.value) {
            this.instructionHidden = false;
            await this.toggleInstructionFocus(true);
            this.instructionElementRef.value.style.pointerEvents = 'auto';
            this.inputElementRef.value?.blur();
        }
    }
    async toggleInstructionFocus(focus) {
        if (this.instructionElementRef.value) {
            await this.instructionElementRef.value.animate([{ opacity: focus ? 0 : 1 }, { opacity: focus ? 1 : 0 }], {
                duration: 100,
                easing: 'ease',
                fill: 'forwards'
            }).finished;
        }
    }
    onBoxClick() {
        if (!this.value && !this.instructionHidden) {
            this.focusInput();
        }
    }
    onBlur() {
        if (!this.value && this.instructionHidden && !this.pasting) {
            this.focusInstruction();
        }
    }
    checkHidden() {
        if (this.instructionHidden) {
            this.focusInput();
        }
    }
    async onPasteClick() {
        this.pasting = true;
        const text = await navigator.clipboard.readText();
        SendController.setReceiverAddress(text);
        this.focusInput();
    }
    onInputChange(e) {
        const element = e.target;
        this.pasting = false;
        this.value = e.target?.value;
        if (element.value && !this.instructionHidden) {
            this.focusInput();
        }
        SendController.setLoading(true);
        this.onDebouncedSearch(element.value);
    }
    setReceiverAddress(address) {
        SendController.setReceiverAddress(address);
        SendController.setReceiverProfileName(undefined);
        SendController.setReceiverProfileImageUrl(undefined);
        SendController.setLoading(false);
    }
};
W3mInputAddress.styles = styles;
__decorate([
    property()
], W3mInputAddress.prototype, "value", void 0);
__decorate([
    state()
], W3mInputAddress.prototype, "instructionHidden", void 0);
__decorate([
    state()
], W3mInputAddress.prototype, "pasting", void 0);
W3mInputAddress = __decorate([
    customElement('w3m-input-address')
], W3mInputAddress);
export { W3mInputAddress };
//# sourceMappingURL=index.js.map
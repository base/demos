var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { numbersRegex, specialCharactersRegex } from '../../utils/ConstantsUtil.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiInputAmount = class WuiInputAmount extends LitElement {
    constructor() {
        super(...arguments);
        this.inputElementRef = createRef();
        this.disabled = false;
        this.value = '';
        this.placeholder = '0';
    }
    render() {
        if (this.inputElementRef?.value && this.value) {
            this.inputElementRef.value.value = this.value;
        }
        return html `<input
      ${ref(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value ?? ''}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `;
    }
    dispatchInputChangeEvent(e) {
        const inputChar = e.data;
        if (inputChar && this.inputElementRef?.value) {
            if (inputChar === ',') {
                const inputValue = this.inputElementRef.value.value.replace(',', '.');
                this.inputElementRef.value.value = inputValue;
                this.value = `${this.value}${inputValue}`;
            }
            else if (!numbersRegex.test(inputChar)) {
                this.inputElementRef.value.value = this.value.replace(new RegExp(inputChar.replace(specialCharactersRegex, '\\$&'), 'gu'), '');
            }
        }
        this.dispatchEvent(new CustomEvent('inputChange', {
            detail: this.inputElementRef.value?.value,
            bubbles: true,
            composed: true
        }));
    }
};
WuiInputAmount.styles = [resetStyles, elementStyles, styles];
__decorate([
    property({ type: Boolean })
], WuiInputAmount.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], WuiInputAmount.prototype, "value", void 0);
__decorate([
    property({ type: String })
], WuiInputAmount.prototype, "placeholder", void 0);
WuiInputAmount = __decorate([
    customElement('wui-input-amount')
], WuiInputAmount);
export { WuiInputAmount };
//# sourceMappingURL=index.js.map
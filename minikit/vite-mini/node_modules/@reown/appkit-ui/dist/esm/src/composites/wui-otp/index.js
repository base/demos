var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../layout/wui-flex/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { UiHelperUtil } from '../../utils/UiHelperUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-input-numeric/index.js';
import { WuiInputNumeric } from '../wui-input-numeric/index.js';
import styles from './styles.js';
let WuiOtp = class WuiOtp extends LitElement {
    constructor() {
        super(...arguments);
        this.length = 6;
        this.otp = '';
        this.values = Array.from({ length: this.length }).map(() => '');
        this.numerics = [];
        this.shouldInputBeEnabled = (index) => {
            const previousInputs = this.values.slice(0, index);
            return previousInputs.every(input => input !== '');
        };
        this.handleKeyDown = (e, index) => {
            const inputElement = e.target;
            const input = this.getInputElement(inputElement);
            const keyArr = ['ArrowLeft', 'ArrowRight', 'Shift', 'Delete'];
            if (!input) {
                return;
            }
            if (keyArr.includes(e.key)) {
                e.preventDefault();
            }
            const currentCaretPos = input.selectionStart;
            switch (e.key) {
                case 'ArrowLeft':
                    if (currentCaretPos) {
                        input.setSelectionRange(currentCaretPos + 1, currentCaretPos + 1);
                    }
                    this.focusInputField('prev', index);
                    break;
                case 'ArrowRight':
                    this.focusInputField('next', index);
                    break;
                case 'Shift':
                    this.focusInputField('next', index);
                    break;
                case 'Delete':
                    if (input.value === '') {
                        this.focusInputField('prev', index);
                    }
                    else {
                        this.updateInput(input, index, '');
                    }
                    break;
                case 'Backspace':
                    if (input.value === '') {
                        this.focusInputField('prev', index);
                    }
                    else {
                        this.updateInput(input, index, '');
                    }
                    break;
                default:
            }
        };
        this.focusInputField = (dir, index) => {
            if (dir === 'next') {
                const nextIndex = index + 1;
                if (!this.shouldInputBeEnabled(nextIndex)) {
                    return;
                }
                const numeric = this.numerics[nextIndex < this.length ? nextIndex : index];
                const input = numeric ? this.getInputElement(numeric) : undefined;
                if (input) {
                    input.disabled = false;
                    input.focus();
                }
            }
            if (dir === 'prev') {
                const nextIndex = index - 1;
                const numeric = this.numerics[nextIndex > -1 ? nextIndex : index];
                const input = numeric ? this.getInputElement(numeric) : undefined;
                if (input) {
                    input.focus();
                }
            }
        };
    }
    firstUpdated() {
        if (this.otp) {
            this.values = this.otp.split('');
        }
        const numericElements = this.shadowRoot?.querySelectorAll('wui-input-numeric');
        if (numericElements) {
            this.numerics = Array.from(numericElements);
        }
        this.numerics[0]?.focus();
    }
    render() {
        return html `
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({ length: this.length }).map((_, index) => html `
            <wui-input-numeric
              @input=${(e) => this.handleInput(e, index)}
              @click=${(e) => this.selectInput(e)}
              @keydown=${(e) => this.handleKeyDown(e, index)}
              .disabled=${!this.shouldInputBeEnabled(index)}
              .value=${this.values[index] || ''}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `;
    }
    updateInput(element, index, value) {
        const numeric = this.numerics[index];
        const input = element || (numeric ? this.getInputElement(numeric) : undefined);
        if (input) {
            input.value = value;
            this.values = this.values.map((val, i) => (i === index ? value : val));
        }
    }
    selectInput(e) {
        const targetElement = e.target;
        if (targetElement) {
            const inputElement = this.getInputElement(targetElement);
            inputElement?.select();
        }
    }
    handleInput(e, index) {
        const inputElement = e.target;
        const input = this.getInputElement(inputElement);
        if (input) {
            const inputValue = input.value;
            if (e.inputType === 'insertFromPaste') {
                this.handlePaste(input, inputValue, index);
            }
            else {
                const isValid = UiHelperUtil.isNumber(inputValue);
                if (isValid && e.data) {
                    this.updateInput(input, index, e.data);
                    this.focusInputField('next', index);
                }
                else {
                    this.updateInput(input, index, '');
                }
            }
        }
        this.dispatchInputChangeEvent();
    }
    handlePaste(input, inputValue, index) {
        const value = inputValue[0];
        const isValid = value && UiHelperUtil.isNumber(value);
        if (isValid) {
            this.updateInput(input, index, value);
            const inputString = inputValue.substring(1);
            if (index + 1 < this.length && inputString.length) {
                const nextNumeric = this.numerics[index + 1];
                const nextInput = nextNumeric ? this.getInputElement(nextNumeric) : undefined;
                if (nextInput) {
                    this.handlePaste(nextInput, inputString, index + 1);
                }
            }
            else {
                this.focusInputField('next', index);
            }
        }
        else {
            this.updateInput(input, index, '');
        }
    }
    getInputElement(el) {
        if (el.shadowRoot?.querySelector('input')) {
            return el.shadowRoot.querySelector('input');
        }
        return null;
    }
    dispatchInputChangeEvent() {
        const value = this.values.join('');
        this.dispatchEvent(new CustomEvent('inputChange', {
            detail: value,
            bubbles: true,
            composed: true
        }));
    }
};
WuiOtp.styles = [resetStyles, styles];
__decorate([
    property({ type: Number })
], WuiOtp.prototype, "length", void 0);
__decorate([
    property({ type: String })
], WuiOtp.prototype, "otp", void 0);
__decorate([
    state()
], WuiOtp.prototype, "values", void 0);
WuiOtp = __decorate([
    customElement('wui-otp')
], WuiOtp);
export { WuiOtp };
//# sourceMappingURL=index.js.map
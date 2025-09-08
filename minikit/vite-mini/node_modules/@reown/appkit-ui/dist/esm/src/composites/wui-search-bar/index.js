var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import '../../composites/wui-input-element/index.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import '../wui-input-text/index.js';
import styles from './styles.js';
let WuiSearchBar = class WuiSearchBar extends LitElement {
    constructor() {
        super(...arguments);
        this.inputComponentRef = createRef();
    }
    render() {
        return html `
      <wui-input-text
        ${ref(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `;
    }
    clearValue() {
        const inputComponent = this.inputComponentRef.value;
        const inputElement = inputComponent?.inputElementRef.value;
        if (inputElement) {
            inputElement.value = '';
            inputElement.focus();
            inputElement.dispatchEvent(new Event('input'));
        }
    }
};
WuiSearchBar.styles = [resetStyles, styles];
WuiSearchBar = __decorate([
    customElement('wui-search-bar')
], WuiSearchBar);
export { WuiSearchBar };
//# sourceMappingURL=index.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-icon/index.js';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
const MAX_HEIGHT = 100;
let WuiListAccordion = class WuiListAccordion extends LitElement {
    constructor() {
        super(...arguments);
        this.textTitle = '';
        this.overflowedContent = '';
        this.toggled = false;
        this.enableAccordion = false;
        this.scrollElement = undefined;
        this.scrollHeightElement = 0;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('textTitle') || changedProperties.has('overflowedContent')) {
            setTimeout(() => {
                this.checkHeight();
            }, 1);
        }
    }
    checkHeight() {
        this.updateComplete.then(() => {
            const heightElement = this.shadowRoot?.querySelector('.heightContent');
            const textElement = this.shadowRoot?.querySelector('.textContent');
            if (heightElement && textElement) {
                this.scrollElement = heightElement;
                const scrollHeight = textElement?.scrollHeight;
                if (scrollHeight && scrollHeight > MAX_HEIGHT) {
                    this.enableAccordion = true;
                    this.scrollHeightElement = scrollHeight;
                    this.requestUpdate();
                }
            }
        });
    }
    render() {
        return html `
      <button @click=${() => this.onClick()}>
        <wui-flex justifyContent="space-between" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-100">${this.textTitle}</wui-text>
          ${this.chevronTemplate()}
        </wui-flex>
        <div
          data-active=${this.enableAccordion ? Boolean(this.toggled) : true}
          class="overflowedContent"
        >
          <div class="heightContent">
            <wui-text class="textContent" variant="paragraph-400" color="fg-200">
              <pre>${this.overflowedContent}</pre>
            </wui-text>
          </div>
        </div>
      </button>
    `;
    }
    onClick() {
        const icon = this.shadowRoot?.querySelector('wui-icon');
        if (this.enableAccordion) {
            this.toggled = !this.toggled;
            this.requestUpdate();
            if (this.scrollElement) {
                this.scrollElement.animate([
                    { maxHeight: this.toggled ? `${MAX_HEIGHT}px` : `${this.scrollHeightElement}px` },
                    { maxHeight: this.toggled ? `${this.scrollHeightElement}px` : `${MAX_HEIGHT}px` }
                ], {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'ease'
                });
            }
            if (icon) {
                icon.animate([
                    { transform: this.toggled ? `rotate(0deg)` : `rotate(180deg)` },
                    { transform: this.toggled ? `rotate(180deg)` : `rotate(0deg)` }
                ], {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'ease'
                });
            }
        }
    }
    chevronTemplate() {
        if (this.enableAccordion) {
            return html ` <wui-icon color="fg-100" size="sm" name="chevronBottom"></wui-icon>`;
        }
        return null;
    }
};
WuiListAccordion.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiListAccordion.prototype, "textTitle", void 0);
__decorate([
    property()
], WuiListAccordion.prototype, "overflowedContent", void 0);
WuiListAccordion = __decorate([
    customElement('wui-list-accordion')
], WuiListAccordion);
export { WuiListAccordion };
//# sourceMappingURL=index.js.map
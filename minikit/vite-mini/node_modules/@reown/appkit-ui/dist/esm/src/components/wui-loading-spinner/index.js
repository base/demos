var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
let WuiLoadingSpinner = class WuiLoadingSpinner extends LitElement {
    constructor() {
        super(...arguments);
        this.color = 'accent-100';
        this.size = 'lg';
    }
    render() {
        this.style.cssText = `--local-color: ${this.color === 'inherit' ? 'inherit' : `var(--wui-color-${this.color})`}`;
        this.dataset['size'] = this.size;
        return html `<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`;
    }
};
WuiLoadingSpinner.styles = [resetStyles, styles];
__decorate([
    property()
], WuiLoadingSpinner.prototype, "color", void 0);
__decorate([
    property()
], WuiLoadingSpinner.prototype, "size", void 0);
WuiLoadingSpinner = __decorate([
    customElement('wui-loading-spinner')
], WuiLoadingSpinner);
export { WuiLoadingSpinner };
//# sourceMappingURL=index.js.map
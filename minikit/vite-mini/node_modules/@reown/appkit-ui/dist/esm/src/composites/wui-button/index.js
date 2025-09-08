var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../components/wui-loading-spinner/index.js';
import '../../components/wui-text/index.js';
import { elementStyles, resetStyles } from '../../utils/ThemeUtil.js';
import { customElement } from '../../utils/WebComponentsUtil.js';
import styles from './styles.js';
const SPINNER_COLOR_BY_VARIANT = {
    main: 'inverse-100',
    inverse: 'inverse-000',
    accent: 'accent-100',
    'accent-error': 'error-100',
    'accent-success': 'success-100',
    neutral: 'fg-100',
    disabled: 'gray-glass-020'
};
const TEXT_VARIANT_BY_SIZE = {
    lg: 'paragraph-600',
    md: 'small-600'
};
const SPINNER_SIZE_BY_SIZE = {
    lg: 'md',
    md: 'md'
};
let WuiButton = class WuiButton extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'lg';
        this.disabled = false;
        this.fullWidth = false;
        this.loading = false;
        this.variant = 'main';
        this.hasIconLeft = false;
        this.hasIconRight = false;
        this.borderRadius = 'm';
    }
    render() {
        this.style.cssText = `
    --local-width: ${this.fullWidth ? '100%' : 'auto'};
    --local-opacity-100: ${this.loading ? 0 : 1};
    --local-opacity-000: ${this.loading ? 1 : 0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;
        const textVariant = this.textVariant ?? TEXT_VARIANT_BY_SIZE[this.size];
        return html `
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${() => this.handleSlotLeftChange()}></slot>
        <wui-text variant=${textVariant} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${() => this.handleSlotRightChange()}></slot>
      </button>
    `;
    }
    handleSlotLeftChange() {
        this.hasIconLeft = true;
    }
    handleSlotRightChange() {
        this.hasIconRight = true;
    }
    loadingTemplate() {
        if (this.loading) {
            const size = SPINNER_SIZE_BY_SIZE[this.size];
            const color = this.disabled
                ? SPINNER_COLOR_BY_VARIANT['disabled']
                : SPINNER_COLOR_BY_VARIANT[this.variant];
            return html `<wui-loading-spinner color=${color} size=${size}></wui-loading-spinner>`;
        }
        return html ``;
    }
};
WuiButton.styles = [resetStyles, elementStyles, styles];
__decorate([
    property()
], WuiButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "fullWidth", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "loading", void 0);
__decorate([
    property()
], WuiButton.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "hasIconLeft", void 0);
__decorate([
    property({ type: Boolean })
], WuiButton.prototype, "hasIconRight", void 0);
__decorate([
    property()
], WuiButton.prototype, "borderRadius", void 0);
__decorate([
    property()
], WuiButton.prototype, "textVariant", void 0);
WuiButton = __decorate([
    customElement('wui-button')
], WuiButton);
export { WuiButton };
//# sourceMappingURL=index.js.map
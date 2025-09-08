var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ModalController, RouterController, TooltipController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import styles from './styles.js';
let WuiTooltipTrigger = class WuiTooltipTrigger extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.text = '';
        this.open = TooltipController.state.open;
        this.unsubscribe.push(RouterController.subscribeKey('view', () => {
            TooltipController.hide();
        }), ModalController.subscribeKey('open', modalOpen => {
            if (!modalOpen) {
                TooltipController.hide();
            }
        }), TooltipController.subscribeKey('open', tooltipOpen => {
            this.open = tooltipOpen;
        }));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        TooltipController.hide();
    }
    render() {
        return html `
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `;
    }
    renderChildren() {
        return html `<slot></slot> `;
    }
    onMouseEnter() {
        const rect = this.getBoundingClientRect();
        if (!this.open) {
            TooltipController.showTooltip({
                message: this.text,
                triggerRect: {
                    width: rect.width,
                    height: rect.height,
                    left: rect.left,
                    top: rect.top
                },
                variant: 'shade'
            });
        }
    }
    onMouseLeave(event) {
        if (!this.contains(event.relatedTarget)) {
            TooltipController.hide();
        }
    }
};
WuiTooltipTrigger.styles = [styles];
__decorate([
    property()
], WuiTooltipTrigger.prototype, "text", void 0);
__decorate([
    state()
], WuiTooltipTrigger.prototype, "open", void 0);
WuiTooltipTrigger = __decorate([
    customElement('w3m-tooltip-trigger')
], WuiTooltipTrigger);
export { WuiTooltipTrigger };
//# sourceMappingURL=index.js.map
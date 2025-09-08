var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { TooltipController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-icon';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mTooltip = class W3mTooltip extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.open = TooltipController.state.open;
        this.message = TooltipController.state.message;
        this.triggerRect = TooltipController.state.triggerRect;
        this.variant = TooltipController.state.variant;
        this.unsubscribe.push(...[
            TooltipController.subscribe(newState => {
                this.open = newState.open;
                this.message = newState.message;
                this.triggerRect = newState.triggerRect;
                this.variant = newState.variant;
            })
        ]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        this.dataset['variant'] = this.variant;
        const topValue = this.triggerRect.top;
        const leftValue = this.triggerRect.left;
        this.style.cssText = `
    --w3m-tooltip-top: ${topValue}px;
    --w3m-tooltip-left: ${leftValue}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width / 2}px;
    --w3m-tooltip-display: ${this.open ? 'flex' : 'none'};
    --w3m-tooltip-opacity: ${this.open ? 1 : 0};
    `;
        return html `<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`;
    }
};
W3mTooltip.styles = [styles];
__decorate([
    state()
], W3mTooltip.prototype, "open", void 0);
__decorate([
    state()
], W3mTooltip.prototype, "message", void 0);
__decorate([
    state()
], W3mTooltip.prototype, "triggerRect", void 0);
__decorate([
    state()
], W3mTooltip.prototype, "variant", void 0);
W3mTooltip = __decorate([
    customElement('w3m-tooltip'),
    customElement('w3m-tooltip')
], W3mTooltip);
export { W3mTooltip };
//# sourceMappingURL=index.js.map
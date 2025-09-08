var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-visual';
let W3mHelpWidget = class W3mHelpWidget extends LitElement {
    constructor() {
        super(...arguments);
        this.data = [];
    }
    render() {
        return html `
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(item => html `
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${item.images.map(image => html `<wui-visual name=${image}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${item.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${item.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `;
    }
};
__decorate([
    property({ type: Array })
], W3mHelpWidget.prototype, "data", void 0);
W3mHelpWidget = __decorate([
    customElement('w3m-help-widget')
], W3mHelpWidget);
export { W3mHelpWidget };
//# sourceMappingURL=index.js.map
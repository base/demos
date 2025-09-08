var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '../w3m-all-wallets-widget/index.js';
import '../w3m-connector-list/index.js';
let W3mWalletLoginList = class W3mWalletLoginList extends LitElement {
    constructor() {
        super(...arguments);
        this.tabIdx = undefined;
    }
    render() {
        return html `
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${ifDefined(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${ifDefined(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `;
    }
};
__decorate([
    property()
], W3mWalletLoginList.prototype, "tabIdx", void 0);
W3mWalletLoginList = __decorate([
    customElement('w3m-wallet-login-list')
], W3mWalletLoginList);
export { W3mWalletLoginList };
//# sourceMappingURL=index.js.map
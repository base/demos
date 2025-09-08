var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ApiController, CoreHelperUtil, OptionsController, StorageUtil } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '../../partials/w3m-all-wallets-widget/index.js';
import '../../partials/w3m-connector-list/index.js';
import '../w3m-connecting-wc-view/index.js';
let W3mConnectingWcBasicView = class W3mConnectingWcBasicView extends LitElement {
    constructor() {
        super(...arguments);
        this.isMobile = CoreHelperUtil.isMobile();
    }
    render() {
        if (this.isMobile) {
            const { featured, recommended } = ApiController.state;
            const { customWallets } = OptionsController.state;
            const recent = StorageUtil.getRecentWallets();
            const showConnectors = featured.length || recommended.length || customWallets?.length || recent.length;
            return html `<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${['3xs', 's', 's', 's']}
      >
        ${showConnectors ? html `<w3m-connector-list></w3m-connector-list>` : null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`;
        }
        return html `<wui-flex flexDirection="column" .padding=${['0', '0', 'l', '0']}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${['0', 'm', '0', 'm']}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`;
    }
};
__decorate([
    state()
], W3mConnectingWcBasicView.prototype, "isMobile", void 0);
W3mConnectingWcBasicView = __decorate([
    customElement('w3m-connecting-wc-basic-view')
], W3mConnectingWcBasicView);
export { W3mConnectingWcBasicView };
//# sourceMappingURL=index.js.map
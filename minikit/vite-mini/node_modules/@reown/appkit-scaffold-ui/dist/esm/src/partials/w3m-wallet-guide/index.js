var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-chip';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-link';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mWalletGuide = class W3mWalletGuide extends LitElement {
    constructor() {
        super(...arguments);
        this.walletGuide = 'get-started';
    }
    render() {
        return this.walletGuide === 'explore'
            ? html `<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`
            : html `<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${['s', '0', 's', '0']}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${ifDefined(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`;
    }
    onGetStarted() {
        RouterController.push('Create');
    }
};
W3mWalletGuide.styles = styles;
__decorate([
    property()
], W3mWalletGuide.prototype, "tabIdx", void 0);
__decorate([
    property()
], W3mWalletGuide.prototype, "walletGuide", void 0);
W3mWalletGuide = __decorate([
    customElement('w3m-wallet-guide')
], W3mWalletGuide);
export { W3mWalletGuide };
//# sourceMappingURL=index.js.map
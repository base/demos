var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { AssetUtil, EventsController, RouterController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
import '../w3m-mobile-download-links/index.js';
let W3mConnectingWcUnsupported = class W3mConnectingWcUnsupported extends LitElement {
    constructor() {
        super();
        this.wallet = RouterController.state.data?.wallet;
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-unsupported: No wallet provided');
        }
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'browser' }
        });
    }
    render() {
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['3xl', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${ifDefined(AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
    }
};
W3mConnectingWcUnsupported = __decorate([
    customElement('w3m-connecting-wc-unsupported')
], W3mConnectingWcUnsupported);
export { W3mConnectingWcUnsupported };
//# sourceMappingURL=index.js.map
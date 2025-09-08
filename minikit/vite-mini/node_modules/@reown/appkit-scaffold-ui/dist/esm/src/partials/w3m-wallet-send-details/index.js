var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {} from '@reown/appkit-common';
import { AssetUtil, RouterController } from '@reown/appkit-controllers';
import { UiHelperUtil, customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-content';
import '@reown/appkit-ui/wui-text';
import styles from './styles.js';
let W3mWalletSendDetails = class W3mWalletSendDetails extends LitElement {
    render() {
        return html ` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content
          textTitle="Address"
          textValue=${UiHelperUtil.getTruncateString({
            string: this.receiverAddress ?? '',
            charsStart: 4,
            charsEnd: 4,
            truncate: 'middle'
        })}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`;
    }
    networkTemplate() {
        if (this.caipNetwork?.name) {
            return html ` <wui-list-content
        @click=${() => this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${ifDefined(AssetUtil.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`;
        }
        return null;
    }
    onNetworkClick(network) {
        if (network) {
            RouterController.push('Networks', { network });
        }
    }
};
W3mWalletSendDetails.styles = styles;
__decorate([
    property()
], W3mWalletSendDetails.prototype, "receiverAddress", void 0);
__decorate([
    property({ type: Object })
], W3mWalletSendDetails.prototype, "caipNetwork", void 0);
W3mWalletSendDetails = __decorate([
    customElement('w3m-wallet-send-details')
], W3mWalletSendDetails);
export { W3mWalletSendDetails };
//# sourceMappingURL=index.js.map
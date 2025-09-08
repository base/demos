var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ConstantsUtil } from '@reown/appkit-common';
import { AssetUtil, ConnectorController, CoreHelperUtil, RouterController, SnackController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import '@reown/appkit-ui/wui-flex';
import '@reown/appkit-ui/wui-list-wallet';
import '@reown/appkit-ui/wui-text';
import '@reown/appkit-ui/wui-wallet-image';
import styles from './styles.js';
let W3mConnectingMultiChainView = class W3mConnectingMultiChainView extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.activeConnector = ConnectorController.state.activeConnector;
        this.unsubscribe.push(...[ConnectorController.subscribeKey('activeConnector', val => (this.activeConnector = val))]);
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['m', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${ifDefined(AssetUtil.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${['0', 's', '0', 's']}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${['xs', '0', 'xs', '0']}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `;
    }
    networksTemplate() {
        return this.activeConnector?.connectors?.map(connector => connector.name
            ? html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getChainImage(connector.chain))}
              name=${ConstantsUtil.CHAIN_NAME_MAP[connector.chain]}
              @click=${() => this.onConnector(connector)}
              data-testid="wui-list-chain-${connector.chain}"
            ></wui-list-wallet>
          `
            : null);
    }
    onConnector(provider) {
        const connector = this.activeConnector?.connectors?.find(p => p.chain === provider.chain);
        if (!connector) {
            SnackController.showError('Failed to find connector');
            return;
        }
        if (connector.id === 'walletConnect') {
            if (CoreHelperUtil.isMobile()) {
                RouterController.push('AllWallets');
            }
            else {
                RouterController.push('ConnectingWalletConnect');
            }
        }
        else {
            RouterController.push('ConnectingExternal', {
                connector
            });
        }
    }
};
W3mConnectingMultiChainView.styles = styles;
__decorate([
    state()
], W3mConnectingMultiChainView.prototype, "activeConnector", void 0);
W3mConnectingMultiChainView = __decorate([
    customElement('w3m-connecting-multi-chain-view')
], W3mConnectingMultiChainView);
export { W3mConnectingMultiChainView };
//# sourceMappingURL=index.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ConnectionController, ConnectorController, EventsController, ModalController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
let W3mConnectingWcBrowser = class W3mConnectingWcBrowser extends W3mConnectingWidget {
    constructor() {
        super();
        if (!this.wallet) {
            throw new Error('w3m-connecting-wc-browser: No wallet provided');
        }
        this.onConnect = this.onConnectProxy.bind(this);
        this.onAutoConnect = this.onConnectProxy.bind(this);
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet.name, platform: 'browser' }
        });
    }
    async onConnectProxy() {
        try {
            this.error = false;
            const { connectors } = ConnectorController.state;
            const connector = connectors.find(c => (c.type === 'ANNOUNCED' && c.info?.rdns === this.wallet?.rdns) ||
                c.type === 'INJECTED' ||
                c.name === this.wallet?.name);
            if (connector) {
                await ConnectionController.connectExternal(connector, connector.chain);
            }
            else {
                throw new Error('w3m-connecting-wc-browser: No connector found');
            }
            ModalController.close();
            EventsController.sendEvent({
                type: 'track',
                event: 'CONNECT_SUCCESS',
                properties: { method: 'browser', name: this.wallet?.name || 'Unknown' }
            });
        }
        catch (error) {
            EventsController.sendEvent({
                type: 'track',
                event: 'CONNECT_ERROR',
                properties: { message: error?.message ?? 'Unknown' }
            });
            this.error = true;
        }
    }
};
W3mConnectingWcBrowser = __decorate([
    customElement('w3m-connecting-wc-browser')
], W3mConnectingWcBrowser);
export { W3mConnectingWcBrowser };
//# sourceMappingURL=index.js.map
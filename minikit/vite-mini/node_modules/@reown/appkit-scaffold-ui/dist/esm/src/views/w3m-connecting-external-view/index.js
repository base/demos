var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ChainController, ConnectionController, EventsController, ModalController } from '@reown/appkit-controllers';
import { customElement } from '@reown/appkit-ui';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
let W3mConnectingExternalView = class W3mConnectingExternalView extends W3mConnectingWidget {
    constructor() {
        super();
        this.externalViewUnsubscribe = [];
        if (!this.connector) {
            throw new Error('w3m-connecting-view: No connector provided');
        }
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: {
                name: this.connector.name ?? 'Unknown',
                platform: 'browser'
            }
        });
        this.onConnect = this.onConnectProxy.bind(this);
        this.onAutoConnect = this.onConnectProxy.bind(this);
        this.isWalletConnect = false;
        this.externalViewUnsubscribe.push(ChainController.subscribeKey('activeCaipAddress', val => {
            if (val) {
                ModalController.close();
            }
        }));
    }
    disconnectedCallback() {
        this.externalViewUnsubscribe.forEach(unsubscribe => unsubscribe());
    }
    async onConnectProxy() {
        try {
            this.error = false;
            if (this.connector) {
                if (this.connector.id !== CommonConstantsUtil.CONNECTOR_ID.COINBASE_SDK || !this.error) {
                    await ConnectionController.connectExternal(this.connector, this.connector.chain);
                    EventsController.sendEvent({
                        type: 'track',
                        event: 'CONNECT_SUCCESS',
                        properties: { method: 'browser', name: this.connector.name || 'Unknown' }
                    });
                }
            }
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
W3mConnectingExternalView = __decorate([
    customElement('w3m-connecting-external-view')
], W3mConnectingExternalView);
export { W3mConnectingExternalView };
//# sourceMappingURL=index.js.map
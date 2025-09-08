import UniversalProvider from '@walletconnect/universal-provider';
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { W3mFrameRpcConstants } from '@reown/appkit-wallet/utils';
import { AccountController } from '../controllers/AccountController.js';
import { ChainController } from '../controllers/ChainController.js';
import { ConnectionController } from '../controllers/ConnectionController.js';
import { ConnectorController } from '../controllers/ConnectorController.js';
import { EventsController } from '../controllers/EventsController.js';
import { ModalController } from '../controllers/ModalController.js';
import { OptionsController } from '../controllers/OptionsController.js';
import { RouterController } from '../controllers/RouterController.js';
import { SnackController } from '../controllers/SnackController.js';
import { CoreHelperUtil } from './CoreHelperUtil.js';
/**
 * SIWXUtil holds the methods to interact with the SIWX plugin and must be called internally on AppKit.
 */
export const SIWXUtil = {
    getSIWX() {
        return OptionsController.state.siwx;
    },
    async initializeIfEnabled() {
        const siwx = OptionsController.state.siwx;
        const caipAddress = ChainController.getActiveCaipAddress();
        if (!(siwx && caipAddress)) {
            return;
        }
        const [namespace, chainId, address] = caipAddress.split(':');
        if (!ChainController.checkIfSupportedNetwork(namespace)) {
            return;
        }
        try {
            const sessions = await siwx.getSessions(`${namespace}:${chainId}`, address);
            if (sessions.length) {
                return;
            }
            await ModalController.open({
                view: 'SIWXSignMessage'
            });
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('SIWXUtil:initializeIfEnabled', error);
            EventsController.sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_ERROR',
                properties: this.getSIWXEventProperties()
            });
            // eslint-disable-next-line no-console
            await ConnectionController._getClient()?.disconnect().catch(console.error);
            RouterController.reset('Connect');
            SnackController.showError('A problem occurred while trying initialize authentication');
        }
    },
    async requestSignMessage() {
        const siwx = OptionsController.state.siwx;
        const address = CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress());
        const network = ChainController.getActiveCaipNetwork();
        const client = ConnectionController._getClient();
        if (!siwx) {
            throw new Error('SIWX is not enabled');
        }
        if (!address) {
            throw new Error('No ActiveCaipAddress found');
        }
        if (!network) {
            throw new Error('No ActiveCaipNetwork or client found');
        }
        if (!client) {
            throw new Error('No ConnectionController client found');
        }
        try {
            const siwxMessage = await siwx.createMessage({
                chainId: network.caipNetworkId,
                accountAddress: address
            });
            const message = siwxMessage.toString();
            const connectorId = ConnectorController.getConnectorId(network.chainNamespace);
            if (connectorId === CommonConstantsUtil.CONNECTOR_ID.AUTH) {
                RouterController.pushTransactionStack({});
            }
            const signature = await client.signMessage(message);
            await siwx.addSession({
                data: siwxMessage,
                message,
                signature: signature
            });
            ModalController.close();
            EventsController.sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_SUCCESS',
                properties: this.getSIWXEventProperties()
            });
        }
        catch (error) {
            const properties = this.getSIWXEventProperties();
            if (!ModalController.state.open || RouterController.state.view === 'ApproveTransaction') {
                await ModalController.open({
                    view: 'SIWXSignMessage'
                });
            }
            if (properties.isSmartAccount) {
                SnackController.showError('This application might not support Smart Accounts');
            }
            else {
                SnackController.showError('Signature declined');
            }
            EventsController.sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_ERROR',
                properties
            });
            // eslint-disable-next-line no-console
            console.error('SWIXUtil:requestSignMessage', error);
        }
    },
    async cancelSignMessage() {
        try {
            const siwx = this.getSIWX();
            const isRequired = siwx?.getRequired?.();
            if (isRequired) {
                await ConnectionController.disconnect();
            }
            else {
                ModalController.close();
            }
            RouterController.reset('Connect');
            EventsController.sendEvent({
                event: 'CLICK_CANCEL_SIWX',
                type: 'track',
                properties: this.getSIWXEventProperties()
            });
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('SIWXUtil:cancelSignMessage', error);
        }
    },
    async getSessions() {
        const siwx = OptionsController.state.siwx;
        const address = CoreHelperUtil.getPlainAddress(ChainController.getActiveCaipAddress());
        const network = ChainController.getActiveCaipNetwork();
        if (!(siwx && address && network)) {
            return [];
        }
        return siwx.getSessions(network.caipNetworkId, address);
    },
    async isSIWXCloseDisabled() {
        const siwx = this.getSIWX();
        if (siwx) {
            const isApproveSignScreen = RouterController.state.view === 'ApproveTransaction';
            const isSiwxSignMessage = RouterController.state.view === 'SIWXSignMessage';
            if (isApproveSignScreen || isSiwxSignMessage) {
                return siwx.getRequired?.() && (await this.getSessions()).length === 0;
            }
        }
        return false;
    },
    async universalProviderAuthenticate({ universalProvider, chains, methods }) {
        const siwx = SIWXUtil.getSIWX();
        const namespaces = new Set(chains.map(chain => chain.split(':')[0]));
        if (!siwx || namespaces.size !== 1 || !namespaces.has('eip155')) {
            return false;
        }
        // Ignores chainId and account address to get other message data
        const siwxMessage = await siwx.createMessage({
            chainId: ChainController.getActiveCaipNetwork()?.caipNetworkId || '',
            accountAddress: ''
        });
        const result = await universalProvider.authenticate({
            nonce: siwxMessage.nonce,
            domain: siwxMessage.domain,
            uri: siwxMessage.uri,
            exp: siwxMessage.expirationTime,
            iat: siwxMessage.issuedAt,
            nbf: siwxMessage.notBefore,
            requestId: siwxMessage.requestId,
            version: siwxMessage.version,
            resources: siwxMessage.resources,
            statement: siwxMessage.statement,
            chainId: siwxMessage.chainId,
            methods,
            // The first chainId is what is used for universal provider to build the message
            chains: [siwxMessage.chainId, ...chains.filter(chain => chain !== siwxMessage.chainId)]
        });
        SnackController.showLoading('Authenticating...', { autoClose: false });
        AccountController.setConnectedWalletInfo({
            ...result.session.peer.metadata,
            name: result.session.peer.metadata.name,
            icon: result.session.peer.metadata.icons?.[0],
            type: 'WALLET_CONNECT'
        }, Array.from(namespaces)[0]);
        if (result?.auths?.length) {
            const sessions = result.auths.map(cacao => {
                const message = universalProvider.client.formatAuthMessage({
                    request: cacao.p,
                    iss: cacao.p.iss
                });
                return {
                    data: {
                        ...cacao.p,
                        accountAddress: cacao.p.iss.split(':').slice(-1).join(''),
                        chainId: cacao.p.iss.split(':').slice(2, 4).join(':'),
                        uri: cacao.p.aud,
                        version: cacao.p.version || siwxMessage.version,
                        expirationTime: cacao.p.exp,
                        issuedAt: cacao.p.iat,
                        notBefore: cacao.p.nbf
                    },
                    message,
                    signature: cacao.s.s,
                    cacao
                };
            });
            try {
                await siwx.setSessions(sessions);
                EventsController.sendEvent({
                    type: 'track',
                    event: 'SIWX_AUTH_SUCCESS',
                    properties: SIWXUtil.getSIWXEventProperties()
                });
            }
            catch (error) {
                // eslint-disable-next-line no-console
                console.error('SIWX:universalProviderAuth - failed to set sessions', error);
                EventsController.sendEvent({
                    type: 'track',
                    event: 'SIWX_AUTH_ERROR',
                    properties: SIWXUtil.getSIWXEventProperties()
                });
                // eslint-disable-next-line no-console
                await universalProvider.disconnect().catch(console.error);
                throw error;
            }
            finally {
                SnackController.hide();
            }
        }
        return true;
    },
    getSIWXEventProperties() {
        const activeChainNamespace = ChainController.state.activeChain;
        return {
            network: ChainController.state.activeCaipNetwork?.caipNetworkId || '',
            isSmartAccount: AccountController.state.preferredAccountTypes?.[activeChainNamespace] ===
                W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        };
    },
    async clearSessions() {
        const siwx = this.getSIWX();
        if (siwx) {
            await siwx.setSessions([]);
        }
    }
};
//# sourceMappingURL=SIWXUtil.js.map
import { ConstantsUtil } from '@reown/appkit-common';
import { ApiController, ChainController, ConnectionController, ConnectorController, CoreHelperUtil, OptionsController, StorageUtil } from '@reown/appkit-controllers';
import { HelpersUtil } from '@reown/appkit-utils';
import { WalletUtil } from './WalletUtil.js';
export const ConnectorUtil = {
    getConnectorsByType(connectors, recommended, featured) {
        const { customWallets } = OptionsController.state;
        const recent = StorageUtil.getRecentWallets();
        const filteredRecommended = WalletUtil.filterOutDuplicateWallets(recommended);
        const filteredFeatured = WalletUtil.filterOutDuplicateWallets(featured);
        const multiChain = connectors.filter(connector => connector.type === 'MULTI_CHAIN');
        const announced = connectors.filter(connector => connector.type === 'ANNOUNCED');
        const injected = connectors.filter(connector => connector.type === 'INJECTED');
        const external = connectors.filter(connector => connector.type === 'EXTERNAL');
        return {
            custom: customWallets,
            recent,
            external,
            multiChain,
            announced,
            injected,
            recommended: filteredRecommended,
            featured: filteredFeatured
        };
    },
    showConnector(connector) {
        const rdns = connector.info?.rdns;
        const isRDNSExcluded = Boolean(rdns) &&
            ApiController.state.excludedWallets.some(wallet => Boolean(wallet.rdns) && wallet.rdns === rdns);
        const isNameExcluded = Boolean(connector.name) &&
            ApiController.state.excludedWallets.some(wallet => HelpersUtil.isLowerCaseMatch(wallet.name, connector.name));
        if (connector.type === 'INJECTED') {
            const isBrowserWallet = connector.name === 'Browser Wallet';
            if (isBrowserWallet) {
                if (!CoreHelperUtil.isMobile()) {
                    return false;
                }
                if (CoreHelperUtil.isMobile() && !rdns && !ConnectionController.checkInstalled()) {
                    return false;
                }
            }
            if (isRDNSExcluded || isNameExcluded) {
                return false;
            }
        }
        if ((connector.type === 'ANNOUNCED' || connector.type === 'EXTERNAL') &&
            (isRDNSExcluded || isNameExcluded)) {
            return false;
        }
        return true;
    },
    getIsConnectedWithWC() {
        const chains = Array.from(ChainController.state.chains.values());
        const isConnectedWithWC = chains.some(chain => {
            const connectorId = ConnectorController.getConnectorId(chain.namespace);
            return connectorId === ConstantsUtil.CONNECTOR_ID.WALLET_CONNECT;
        });
        return isConnectedWithWC;
    },
    getConnectorTypeOrder({ recommended, featured, custom, recent, announced, injected, multiChain, external, overriddenConnectors = OptionsController.state.features?.connectorTypeOrder ?? [] }) {
        const isConnectedWithWC = ConnectorUtil.getIsConnectedWithWC();
        const isWCEnabled = OptionsController.state.enableWalletConnect;
        const allConnectors = [
            { type: 'walletConnect', isEnabled: isWCEnabled && !isConnectedWithWC },
            { type: 'recent', isEnabled: recent.length > 0 },
            { type: 'injected', isEnabled: [...injected, ...announced, ...multiChain].length > 0 },
            { type: 'featured', isEnabled: featured.length > 0 },
            { type: 'custom', isEnabled: custom && custom.length > 0 },
            { type: 'external', isEnabled: external.length > 0 },
            { type: 'recommended', isEnabled: recommended.length > 0 }
        ];
        const enabledConnectors = allConnectors.filter(option => option.isEnabled);
        const enabledConnectorTypes = new Set(enabledConnectors.map(option => option.type));
        const prioritizedConnectors = overriddenConnectors
            .filter(type => enabledConnectorTypes.has(type))
            .map(type => ({ type, isEnabled: true }));
        const remainingConnectors = enabledConnectors.filter(({ type: enabledConnectorType }) => {
            const hasPrioritizedConnector = prioritizedConnectors.some(({ type: prioritizedConnectorType }) => prioritizedConnectorType === enabledConnectorType);
            return !hasPrioritizedConnector;
        });
        return Array.from(new Set([...prioritizedConnectors, ...remainingConnectors].map(({ type }) => type)));
    }
};
//# sourceMappingURL=ConnectorUtil.js.map
import { ConstantsUtil } from './ConstantsUtil.js';
export const NetworkUtil = {
    caipNetworkIdToNumber(caipnetworkId) {
        return caipnetworkId ? Number(caipnetworkId.split(':')[1]) : undefined;
    },
    parseEvmChainId(chainId) {
        return typeof chainId === 'string'
            ? this.caipNetworkIdToNumber(chainId)
            : chainId;
    },
    getNetworksByNamespace(networks, namespace) {
        return networks?.filter(network => network.chainNamespace === namespace) || [];
    },
    getFirstNetworkByNamespace(networks, namespace) {
        return this.getNetworksByNamespace(networks, namespace)[0];
    },
    getNetworkNameByCaipNetworkId(caipNetworks, caipNetworkId) {
        if (!caipNetworkId) {
            return undefined;
        }
        const caipNetwork = caipNetworks.find(network => network.caipNetworkId === caipNetworkId);
        if (caipNetwork) {
            return caipNetwork.name;
        }
        const [namespace] = caipNetworkId.split(':');
        return ConstantsUtil.CHAIN_NAME_MAP?.[namespace] || undefined;
    }
};
//# sourceMappingURL=NetworkUtil.js.map
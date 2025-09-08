import { fallback, http } from 'viem';
import { ConstantsUtil } from '@reown/appkit-common';
import { ChainController, StorageUtil } from '@reown/appkit-controllers';
import { PresetsUtil } from './PresetsUtil.js';
const RPC_URL_HOST = 'rpc.walletconnect.org';
export function getBlockchainApiRpcUrl(caipNetworkId, projectId) {
    const url = new URL('https://rpc.walletconnect.org/v1/');
    url.searchParams.set('chainId', caipNetworkId);
    url.searchParams.set('projectId', projectId);
    return url.toString();
}
const WC_HTTP_RPC_SUPPORTED_CHAINS = [
    'near:mainnet',
    'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    'eip155:1101',
    'eip155:56',
    'eip155:42161',
    'eip155:7777777',
    'eip155:59144',
    'eip155:324',
    'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    'eip155:5000',
    'solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz',
    'eip155:80084',
    'eip155:5003',
    'eip155:100',
    'eip155:8453',
    'eip155:42220',
    'eip155:1313161555',
    'eip155:17000',
    'eip155:1',
    'eip155:300',
    'eip155:1313161554',
    'eip155:1329',
    'eip155:84532',
    'eip155:421614',
    'eip155:11155111',
    'eip155:8217',
    'eip155:43114',
    'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
    'eip155:999999999',
    'eip155:11155420',
    'eip155:80002',
    'eip155:97',
    'eip155:43113',
    'eip155:137',
    'eip155:10',
    'eip155:1301',
    'bip122:000000000019d6689c085ae165831e93',
    'bip122:000000000933ea01ad0ee984209779ba'
];
export const CaipNetworksUtil = {
    extendRpcUrlWithProjectId(rpcUrl, projectId) {
        let isReownUrl = false;
        try {
            const url = new URL(rpcUrl);
            isReownUrl = url.host === RPC_URL_HOST;
        }
        catch (e) {
            isReownUrl = false;
        }
        if (isReownUrl) {
            const url = new URL(rpcUrl);
            if (!url.searchParams.has('projectId')) {
                url.searchParams.set('projectId', projectId);
            }
            return url.toString();
        }
        return rpcUrl;
    },
    isCaipNetwork(network) {
        return 'chainNamespace' in network && 'caipNetworkId' in network;
    },
    getChainNamespace(network) {
        if (this.isCaipNetwork(network)) {
            return network.chainNamespace;
        }
        return ConstantsUtil.CHAIN.EVM;
    },
    getCaipNetworkId(network) {
        if (this.isCaipNetwork(network)) {
            return network.caipNetworkId;
        }
        return `${ConstantsUtil.CHAIN.EVM}:${network.id}`;
    },
    getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId) {
        const defaultRpcUrl = caipNetwork.rpcUrls?.default?.http?.[0];
        if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetworkId)) {
            return getBlockchainApiRpcUrl(caipNetworkId, projectId);
        }
        return defaultRpcUrl || '';
    },
    extendCaipNetwork(caipNetwork, { customNetworkImageUrls, projectId, customRpcUrls }) {
        const chainNamespace = this.getChainNamespace(caipNetwork);
        const caipNetworkId = this.getCaipNetworkId(caipNetwork);
        const networkDefaultRpcUrl = caipNetwork.rpcUrls.default.http?.[0];
        const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId);
        const chainDefaultRpcUrl = caipNetwork?.rpcUrls?.['chainDefault']?.http?.[0] || networkDefaultRpcUrl;
        const customRpcUrlsOfNetwork = customRpcUrls?.[caipNetworkId]?.map(i => i.url) || [];
        const rpcUrls = [...customRpcUrlsOfNetwork, reownRpcUrl];
        const rpcUrlsWithoutReown = [...customRpcUrlsOfNetwork];
        if (chainDefaultRpcUrl && !rpcUrlsWithoutReown.includes(chainDefaultRpcUrl)) {
            rpcUrlsWithoutReown.push(chainDefaultRpcUrl);
        }
        return {
            ...caipNetwork,
            chainNamespace,
            caipNetworkId,
            assets: {
                imageId: PresetsUtil.NetworkImageIds[caipNetwork.id],
                imageUrl: customNetworkImageUrls?.[caipNetwork.id]
            },
            rpcUrls: {
                ...caipNetwork.rpcUrls,
                default: {
                    http: rpcUrls
                },
                chainDefault: {
                    http: rpcUrlsWithoutReown
                }
            }
        };
    },
    extendCaipNetworks(caipNetworks, { customNetworkImageUrls, projectId, customRpcUrls }) {
        return caipNetworks.map(caipNetwork => CaipNetworksUtil.extendCaipNetwork(caipNetwork, {
            customNetworkImageUrls,
            customRpcUrls,
            projectId
        }));
    },
    getViemTransport(caipNetwork, projectId, customRpcUrls) {
        const transports = [];
        customRpcUrls?.forEach(rpcUrl => {
            transports.push(http(rpcUrl.url, rpcUrl.config));
        });
        if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
            transports.push(http(getBlockchainApiRpcUrl(caipNetwork.caipNetworkId, projectId), {
                fetchOptions: {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            }));
        }
        caipNetwork?.rpcUrls?.default?.http?.forEach(rpcUrl => {
            transports.push(http(rpcUrl));
        });
        return fallback(transports);
    },
    extendWagmiTransports(caipNetwork, projectId, transport) {
        if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
            const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetwork.caipNetworkId, projectId);
            return fallback([transport, http(reownRpcUrl)]);
        }
        return transport;
    },
    getUnsupportedNetwork(caipNetworkId) {
        return {
            id: caipNetworkId.split(':')[1],
            caipNetworkId,
            name: ConstantsUtil.UNSUPPORTED_NETWORK_NAME,
            chainNamespace: caipNetworkId.split(':')[0],
            nativeCurrency: {
                name: '',
                decimals: 0,
                symbol: ''
            },
            rpcUrls: {
                default: {
                    http: []
                }
            }
        };
    },
    getCaipNetworkFromStorage(defaultCaipNetwork) {
        const caipNetworkIdFromStorage = StorageUtil.getActiveCaipNetworkId();
        const caipNetworks = ChainController.getAllRequestedCaipNetworks();
        const availableNamespaces = Array.from(ChainController.state.chains?.keys() || []);
        const namespace = caipNetworkIdFromStorage?.split(':')[0];
        const isNamespaceAvailable = namespace ? availableNamespaces.includes(namespace) : false;
        const caipNetwork = caipNetworks?.find(cn => cn.caipNetworkId === caipNetworkIdFromStorage);
        const isUnsupportedNetwork = isNamespaceAvailable && !caipNetwork && caipNetworkIdFromStorage;
        if (isUnsupportedNetwork) {
            return this.getUnsupportedNetwork(caipNetworkIdFromStorage);
        }
        if (caipNetwork) {
            return caipNetwork;
        }
        if (defaultCaipNetwork) {
            return defaultCaipNetwork;
        }
        return caipNetworks?.[0];
    }
};
//# sourceMappingURL=CaipNetworkUtil.js.map
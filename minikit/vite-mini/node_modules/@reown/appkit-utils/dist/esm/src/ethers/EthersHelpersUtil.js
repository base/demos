import { PresetsUtil } from '../PresetsUtil.js';
export const EthersHelpersUtil = {
    hexStringToNumber(value) {
        const string = value.startsWith('0x') ? value.slice(2) : value;
        const number = parseInt(string, 16);
        return number;
    },
    numberToHexString(value) {
        return `0x${value.toString(16)}`;
    },
    async getUserInfo(provider) {
        const [addresses, chainId] = await Promise.all([
            EthersHelpersUtil.getAddresses(provider),
            EthersHelpersUtil.getChainId(provider)
        ]);
        return { chainId, addresses };
    },
    async getChainId(provider) {
        const chainId = await provider.request({ method: 'eth_chainId' });
        return Number(chainId);
    },
    async getAddress(provider) {
        const [address] = await provider.request({ method: 'eth_accounts' });
        return address;
    },
    async getAddresses(provider) {
        const addresses = await provider.request({ method: 'eth_accounts' });
        return addresses;
    },
    async addEthereumChain(provider, caipNetwork) {
        const rpcUrls = caipNetwork.rpcUrls['chainDefault']?.http || [];
        await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: EthersHelpersUtil.numberToHexString(caipNetwork.id),
                    rpcUrls: [...rpcUrls],
                    chainName: caipNetwork.name,
                    nativeCurrency: {
                        name: caipNetwork.nativeCurrency.name,
                        decimals: caipNetwork.nativeCurrency.decimals,
                        symbol: caipNetwork.nativeCurrency.symbol
                    },
                    blockExplorerUrls: [caipNetwork.blockExplorers?.default.url],
                    iconUrls: [PresetsUtil.NetworkImageIds[caipNetwork.id]]
                }
            ]
        });
    }
};
//# sourceMappingURL=EthersHelpersUtil.js.map
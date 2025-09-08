export const mockExchanges = [
    {
        id: 'coinbase',
        name: 'Coinbase',
        imageUrl: 'https://example.com/coinbase.png'
    },
    {
        id: 'binance',
        name: 'Binance',
        imageUrl: 'https://example.com/binance.png'
    }
];
export const mockPaymentAsset = {
    network: 'eip155:1',
    asset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    metadata: {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    }
};
export const mockConnectionState = {
    status: 'connected',
    caipAddress: 'eip155:1:0x1234567890123456789012345678901234567890',
    connectedWalletInfo: {
        name: 'MetaMask',
        icon: 'https://example.com/metamask.png'
    }
};
export const mockRequestedCaipNetworks = [
    {
        id: 1,
        chainNamespace: 'eip155',
        caipNetworkId: 'eip155:1',
        name: 'Ethereum',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: {
            default: {
                http: ['https://ethereum.rpc.example']
            }
        }
    }
];
//# sourceMappingURL=State.js.map
import { ChainDisconnectedError, createTransport, hexToNumber, ProviderDisconnectedError, withRetry, withTimeout, } from 'viem';
export function unstable_connector(connector, config = {}) {
    const { type } = connector;
    const { key = 'connector', name = 'Connector', retryDelay } = config;
    return (parameters) => {
        const { chain, connectors } = parameters;
        const retryCount = config.retryCount ?? parameters.retryCount;
        const request = async ({ method, params }) => {
            const connector = connectors?.getState().find((c) => c.type === type);
            if (!connector)
                throw new ProviderDisconnectedError(new Error(`Could not find connector of type "${type}" in \`connectors\` passed to \`createConfig\`.`));
            const provider = (await connector.getProvider({
                chainId: chain?.id,
            }));
            if (!provider)
                throw new ProviderDisconnectedError(new Error('Provider is disconnected.'));
            // We are applying a retry & timeout strategy here as some injected wallets (e.g. MetaMask) fail to
            // immediately resolve a JSON-RPC request on page load.
            const chainId = hexToNumber(await withRetry(() => withTimeout(() => provider.request({ method: 'eth_chainId' }), {
                timeout: 100,
            })));
            if (chain && chainId !== chain.id)
                throw new ChainDisconnectedError(new Error(`The current chain of the connector (id: ${chainId}) does not match the target chain for the request (id: ${chain.id} – ${chain.name}).`));
            const body = { method, params };
            return provider.request(body);
        };
        return createTransport({
            key,
            name,
            request,
            retryCount,
            retryDelay,
            type: 'connector',
        });
    };
}
//# sourceMappingURL=connector.js.map
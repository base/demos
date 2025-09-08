import { ChainNotConfiguredError, } from '../errors/config.js';
import { SwitchChainNotSupportedError, } from '../errors/connector.js';
/** https://wagmi.sh/core/api/actions/switchChain */
export async function switchChain(config, parameters) {
    const { addEthereumChainParameter, chainId } = parameters;
    const connection = config.state.connections.get(parameters.connector?.uid ?? config.state.current);
    if (connection) {
        const connector = connection.connector;
        if (!connector.switchChain)
            throw new SwitchChainNotSupportedError({ connector });
        const chain = await connector.switchChain({
            addEthereumChainParameter,
            chainId,
        });
        return chain;
    }
    const chain = config.chains.find((x) => x.id === chainId);
    if (!chain)
        throw new ChainNotConfiguredError();
    config.setState((x) => ({ ...x, chainId }));
    return chain;
}
//# sourceMappingURL=switchChain.js.map
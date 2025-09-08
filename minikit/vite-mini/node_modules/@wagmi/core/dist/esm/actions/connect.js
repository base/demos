import { ConnectorAlreadyConnectedError, } from '../errors/config.js';
/** https://wagmi.sh/core/api/actions/connect */
export async function connect(config, parameters) {
    // "Register" connector if not already created
    let connector;
    if (typeof parameters.connector === 'function') {
        connector = config._internal.connectors.setup(parameters.connector);
    }
    else
        connector = parameters.connector;
    // Check if connector is already connected
    if (connector.uid === config.state.current)
        throw new ConnectorAlreadyConnectedError();
    try {
        config.setState((x) => ({ ...x, status: 'connecting' }));
        connector.emitter.emit('message', { type: 'connecting' });
        const { connector: _, ...rest } = parameters;
        const data = await connector.connect(rest);
        const accounts = data.accounts;
        connector.emitter.off('connect', config._internal.events.connect);
        connector.emitter.on('change', config._internal.events.change);
        connector.emitter.on('disconnect', config._internal.events.disconnect);
        await config.storage?.setItem('recentConnectorId', connector.id);
        config.setState((x) => ({
            ...x,
            connections: new Map(x.connections).set(connector.uid, {
                accounts,
                chainId: data.chainId,
                connector: connector,
            }),
            current: connector.uid,
            status: 'connected',
        }));
        return { accounts, chainId: data.chainId };
    }
    catch (error) {
        config.setState((x) => ({
            ...x,
            // Keep existing connector connected in case of error
            status: x.current ? 'connected' : 'disconnected',
        }));
        throw error;
    }
}
//# sourceMappingURL=connect.js.map
import { ConnectorNotConnectedError, } from '../errors/config.js';
/** https://wagmi.sh/core/api/actions/switchAccount */
export async function switchAccount(config, parameters) {
    const { connector } = parameters;
    const connection = config.state.connections.get(connector.uid);
    if (!connection)
        throw new ConnectorNotConnectedError();
    await config.storage?.setItem('recentConnectorId', connector.id);
    config.setState((x) => ({
        ...x,
        current: connector.uid,
    }));
    return {
        accounts: connection.accounts,
        chainId: connection.chainId,
    };
}
//# sourceMappingURL=switchAccount.js.map
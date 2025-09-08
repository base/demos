import { type TransportConfig } from 'viem';
import type { Connector, Transport } from '../createConfig.js';
export type ConnectorTransportConfig = {
    /** The key of the transport. */
    key?: TransportConfig['key'] | undefined;
    /** The name of the transport. */
    name?: TransportConfig['name'] | undefined;
    /** The max number of times to retry. */
    retryCount?: TransportConfig['retryCount'] | undefined;
    /** The base delay (in ms) between retries. */
    retryDelay?: TransportConfig['retryDelay'] | undefined;
};
export type ConnectorTransport = Transport;
export declare function unstable_connector(connector: Pick<Connector, 'type'>, config?: ConnectorTransportConfig): Transport<'connector'>;
//# sourceMappingURL=connector.d.ts.map
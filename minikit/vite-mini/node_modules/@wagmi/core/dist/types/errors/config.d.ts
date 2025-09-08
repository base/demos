import type { Address } from 'viem';
import type { Connector } from '../createConfig.js';
import { BaseError } from './base.js';
export type ChainNotConfiguredErrorType = ChainNotConfiguredError & {
    name: 'ChainNotConfiguredError';
};
export declare class ChainNotConfiguredError extends BaseError {
    name: string;
    constructor();
}
export type ConnectorAlreadyConnectedErrorType = ConnectorAlreadyConnectedError & {
    name: 'ConnectorAlreadyConnectedError';
};
export declare class ConnectorAlreadyConnectedError extends BaseError {
    name: string;
    constructor();
}
export type ConnectorNotConnectedErrorType = ConnectorNotConnectedError & {
    name: 'ConnectorNotConnectedError';
};
export declare class ConnectorNotConnectedError extends BaseError {
    name: string;
    constructor();
}
export type ConnectorNotFoundErrorType = ConnectorNotFoundError & {
    name: 'ConnectorNotFoundError';
};
export declare class ConnectorNotFoundError extends BaseError {
    name: string;
    constructor();
}
export type ConnectorAccountNotFoundErrorType = ConnectorAccountNotFoundError & {
    name: 'ConnectorAccountNotFoundError';
};
export declare class ConnectorAccountNotFoundError extends BaseError {
    name: string;
    constructor({ address, connector, }: {
        address: Address;
        connector: Connector;
    });
}
export type ConnectorChainMismatchErrorType = ConnectorAccountNotFoundError & {
    name: 'ConnectorChainMismatchError';
};
export declare class ConnectorChainMismatchError extends BaseError {
    name: string;
    constructor({ connectionChainId, connectorChainId, }: {
        connectionChainId: number;
        connectorChainId: number;
    });
}
export type ConnectorUnavailableReconnectingErrorType = ConnectorUnavailableReconnectingError & {
    name: 'ConnectorUnavailableReconnectingError';
};
export declare class ConnectorUnavailableReconnectingError extends BaseError {
    name: string;
    constructor({ connector }: {
        connector: {
            name: string;
        };
    });
}
//# sourceMappingURL=config.d.ts.map
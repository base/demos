import { BaseError } from './base.js';
export class ChainNotConfiguredError extends BaseError {
    constructor() {
        super('Chain not configured.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ChainNotConfiguredError'
        });
    }
}
export class ConnectorAlreadyConnectedError extends BaseError {
    constructor() {
        super('Connector already connected.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorAlreadyConnectedError'
        });
    }
}
export class ConnectorNotConnectedError extends BaseError {
    constructor() {
        super('Connector not connected.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorNotConnectedError'
        });
    }
}
export class ConnectorNotFoundError extends BaseError {
    constructor() {
        super('Connector not found.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorNotFoundError'
        });
    }
}
export class ConnectorAccountNotFoundError extends BaseError {
    constructor({ address, connector, }) {
        super(`Account "${address}" not found for connector "${connector.name}".`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorAccountNotFoundError'
        });
    }
}
export class ConnectorChainMismatchError extends BaseError {
    constructor({ connectionChainId, connectorChainId, }) {
        super(`The current chain of the connector (id: ${connectorChainId}) does not match the connection's chain (id: ${connectionChainId}).`, {
            metaMessages: [
                `Current Chain ID:  ${connectorChainId}`,
                `Expected Chain ID: ${connectionChainId}`,
            ],
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorChainMismatchError'
        });
    }
}
export class ConnectorUnavailableReconnectingError extends BaseError {
    constructor({ connector }) {
        super(`Connector "${connector.name}" unavailable while reconnecting.`, {
            details: [
                'During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uid`.',
                'All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.',
                'This error commonly occurs for connectors that asynchronously inject after reconnection has already started.',
            ].join(' '),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'ConnectorUnavailableReconnectingError'
        });
    }
}
//# sourceMappingURL=config.js.map
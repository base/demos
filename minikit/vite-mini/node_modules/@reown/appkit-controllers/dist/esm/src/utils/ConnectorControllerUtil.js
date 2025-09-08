import { ConnectorController } from '../controllers/ConnectorController.js';
/**
 * Checks if the given namespace is associated with the specified connector id.
 * @param namespace - The namespace to check.
 * @param connectorId - The connector id to compare against.
 * @returns True if the namespace is associated with the connector id, false otherwise.
 */
export function checkNamespaceConnectorId(namespace, connectorId) {
    return ConnectorController.getConnectorId(namespace) === connectorId;
}
//# sourceMappingURL=ConnectorControllerUtil.js.map
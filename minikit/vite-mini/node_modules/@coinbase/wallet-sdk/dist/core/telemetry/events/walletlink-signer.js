import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logHandshakeStarted = ({ method, correlationId, }) => {
    logEvent('walletlink_signer.handshake.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
    }, AnalyticsEventImportance.high);
};
export const logHandshakeError = ({ method, correlationId, errorMessage, }) => {
    logEvent('walletlink_signer.handshake.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        errorMessage,
    }, AnalyticsEventImportance.high);
};
export const logHandshakeCompleted = ({ method, correlationId, }) => {
    logEvent('walletlink_signer.handshake.completed', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
    }, AnalyticsEventImportance.high);
};
export const logRequestStarted = ({ method, correlationId, }) => {
    logEvent('walletlink_signer.request.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
    }, AnalyticsEventImportance.high);
};
export const logRequestError = ({ method, correlationId, errorMessage, }) => {
    logEvent('walletlink_signer.request.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        errorMessage,
    }, AnalyticsEventImportance.high);
};
export const logRequestCompleted = ({ method, correlationId, }) => {
    logEvent('walletlink_signer.request.completed', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
    }, AnalyticsEventImportance.high);
};
export const logWalletLinkConnectionConnectionFailed = () => {
    logEvent('walletlink_signer.walletlink_connection.connection_failed', {
        action: ActionType.measurement,
        componentType: ComponentType.unknown,
    }, AnalyticsEventImportance.high);
};
export const logWalletLinkConnectionFetchUnseenEventsFailed = () => {
    logEvent('walletlink_signer.walletlink_connection.fetch_unseen_events_failed', {
        action: ActionType.measurement,
        componentType: ComponentType.unknown,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=walletlink-signer.js.map
import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logRequestStarted = ({ method, correlationId, }) => {
    logEvent('provider.request.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        signerType: 'base-account',
        correlationId,
    }, AnalyticsEventImportance.high);
};
export const logRequestError = ({ method, correlationId, errorMessage, }) => {
    logEvent('provider.request.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        signerType: 'base-account',
        correlationId,
        errorMessage,
    }, AnalyticsEventImportance.high);
};
export const logRequestResponded = ({ method, correlationId, }) => {
    logEvent('provider.request.responded', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        signerType: 'base-account',
        correlationId,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=provider.js.map
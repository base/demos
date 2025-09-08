import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logSignerLoadedFromStorage = ({ signerType }) => {
    logEvent('provider.signer.loaded_from_storage', {
        action: ActionType.measurement,
        componentType: ComponentType.unknown,
        signerType,
    }, AnalyticsEventImportance.low);
};
export const logRequestStarted = ({ method, correlationId, }) => {
    logEvent('provider.request.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
    }, AnalyticsEventImportance.high);
};
export const logRequestError = ({ method, correlationId, signerType, errorMessage, }) => {
    logEvent('provider.request.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        signerType,
        correlationId,
        errorMessage,
    }, AnalyticsEventImportance.high);
};
export const logRequestResponded = ({ method, signerType, correlationId, }) => {
    logEvent('provider.request.responded', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        signerType,
        correlationId,
    }, AnalyticsEventImportance.high);
};
export const logEnableFunctionCalled = () => {
    logEvent('provider.enable_function.called', {
        action: ActionType.measurement,
        componentType: ComponentType.unknown,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=provider.js.map
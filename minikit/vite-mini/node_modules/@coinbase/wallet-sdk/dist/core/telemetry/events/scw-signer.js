import { store } from '../../../store/store.js';
import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logHandshakeStarted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_signer.handshake.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logHandshakeError = ({ method, correlationId, errorMessage, }) => {
    var _a;
    logEvent('scw_signer.handshake.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        errorMessage,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logHandshakeCompleted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_signer.handshake.completed', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logRequestStarted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_signer.request.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logRequestError = ({ method, correlationId, errorMessage, }) => {
    var _a;
    logEvent('scw_signer.request.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        errorMessage,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logRequestCompleted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_signer.request.completed', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=scw-signer.js.map
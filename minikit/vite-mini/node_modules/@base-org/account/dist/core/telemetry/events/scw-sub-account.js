import { store } from '../../../store/store.js';
import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logSubAccountRequestStarted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_sub_account.request.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logSubAccountRequestCompleted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_sub_account.request.completed', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logSubAccountRequestError = ({ method, correlationId, errorMessage, }) => {
    var _a;
    logEvent('scw_sub_account.request.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        errorMessage,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logAddOwnerStarted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_sub_account.add_owner.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logAddOwnerCompleted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_sub_account.add_owner.completed', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logAddOwnerError = ({ method, correlationId, errorMessage, }) => {
    var _a;
    logEvent('scw_sub_account.add_owner.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        errorMessage,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logInsufficientBalanceErrorHandlingStarted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_sub_account.insufficient_balance.error_handling.started', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logInsufficientBalanceErrorHandlingCompleted = ({ method, correlationId, }) => {
    var _a;
    logEvent('scw_sub_account.insufficient_balance.error_handling.completed', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
export const logInsufficientBalanceErrorHandlingError = ({ method, correlationId, errorMessage, }) => {
    var _a;
    logEvent('scw_sub_account.insufficient_balance.error_handling.error', {
        action: ActionType.error,
        componentType: ComponentType.unknown,
        method,
        correlationId,
        errorMessage,
        enableAutoSubAccounts: (_a = store.subAccountsConfig.get()) === null || _a === void 0 ? void 0 : _a.enableAutoSubAccounts,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=scw-sub-account.js.map
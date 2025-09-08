import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logSignerSelectionRequested = () => {
    logEvent('signer.selection.requested', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
    }, AnalyticsEventImportance.high);
};
export const logSignerSelectionResponded = (signerType) => {
    logEvent('signer.selection.responded', {
        action: ActionType.unknown,
        componentType: ComponentType.unknown,
        signerType,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=signer-selection.js.map
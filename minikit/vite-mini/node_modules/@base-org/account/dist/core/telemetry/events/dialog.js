import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logDialogShown = ({ dialogContext }) => {
    logEvent(`dialog.${dialogContext}.shown`, {
        action: ActionType.render,
        componentType: ComponentType.modal,
        dialogContext,
    }, AnalyticsEventImportance.high);
};
export const logDialogDismissed = ({ dialogContext }) => {
    logEvent(`dialog.${dialogContext}.dismissed`, {
        action: ActionType.dismiss,
        componentType: ComponentType.modal,
        dialogContext,
    }, AnalyticsEventImportance.high);
};
export const logDialogActionClicked = ({ dialogContext, dialogAction, }) => {
    logEvent(`dialog.${dialogContext}.action_clicked`, {
        action: ActionType.click,
        componentType: ComponentType.button,
        dialogContext,
        dialogAction,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=dialog.js.map
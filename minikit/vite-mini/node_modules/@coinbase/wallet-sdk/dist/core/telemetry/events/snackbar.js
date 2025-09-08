import { ActionType, AnalyticsEventImportance, ComponentType, logEvent } from '../logEvent.js';
export const logSnackbarShown = ({ snackbarContext }) => {
    logEvent(`snackbar.${snackbarContext}.shown`, {
        action: ActionType.render,
        componentType: ComponentType.modal,
        snackbarContext,
    }, AnalyticsEventImportance.high);
};
export const logSnackbarActionClicked = ({ snackbarContext, snackbarAction, }) => {
    logEvent(`snackbar.${snackbarContext}.action_clicked`, {
        action: ActionType.click,
        componentType: ComponentType.button,
        snackbarContext,
        snackbarAction,
    }, AnalyticsEventImportance.high);
};
//# sourceMappingURL=snackbar.js.map
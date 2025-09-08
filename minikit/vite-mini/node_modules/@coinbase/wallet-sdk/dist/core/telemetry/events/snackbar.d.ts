type SnackbarContext = 'popup_blocked' | 'sub_account_add_owner' | 'sub_account_insufficient_balance';
export declare const logSnackbarShown: ({ snackbarContext }: {
    snackbarContext: SnackbarContext;
}) => void;
type GenericSnackbarAction = 'confirm' | 'cancel';
type SubAccountInsufficientBalanceSnackbarAction = 'create_permission' | 'continue_in_popup';
export declare const logSnackbarActionClicked: ({ snackbarContext, snackbarAction, }: {
    snackbarContext: SnackbarContext;
    snackbarAction: GenericSnackbarAction | SubAccountInsufficientBalanceSnackbarAction;
}) => void;
export {};
//# sourceMappingURL=snackbar.d.ts.map
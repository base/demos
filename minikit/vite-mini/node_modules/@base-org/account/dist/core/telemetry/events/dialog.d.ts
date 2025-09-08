type DialogContext = 'popup_blocked' | 'sub_account_add_owner' | 'sub_account_insufficient_balance';
export declare const logDialogShown: ({ dialogContext }: {
    dialogContext: DialogContext;
}) => void;
export declare const logDialogDismissed: ({ dialogContext }: {
    dialogContext: DialogContext;
}) => void;
type GenericDialogAction = 'confirm' | 'cancel';
type SubAccountInsufficientBalanceDialogAction = 'create_permission' | 'continue_in_popup';
export declare const logDialogActionClicked: ({ dialogContext, dialogAction, }: {
    dialogContext: DialogContext;
    dialogAction: GenericDialogAction | SubAccountInsufficientBalanceDialogAction;
}) => void;
export {};
//# sourceMappingURL=dialog.d.ts.map
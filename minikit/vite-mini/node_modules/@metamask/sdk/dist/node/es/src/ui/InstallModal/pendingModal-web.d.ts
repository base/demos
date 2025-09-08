declare const sdkWebPendingModal: ({ onDisconnect, debug, }: {
    onDisconnect?: (() => void) | undefined;
    debug?: boolean | undefined;
}) => {
    mount: ({ displayOTP, }?: {
        displayOTP: boolean;
    }) => void;
    unmount: () => void;
    updateOTPValue: (otpValue: string) => void;
};
export default sdkWebPendingModal;
//# sourceMappingURL=pendingModal-web.d.ts.map
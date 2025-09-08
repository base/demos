import { h } from 'preact';
type ConnectDialogProps = {
    darkMode: boolean;
    version: string;
    sessionId: string;
    sessionSecret: string;
    linkAPIUrl: string;
    isOpen: boolean;
    isConnected: boolean;
    isParentConnection: boolean;
    chainId: number;
    connectDisabled: boolean;
    onCancel: (() => void) | null;
};
export declare const ConnectDialog: (props: ConnectDialogProps) => h.JSX.Element;
export {};

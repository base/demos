import { h } from 'preact';
import { Theme } from '../types';
type ConnectContentProps = {
    theme: Theme;
    version: string;
    sessionId: string;
    sessionSecret: string;
    linkAPIUrl: string;
    isConnected: boolean;
    isParentConnection: boolean;
    chainId: number;
    onCancel: (() => void) | null;
};
export declare function ConnectContent(props: ConnectContentProps): h.JSX.Element;
type WalletStepsProps = {
    theme: Theme;
};
export declare function CoinbaseWalletSteps({ theme }: WalletStepsProps): h.JSX.Element;
export {};

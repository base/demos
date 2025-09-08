import { ErrorHandler } from '../../../core/error';
import { RelayUI, RelayUIOptions } from '../../RelayUI';
export declare class WalletLinkRelayUI implements RelayUI {
    private readonly linkFlow;
    private readonly snackbar;
    private standalone;
    private attached;
    constructor(options: Readonly<RelayUIOptions>);
    attach(): void;
    setConnected(connected: boolean): void;
    setChainId(chainId: number): void;
    setConnectDisabled(connectDisabled: boolean): void;
    addEthereumChain(): void;
    watchAsset(): void;
    switchEthereumChain(): void;
    requestEthereumAccounts(options: {
        onCancel: ErrorHandler;
    }): void;
    hideRequestEthereumAccounts(): void;
    signEthereumMessage(): void;
    signEthereumTransaction(): void;
    submitEthereumTransaction(): void;
    ethereumAddressFromSignedMessage(): void;
    showConnecting(options: {
        isUnlinkedErrorState?: boolean;
        onCancel: ErrorHandler;
        onResetConnection: () => void;
    }): () => void;
    reloadUI(): void;
    inlineAccountsResponse(): boolean;
    inlineAddEthereumChain(): boolean;
    inlineWatchAsset(): boolean;
    inlineSwitchEthereumChain(): boolean;
    setStandalone(status: boolean): void;
    isStandalone(): boolean;
}

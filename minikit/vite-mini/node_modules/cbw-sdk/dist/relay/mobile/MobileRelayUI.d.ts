import { ErrorHandler } from '../../core/error';
import { RelayUI, RelayUIOptions } from '../RelayUI';
export declare class MobileRelayUI implements RelayUI {
    private readonly redirectDialog;
    private attached;
    private darkMode;
    constructor(options: Readonly<RelayUIOptions>);
    attach(): void;
    setConnected(_connected: boolean): void;
    private redirectToCoinbaseWallet;
    openCoinbaseWalletDeeplink(walletLinkUrl?: string): void;
    showConnecting(_options: {
        isUnlinkedErrorState?: boolean | undefined;
        onCancel: ErrorHandler;
        onResetConnection: () => void;
    }): () => void;
    hideRequestEthereumAccounts(): void;
    requestEthereumAccounts(): void;
    addEthereumChain(): void;
    watchAsset(): void;
    selectProvider?(): void;
    switchEthereumChain(): void;
    signEthereumMessage(): void;
    signEthereumTransaction(): void;
    submitEthereumTransaction(): void;
    ethereumAddressFromSignedMessage(): void;
    reloadUI(): void;
    setStandalone?(): void;
    setConnectDisabled(): void;
    inlineAccountsResponse(): boolean;
    inlineAddEthereumChain(): boolean;
    inlineWatchAsset(): boolean;
    inlineSwitchEthereumChain(): boolean;
    isStandalone(): boolean;
}

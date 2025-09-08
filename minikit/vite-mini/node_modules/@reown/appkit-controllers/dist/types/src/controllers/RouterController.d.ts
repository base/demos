import type { CaipNetwork, ChainNamespace } from '@reown/appkit-common';
import type { Connector, WcWallet } from '../utils/TypeUtil.js';
import type { SwapInputArguments, SwapInputTarget } from './SwapController.js';
type TransactionAction = {
    /**
     * Function to be called when the transaction is complete.
     */
    onSuccess?: () => void;
    /**
     * Function to be called when the transaction is cancelled.
     */
    onCancel?: () => void;
    /**
     * Function to be called when the transaction is failed.
     */
    onError?: () => void;
};
export interface RouterControllerState {
    view: 'Account' | 'AccountSettings' | 'AllWallets' | 'ApproveTransaction' | 'BuyInProgress' | 'WalletCompatibleNetworks' | 'ChooseAccountName' | 'Connect' | 'Create' | 'ConnectingExternal' | 'ConnectingFarcaster' | 'ConnectingWalletConnect' | 'ConnectingWalletConnectBasic' | 'ConnectingSiwe' | 'ConnectingSocial' | 'ConnectSocials' | 'ConnectWallets' | 'Downloads' | 'EmailLogin' | 'EmailVerifyOtp' | 'EmailVerifyDevice' | 'GetWallet' | 'Networks' | 'OnRampActivity' | 'OnRampFiatSelect' | 'OnRampProviders' | 'OnRampTokenSelect' | 'Profile' | 'RegisterAccountName' | 'RegisterAccountNameSuccess' | 'SwitchNetwork' | 'SwitchAddress' | 'Transactions' | 'UnsupportedChain' | 'UpdateEmailWallet' | 'UpdateEmailPrimaryOtp' | 'UpdateEmailSecondaryOtp' | 'UpgradeEmailWallet' | 'WalletReceive' | 'WalletSend' | 'WalletSendPreview' | 'WalletSendSelectToken' | 'WhatIsANetwork' | 'WhatIsAWallet' | 'WhatIsABuy' | 'Swap' | 'SwapSelectToken' | 'SwapPreview' | 'ConnectingMultiChain' | 'SwitchActiveChain' | 'SmartSessionCreated' | 'SmartSessionList' | 'SIWXSignMessage' | 'Pay' | 'PayLoading';
    history: RouterControllerState['view'][];
    data?: {
        connector?: Connector;
        wallet?: WcWallet;
        network?: CaipNetwork;
        email?: string;
        redirectView?: RouterControllerState['view'];
        newEmail?: string;
        target?: SwapInputTarget;
        swapUnsupportedChain?: boolean;
        connectors?: Connector[];
        switchToChain?: ChainNamespace;
        navigateTo?: RouterControllerState['view'];
        navigateWithReplace?: boolean;
        swap?: SwapInputArguments;
    };
    transactionStack: TransactionAction[];
}
type StateKey = keyof RouterControllerState;
export declare const RouterController: {
    state: RouterControllerState;
    subscribeKey<K extends StateKey>(key: K, callback: (value: RouterControllerState[K]) => void): () => void;
    pushTransactionStack(action: TransactionAction): void;
    popTransactionStack(status: "success" | "error" | "cancel"): void;
    push(view: RouterControllerState["view"], data?: RouterControllerState["data"]): void;
    reset(view: RouterControllerState["view"], data?: RouterControllerState["data"]): void;
    replace(view: RouterControllerState["view"], data?: RouterControllerState["data"]): void;
    goBack(): void;
    goBackToIndex(historyIndex: number): void;
    goBackOrCloseModal(): void;
};
export {};

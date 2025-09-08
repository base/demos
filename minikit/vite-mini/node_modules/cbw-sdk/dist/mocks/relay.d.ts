import { AddressString, HexString, ProviderType } from '../core/type';
import { RelayAbstract } from '../relay/RelayAbstract';
import { Session } from '../relay/Session';
import { Web3Method } from '../relay/walletlink/type/Web3Method';
import { Web3Response } from '../relay/walletlink/type/Web3Response';
export declare class MockRelayClass extends RelayAbstract {
    constructor();
    resetAndReload(): void;
    requestEthereumAccounts(): {
        cancel: () => void;
        promise: Promise<{
            method: "requestEthereumAccounts";
            result: AddressString[];
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    addEthereumChain(): {
        cancel: () => void;
        promise: Promise<{
            method: "addEthereumChain";
            result: {
                isApproved: boolean;
                rpcUrl: string;
            };
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    watchAsset(): {
        cancel: () => void;
        promise: Promise<{
            method: "watchAsset";
            result: boolean;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    selectProvider(): {
        cancel: () => void;
        promise: Promise<{
            method: "selectProvider";
            result: ProviderType;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    switchEthereumChain(): {
        cancel: () => void;
        promise: Promise<{
            method: "switchEthereumChain";
            result: {
                isApproved: boolean;
                rpcUrl: string;
            };
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    signEthereumMessage(): {
        cancel: () => void;
        promise: Promise<{
            method: "signEthereumMessage";
            result: HexString;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    ethereumAddressFromSignedMessage(): {
        cancel: () => void;
        promise: Promise<{
            method: "ethereumAddressFromSignedMessage";
            result: AddressString;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    signEthereumTransaction(): {
        cancel: () => void;
        promise: Promise<{
            method: "signEthereumTransaction";
            result: HexString;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    signAndSubmitEthereumTransaction(): {
        cancel: () => void;
        promise: Promise<{
            method: "submitEthereumTransaction";
            result: HexString;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    submitEthereumTransaction(): {
        cancel: () => void;
        promise: Promise<{
            method: "submitEthereumTransaction";
            result: HexString;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    scanQRCode(): {
        cancel: () => void;
        promise: Promise<{
            method: "scanQRCode";
            result: string;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    genericRequest(): {
        cancel: () => void;
        promise: Promise<{
            method: "generic";
            result: string;
        } | {
            method: unknown;
            errorCode?: number | undefined;
            errorMessage: string;
        }>;
    };
    sendRequest<_, T extends Web3Method>(): {
        cancel: () => void;
        promise: Promise<Web3Response<T>>;
    };
    setAppInfo(): void;
    inlineAddEthereumChain(): boolean;
    setAccountsCallback(): void;
    setChainCallback(): void;
    setDappDefaultChainCallback(): void;
    get session(): Session;
}

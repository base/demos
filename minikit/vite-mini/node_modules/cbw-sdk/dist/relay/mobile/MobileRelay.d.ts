import { CancelablePromise } from '../RelayAbstract';
import { WalletLinkResponseEventData } from '../walletlink/type/WalletLinkEventData';
import { Web3Request } from '../walletlink/type/Web3Request';
import { Web3Response } from '../walletlink/type/Web3Response';
import { WalletLinkRelay, WalletLinkRelayOptions } from '../walletlink/WalletLinkRelay';
export declare class MobileRelay extends WalletLinkRelay {
    private _enableMobileWalletLink;
    constructor(options: Readonly<WalletLinkRelayOptions>);
    requestEthereumAccounts(): CancelablePromise<Web3Response<'requestEthereumAccounts'>>;
    protected publishWeb3RequestEvent(id: string, request: Web3Request): void;
    handleWeb3ResponseMessage(message: WalletLinkResponseEventData): void;
    connectAndSignIn(params: {
        nonce: string;
        statement?: string;
        resources?: string[];
    }): CancelablePromise<Web3Response<'connectAndSignIn'>>;
}

import { Web3Response } from './walletlink/type/Web3Response';
type ResponseCallback = (response: Web3Response) => void;
export declare class RelayEventManager {
    _nextRequestId: number;
    callbacks: Map<string, ResponseCallback>;
    makeRequestId(): number;
}
export {};

import { Web3Response } from './type/Web3Response.js';
type ResponseCallback = (response: Web3Response) => void;
export declare class RelayEventManager {
    _nextRequestId: number;
    callbacks: Map<string, ResponseCallback>;
    makeRequestId(): number;
}
export {};
//# sourceMappingURL=RelayEventManager.d.ts.map
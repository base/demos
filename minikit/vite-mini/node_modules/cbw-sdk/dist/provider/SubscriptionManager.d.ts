import { EventEmitter } from 'eventemitter3';
import { Web3Provider } from './Web3Provider';
export interface SubscriptionResult {
    result?: unknown;
}
export interface SubscriptionNotification {
    method: string;
    params: {
        subscription: string;
        result: unknown;
    };
}
export declare class SubscriptionManager {
    private readonly subscriptionMiddleware;
    readonly events: EventEmitter;
    constructor(provider: Web3Provider & EventEmitter);
    handleRequest(request: {
        method: string;
        params: unknown[];
    }): Promise<SubscriptionResult>;
    destroy(): void;
}

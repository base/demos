import type { SafeEventEmitterProvider } from '@metamask/eth-json-rpc-provider';
import { BaseBlockTracker } from './BaseBlockTracker';
export interface SubscribeBlockTrackerOptions {
    provider?: SafeEventEmitterProvider;
    blockResetDuration?: number;
    usePastBlocks?: boolean;
}
export declare class SubscribeBlockTracker extends BaseBlockTracker {
    private _provider;
    private _subscriptionId;
    constructor(opts?: SubscribeBlockTrackerOptions);
    checkForLatestBlock(): Promise<string>;
    protected _start(): Promise<void>;
    protected _end(): Promise<void>;
    private _call;
    private _handleSubData;
}

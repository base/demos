import type { SafeEventEmitterProvider } from '@metamask/eth-json-rpc-provider';
import { BaseBlockTracker } from './BaseBlockTracker';
export interface PollingBlockTrackerOptions {
    provider?: SafeEventEmitterProvider;
    pollingInterval?: number;
    retryTimeout?: number;
    keepEventLoopActive?: boolean;
    setSkipCacheFlag?: boolean;
    blockResetDuration?: number;
    usePastBlocks?: boolean;
}
export declare class PollingBlockTracker extends BaseBlockTracker {
    private _provider;
    private _pollingInterval;
    private _retryTimeout;
    private _keepEventLoopActive;
    private _setSkipCacheFlag;
    constructor(opts?: PollingBlockTrackerOptions);
    checkForLatestBlock(): Promise<string>;
    protected _start(): Promise<void>;
    protected _end(): Promise<void>;
    private _synchronize;
    private _updateLatestBlock;
    private _fetchLatestBlock;
}

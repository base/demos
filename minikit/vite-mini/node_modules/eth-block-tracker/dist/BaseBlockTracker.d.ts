import SafeEventEmitter from '@metamask/safe-event-emitter';
interface BaseBlockTrackerArgs {
    blockResetDuration?: number;
    usePastBlocks?: boolean;
}
export declare abstract class BaseBlockTracker extends SafeEventEmitter {
    protected _isRunning: boolean;
    private _blockResetDuration;
    private _usePastBlocks;
    private _currentBlock;
    private _blockResetTimeout?;
    constructor(opts: BaseBlockTrackerArgs);
    destroy(): Promise<void>;
    isRunning(): boolean;
    getCurrentBlock(): string | null;
    getLatestBlock(): Promise<string>;
    removeAllListeners(eventName?: string | symbol): this;
    /**
     * To be implemented in subclass.
     */
    protected abstract _start(): Promise<void>;
    /**
     * To be implemented in subclass.
     */
    protected abstract _end(): Promise<void>;
    private _setupInternalEvents;
    private _onNewListener;
    private _onRemoveListener;
    private _maybeStart;
    private _maybeEnd;
    private _getBlockTrackerEventCount;
    protected _shouldUseNewBlock(newBlock: string): boolean;
    protected _newPotentialLatest(newBlock: string): void;
    private _setCurrentBlock;
    private _setupBlockResetTimeout;
    private _cancelBlockResetTimeout;
    private _resetCurrentBlock;
}
export {};

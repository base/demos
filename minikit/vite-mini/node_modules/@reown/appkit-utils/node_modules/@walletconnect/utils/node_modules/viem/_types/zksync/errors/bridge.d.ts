import { BaseError } from '../../errors/base.js';
export type BaseFeeHigherThanValueErrorType = BaseFeeHigherThanValueError & {
    name: 'BaseFeeHigherThanValueError';
};
export declare class BaseFeeHigherThanValueError extends BaseError {
    constructor(baseCost: bigint, value: bigint);
}
export type TxHashNotFoundInLogsErrorType = BaseFeeHigherThanValueError & {
    name: 'TxHashNotFoundInLogsError';
};
export declare class TxHashNotFoundInLogsError extends BaseError {
    constructor();
}
//# sourceMappingURL=bridge.d.ts.map
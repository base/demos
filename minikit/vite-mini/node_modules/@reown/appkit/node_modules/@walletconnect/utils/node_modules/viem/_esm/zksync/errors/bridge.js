import { BaseError } from '../../errors/base.js';
export class BaseFeeHigherThanValueError extends BaseError {
    constructor(baseCost, value) {
        super([
            'The base cost of performing the priority operation is higher than the provided transaction value parameter.',
            '',
            `Base cost: ${baseCost}.`,
            `Provided value: ${value}.`,
        ].join('\n'), { name: 'BaseFeeHigherThanValueError' });
    }
}
export class TxHashNotFoundInLogsError extends BaseError {
    constructor() {
        super('The transaction hash not found in event logs.', {
            name: 'TxHashNotFoundInLogsError',
        });
    }
}
//# sourceMappingURL=bridge.js.map
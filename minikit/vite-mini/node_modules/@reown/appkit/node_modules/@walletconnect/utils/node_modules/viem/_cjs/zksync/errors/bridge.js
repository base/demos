"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxHashNotFoundInLogsError = exports.BaseFeeHigherThanValueError = void 0;
const base_js_1 = require("../../errors/base.js");
class BaseFeeHigherThanValueError extends base_js_1.BaseError {
    constructor(baseCost, value) {
        super([
            'The base cost of performing the priority operation is higher than the provided transaction value parameter.',
            '',
            `Base cost: ${baseCost}.`,
            `Provided value: ${value}.`,
        ].join('\n'), { name: 'BaseFeeHigherThanValueError' });
    }
}
exports.BaseFeeHigherThanValueError = BaseFeeHigherThanValueError;
class TxHashNotFoundInLogsError extends base_js_1.BaseError {
    constructor() {
        super('The transaction hash not found in event logs.', {
            name: 'TxHashNotFoundInLogsError',
        });
    }
}
exports.TxHashNotFoundInLogsError = TxHashNotFoundInLogsError;
//# sourceMappingURL=bridge.js.map
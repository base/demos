import { CHAIN_IDS, TOKENS } from './constants.js';
import { getPaymentStatus } from './getPaymentStatus.js';
import { pay } from './pay.js';
/**
 * Base payment interface
 */
export const base = {
    pay,
    getPaymentStatus,
    constants: {
        CHAIN_IDS,
        TOKENS,
    },
    types: {},
};
//# sourceMappingURL=base.js.map
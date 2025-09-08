import { Preference } from '../core/provider/interface.js';
import { ToOwnerAccountFn } from '../store/store.js';
/**
 * Validates user supplied preferences. Throws if keys are not valid.
 * @param preference
 */
export declare function validatePreferences(preference?: Preference): void;
/**
 * Validates user supplied toSubAccountSigner function. Throws if keys are not valid.
 * @param toAccount
 */
export declare function validateSubAccount(toAccount: ToOwnerAccountFn): void;
//# sourceMappingURL=validatePreferences.d.ts.map
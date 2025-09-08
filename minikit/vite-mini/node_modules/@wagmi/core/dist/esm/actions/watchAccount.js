import { deepEqual } from '../utils/deepEqual.js';
import { getAccount } from './getAccount.js';
/** https://wagmi.sh/core/api/actions/watchAccount */
export function watchAccount(config, parameters) {
    const { onChange } = parameters;
    return config.subscribe(() => getAccount(config), onChange, {
        equalityFn(a, b) {
            const { connector: aConnector, ...aRest } = a;
            const { connector: bConnector, ...bRest } = b;
            return (deepEqual(aRest, bRest) &&
                // check connector separately
                aConnector?.id === bConnector?.id &&
                aConnector?.uid === bConnector?.uid);
        },
    });
}
//# sourceMappingURL=watchAccount.js.map
import { getClient } from './getClient.js';
/** https://wagmi.sh/core/api/actions/watchClient */
export function watchClient(config, parameters) {
    const { onChange } = parameters;
    return config.subscribe(() => getClient(config), onChange, {
        equalityFn(a, b) {
            return a?.uid === b?.uid;
        },
    });
}
//# sourceMappingURL=watchClient.js.map
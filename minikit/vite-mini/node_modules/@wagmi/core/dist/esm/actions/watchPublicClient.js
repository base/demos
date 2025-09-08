import { getPublicClient, } from './getPublicClient.js';
/** https://wagmi.sh/core/api/actions/watchPublicClient */
export function watchPublicClient(config, parameters) {
    const { onChange } = parameters;
    return config.subscribe(() => getPublicClient(config), onChange, {
        equalityFn(a, b) {
            return a?.uid === b?.uid;
        },
    });
}
//# sourceMappingURL=watchPublicClient.js.map
import { watchAsset, } from '../actions/watchAsset.js';
export function watchAssetMutationOptions(config) {
    return {
        mutationFn(variables) {
            return watchAsset(config, variables);
        },
        mutationKey: ['watchAsset'],
    };
}
//# sourceMappingURL=watchAsset.js.map
import { deepEqual } from '../utils/deepEqual.js';
let previousChains = [];
/** https://wagmi.sh/core/api/actions/getChains */
export function getChains(config) {
    const chains = config.chains;
    if (deepEqual(previousChains, chains))
        return previousChains;
    previousChains = chains;
    return chains;
}
//# sourceMappingURL=getChains.js.map
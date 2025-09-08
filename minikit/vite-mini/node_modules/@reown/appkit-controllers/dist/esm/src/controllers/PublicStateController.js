import { proxy, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey } from 'valtio/vanilla/utils';
// -- State --------------------------------------------- //
const state = proxy({
    loading: false,
    open: false,
    selectedNetworkId: undefined,
    activeChain: undefined,
    initialized: false
});
// -- Controller ---------------------------------------- //
export const PublicStateController = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    subscribeOpen(callback) {
        return subscribeKey(state, 'open', callback);
    },
    set(newState) {
        Object.assign(state, { ...state, ...newState });
    }
};
//# sourceMappingURL=PublicStateController.js.map
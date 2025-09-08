import { proxy, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
// -- State --------------------------------------------- //
const state = proxy({
    isLegalCheckboxChecked: false
});
// -- Controller ---------------------------------------- //
export const OptionsStateController = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    setIsLegalCheckboxChecked(isLegalCheckboxChecked) {
        state.isLegalCheckboxChecked = isLegalCheckboxChecked;
    }
};
//# sourceMappingURL=OptionsStateController.js.map
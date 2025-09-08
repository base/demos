import { proxy } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
// -- Constants ----------------------------------------- //
const DEFAULT_STATE = Object.freeze({
    message: '',
    variant: 'success',
    svg: undefined,
    open: false,
    autoClose: true
});
// -- State --------------------------------------------- //
const state = proxy({
    ...DEFAULT_STATE
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    showLoading(message, options = {}) {
        this._showMessage({ message, variant: 'loading', ...options });
    },
    showSuccess(message) {
        this._showMessage({ message, variant: 'success' });
    },
    showSvg(message, svg) {
        this._showMessage({ message, svg });
    },
    showError(message) {
        const errorMessage = CoreHelperUtil.parseError(message);
        this._showMessage({ message: errorMessage, variant: 'error' });
    },
    hide() {
        state.message = DEFAULT_STATE.message;
        state.variant = DEFAULT_STATE.variant;
        state.svg = DEFAULT_STATE.svg;
        state.open = DEFAULT_STATE.open;
        state.autoClose = DEFAULT_STATE.autoClose;
    },
    _showMessage({ message, svg, variant = 'success', autoClose = DEFAULT_STATE.autoClose }) {
        if (state.open) {
            state.open = false;
            setTimeout(() => {
                state.message = message;
                state.variant = variant;
                state.svg = svg;
                state.open = true;
                state.autoClose = autoClose;
            }, 150);
        }
        else {
            state.message = message;
            state.variant = variant;
            state.svg = svg;
            state.open = true;
            state.autoClose = autoClose;
        }
    }
};
export const SnackController = controller;
//# sourceMappingURL=SnackController.js.map
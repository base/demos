import { proxy, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { withErrorBoundary } from '../utils/withErrorBoundary.js';
// -- State --------------------------------------------- //
const state = proxy({
    message: '',
    open: false,
    triggerRect: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
    },
    variant: 'shade'
});
// -- Controller ---------------------------------------- //
const controller = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    showTooltip({ message, triggerRect, variant }) {
        state.open = true;
        state.message = message;
        state.triggerRect = triggerRect;
        state.variant = variant;
    },
    hide() {
        state.open = false;
        state.message = '';
        state.triggerRect = {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        };
    }
};
// Export the controller wrapped with our error boundary
export const TooltipController = withErrorBoundary(controller);
//# sourceMappingURL=TooltipController.js.map
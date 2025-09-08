import { W3mFrameConstants } from './W3mFrameConstants.js';
import { W3mFrameHelpers } from './W3mFrameHelpers.js';
export const W3mFrameStorage = {
    set(key, value) {
        if (W3mFrameHelpers.isClient) {
            localStorage.setItem(`${W3mFrameConstants.STORAGE_KEY}${key}`, value);
        }
    },
    get(key) {
        if (W3mFrameHelpers.isClient) {
            return localStorage.getItem(`${W3mFrameConstants.STORAGE_KEY}${key}`);
        }
        return null;
    },
    delete(key, social) {
        if (W3mFrameHelpers.isClient) {
            if (social) {
                localStorage.removeItem(key);
            }
            else {
                localStorage.removeItem(`${W3mFrameConstants.STORAGE_KEY}${key}`);
            }
        }
    }
};
//# sourceMappingURL=W3mFrameStorage.js.map
import { AppKit } from '../src/client/appkit-core.js';
import { PACKAGE_VERSION } from './constants.js';
export function createAppKit(options) {
    return new AppKit({
        ...options,
        basic: true,
        sdkVersion: `html-core-${PACKAGE_VERSION}`
    });
}
export { AppKit };
//# sourceMappingURL=core.js.map
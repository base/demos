import { CoreHelperUtil } from '@reown/appkit-controllers';
import { AppKit } from '../src/client/appkit.js';
import { PACKAGE_VERSION } from './constants.js';
// -- Utils & Other -----------------------------------------------------
export * from '../src/utils/index.js';
export { CoreHelperUtil, AccountController } from '@reown/appkit-controllers';
export function createAppKit(options) {
    return new AppKit({
        ...options,
        sdkVersion: CoreHelperUtil.generateSdkVersion(options.adapters ?? [], 'html', PACKAGE_VERSION)
    });
}
export { AppKit };
//# sourceMappingURL=index.js.map
import { AppKit } from '../src/client/appkit-core.js';
import type { AppKitOptions } from '../src/utils/TypesUtil.js';
export type * from '@reown/appkit-controllers';
export type { CaipNetwork, CaipAddress, CaipNetworkId } from '@reown/appkit-common';
export type CreateAppKit = Omit<AppKitOptions, 'sdkType' | 'sdkVersion' | 'basic'>;
export declare function createAppKit(options: CreateAppKit): AppKit;
export { AppKit };
export type { AppKitOptions };

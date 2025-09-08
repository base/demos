import type { AdapterBlueprint } from '../adapters/ChainAdapterBlueprint.js';
import type { AppKit } from '../client/appkit.js';
export declare function _internalFetchBalance(appKit: AppKit | undefined): Promise<{
    data: AdapterBlueprint.GetBalanceResult | undefined;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
}>;
export declare function updateBalance(appKit: AppKit): Promise<{
    data: AdapterBlueprint.GetBalanceResult | undefined;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
}>;

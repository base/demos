import { OnchainKitConfig, SetOnchainKitConfig } from './types';
/**
 * The ONCHAIN_KIT_CONFIG is not exported at index.ts,
 * but only accessed through the get and set functions.
 */
export declare const ONCHAIN_KIT_CONFIG: OnchainKitConfig;
/**
 * Access the ONCHAIN_KIT_CONFIG object directly by providing the key.
 * This is powerful when you use OnchainKit utilities outside of the React context.
 */
export declare const getOnchainKitConfig: <K extends keyof typeof ONCHAIN_KIT_CONFIG>(configName: K) => (typeof ONCHAIN_KIT_CONFIG)[K];
/**
 * Update the ONCHAIN_KIT_CONFIG object directly by providing the properties to update.
 * This is powerful when you use OnchainKit utilities outside of the React context.
 */
export declare const setOnchainKitConfig: (properties: SetOnchainKitConfig) => <K extends keyof typeof ONCHAIN_KIT_CONFIG>(configName: K) => (typeof ONCHAIN_KIT_CONFIG)[K];
//# sourceMappingURL=OnchainKitConfig.d.ts.map
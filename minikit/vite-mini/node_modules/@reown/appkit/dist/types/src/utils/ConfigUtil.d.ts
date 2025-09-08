import type { OnRampProvider } from '@reown/appkit-common';
import type { FeatureConfigMap, FeatureID, RemoteFeatures, TypedFeatureConfig } from '@reown/appkit-controllers';
import type { AppKitOptionsWithSdk } from '../client/appkit-base-client.js';
type FeatureKey = keyof FeatureConfigMap;
export declare const ConfigUtil: {
    localSettingsOverridden: Set<string>;
    getApiConfig<T extends FeatureID>(id: T, apiProjectConfig: TypedFeatureConfig[] | null): Extract<import("@reown/appkit-controllers").BaseFeature<"activity", [] | null>, {
        id: T;
    }> | Extract<import("@reown/appkit-controllers").BaseFeature<"onramp", OnRampProvider[]>, {
        id: T;
    }> | Extract<import("@reown/appkit-controllers").BaseFeature<"swap", "1inch"[]>, {
        id: T;
    }> | Extract<import("@reown/appkit-controllers").BaseFeature<"social_login", ("email" | import("@reown/appkit-controllers").SocialProvider)[]>, {
        id: T;
    }> | Extract<import("@reown/appkit-controllers").BaseFeature<"reown_branding", [] | null>, {
        id: T;
    }> | undefined;
    addWarning(localFeatureValue: unknown, featureKey: FeatureKey): void;
    processFeature<K extends FeatureKey>(featureKey: K, localFeatures: Record<string, unknown>, apiProjectConfig: TypedFeatureConfig[] | null, useApi: boolean, isBasic: boolean): FeatureConfigMap[K]["returnType"];
    processApiFeature<K extends FeatureKey>(featureKey: K, apiConfig: TypedFeatureConfig): FeatureConfigMap[K]["returnType"];
    processFallbackFeature<K extends FeatureKey>(featureKey: K, localValue: unknown): FeatureConfigMap[K]["returnType"];
    fetchRemoteFeatures(config: AppKitOptionsWithSdk): Promise<RemoteFeatures>;
};
export {};

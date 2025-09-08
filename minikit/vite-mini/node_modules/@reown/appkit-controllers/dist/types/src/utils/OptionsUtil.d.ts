import type { Features, FeaturesKeys, RemoteFeatures } from './TypeUtil.js';
export declare const OptionsUtil: {
    getFeatureValue(key: FeaturesKeys, features?: Features): boolean | import("./TypeUtil.js").ConnectorTypeOrder[] | import("./TypeUtil.js").WalletFeature[] | import("./TypeUtil.js").ConnectMethod[] | undefined;
    filterSocialsByPlatform<T>(socials: RemoteFeatures["socials"]): T | import("./TypeUtil.js").SocialProvider[];
};

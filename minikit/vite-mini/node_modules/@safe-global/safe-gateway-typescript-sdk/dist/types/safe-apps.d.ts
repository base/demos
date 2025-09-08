export declare enum SafeAppAccessPolicyTypes {
    NoRestrictions = "NO_RESTRICTIONS",
    DomainAllowlist = "DOMAIN_ALLOWLIST"
}
export type SafeAppNoRestrictionsPolicy = {
    type: SafeAppAccessPolicyTypes.NoRestrictions;
};
export type SafeAppDomainAllowlistPolicy = {
    type: SafeAppAccessPolicyTypes.DomainAllowlist;
    value: string[];
};
export type SafeAppsAccessControlPolicies = SafeAppNoRestrictionsPolicy | SafeAppDomainAllowlistPolicy;
export type SafeAppProvider = {
    url: string;
    name: string;
};
export declare enum SafeAppFeatures {
    BATCHED_TRANSACTIONS = "BATCHED_TRANSACTIONS"
}
export declare enum SafeAppSocialPlatforms {
    TWITTER = "TWITTER",
    GITHUB = "GITHUB",
    DISCORD = "DISCORD",
    TELEGRAM = "TELEGRAM"
}
export type SafeAppSocialProfile = {
    platform: SafeAppSocialPlatforms;
    url: string;
};
export type SafeAppData = {
    id: number;
    url: string;
    name: string;
    iconUrl: string;
    description: string;
    chainIds: string[];
    provider?: SafeAppProvider;
    accessControl: SafeAppsAccessControlPolicies;
    tags: string[];
    features: SafeAppFeatures[];
    socialProfiles: SafeAppSocialProfile[];
    developerWebsite?: string;
};
export type SafeAppsResponse = SafeAppData[];

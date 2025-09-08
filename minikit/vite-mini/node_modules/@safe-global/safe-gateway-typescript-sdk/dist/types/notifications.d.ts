export declare enum DeviceType {
    ANDROID = "ANDROID",
    IOS = "IOS",
    WEB = "WEB"
}
type SafeRegistration = {
    chainId: string;
    safes: Array<string>;
    signatures: Array<string>;
};
export type RegisterNotificationsRequest = {
    uuid?: string;
    cloudMessagingToken: string;
    buildNumber: string;
    bundle: string;
    deviceType: DeviceType;
    version: string;
    timestamp?: string;
    safeRegistrations: Array<SafeRegistration>;
};
export {};

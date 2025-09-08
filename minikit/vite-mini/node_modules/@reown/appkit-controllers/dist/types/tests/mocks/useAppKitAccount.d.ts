export declare const defaultAccountState: {
    allAccounts: never[];
    address: undefined;
    caipAddress: undefined;
    isConnected: boolean;
    status: undefined;
    embeddedWalletInfo: undefined;
};
export declare const connectedAccountState: {
    allAccounts: never[];
    address: string;
    caipAddress: string;
    isConnected: boolean;
    status: string;
    embeddedWalletInfo: undefined;
};
export declare const disconnectedAccountState: {
    allAccounts: never[];
    address: undefined;
    caipAddress: undefined;
    isConnected: boolean;
    status: string;
    embeddedWalletInfo: undefined;
};
export declare const connectedWithEmbeddedWalletState: {
    allAccounts: never[];
    address: string;
    caipAddress: string;
    isConnected: boolean;
    status: string;
    embeddedWalletInfo: {
        user: {
            username: string;
            email: string;
        };
        accountType: string;
        authProvider: string;
        isSmartAccountDeployed: boolean;
    };
};

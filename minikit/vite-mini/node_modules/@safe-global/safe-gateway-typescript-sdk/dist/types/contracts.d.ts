export type Contract = {
    address: string;
    name: string;
    displayName: string;
    logoUri: string;
    contractAbi: object | null;
    trustedForDelegateCall: boolean;
};

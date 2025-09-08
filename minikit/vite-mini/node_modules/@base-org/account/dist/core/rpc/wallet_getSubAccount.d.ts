import { Address, Hex } from 'viem';
export type GetSubAccountsRequest = {
    account: Address;
    domain: string;
};
export type GetSubAccountsResponseItem = {
    address: Address;
    factory: Address;
    factoryData: Hex;
};
export type GetSubAccountsResponse = {
    subAccounts: GetSubAccountsResponseItem[];
};
//# sourceMappingURL=wallet_getSubAccount.d.ts.map
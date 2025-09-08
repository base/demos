import { AppMetadata, Preference, ProviderInterface, SubAccountOptions } from './core/provider/interface.js';
import { AddSubAccountAccount } from './core/rpc/wallet_addSubAccount.js';
import { SubAccount, ToOwnerAccountFn } from './store/store.js';
export type CreateCoinbaseWalletSDKOptions = Partial<AppMetadata> & {
    preference?: Preference;
    subAccounts?: Omit<SubAccountOptions, 'enableAutoSubAccounts'>;
    paymasterUrls?: Record<number, string>;
};
type SubAccountAddOwnerParams = {
    address?: `0x${string}`;
    publicKey?: `0x${string}`;
    chainId: number;
};
/**
 * Create a Coinbase Wallet SDK instance.
 * @param params - Options to create a Coinbase Wallet SDK instance.
 * @returns A Coinbase Wallet SDK object.
 */
export declare function createCoinbaseWalletSDK(params: CreateCoinbaseWalletSDKOptions): {
    getProvider(): ProviderInterface;
    subAccount: {
        create(account: AddSubAccountAccount): Promise<SubAccount>;
        get(): Promise<SubAccount | null>;
        addOwner({ address, publicKey, chainId }: SubAccountAddOwnerParams): Promise<string>;
        setToOwnerAccount(toSubAccountOwner: ToOwnerAccountFn): void;
    };
};
export {};
//# sourceMappingURL=createCoinbaseWalletSDK.d.ts.map
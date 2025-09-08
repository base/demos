import { AppMetadata, Preference, ProviderInterface, SubAccountOptions } from '../../../core/provider/interface.js';
import { AddSubAccountAccount } from '../../../core/rpc/wallet_addSubAccount.js';
import { SubAccount, ToOwnerAccountFn } from '../../../store/store.js';
export type CreateProviderOptions = Partial<AppMetadata> & {
    preference?: Preference;
    subAccounts?: Omit<SubAccountOptions, 'enableAutoSubAccounts'>;
    paymasterUrls?: Record<number, string>;
};
/**
 * Create Base AccountSDK instance with EIP-1193 compliant provider
 * @param params - Options to create a base account SDK instance.
 * @returns An SDK object with a getProvider method that returns an EIP-1193 compliant provider.
 */
export declare function createBaseAccountSDK(params: CreateProviderOptions): {
    getProvider: () => ProviderInterface;
    subAccount: {
        create(accountParam: AddSubAccountAccount): Promise<SubAccount>;
        get(): Promise<SubAccount | null>;
        addOwner: ({ address, publicKey, chainId, }: {
            address?: `0x${string}`;
            publicKey?: `0x${string}`;
            chainId: number;
        }) => Promise<string>;
        setToOwnerAccount(toSubAccountOwner: ToOwnerAccountFn): void;
    };
};
//# sourceMappingURL=createBaseAccountSDK.d.ts.map
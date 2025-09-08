import { AppMetadata, Preference, SubAccountOptions } from '../core/provider/interface.js';
import { SpendPermission } from '../core/rpc/coinbase_fetchSpendPermissions.js';
import { OwnerAccount } from '../core/type/index.js';
import { Address, Hex } from 'viem';
export type ToOwnerAccountFn = () => Promise<{
    account: OwnerAccount | null;
}>;
type Chain = {
    id: number;
    rpcUrl?: string;
    nativeCurrency?: {
        name?: string;
        symbol?: string;
        decimal?: number;
    };
};
export type SubAccount = {
    address: Address;
    factory?: Address;
    factoryData?: Hex;
};
type SubAccountConfig = SubAccountOptions & {
    capabilities?: Record<string, unknown>;
};
type Account = {
    accounts?: Address[];
    capabilities?: Record<string, unknown>;
    chain?: Chain;
};
type Config = {
    metadata?: AppMetadata;
    preference?: Preference;
    version: string;
    deviceId?: string;
    paymasterUrls?: Record<number, string>;
};
type ChainSlice = {
    chains: Chain[];
};
type KeysSlice = {
    keys: Record<string, string | null>;
};
type AccountSlice = {
    account: Account;
};
type SubAccountSlice = {
    subAccount?: SubAccount;
};
type SubAccountConfigSlice = {
    subAccountConfig?: SubAccountConfig;
};
type SpendPermissionsSlice = {
    spendPermissions: SpendPermission[];
};
type ConfigSlice = {
    config: Config;
};
type MergeTypes<T extends unknown[]> = T extends [infer First, ...infer Rest] ? First & (Rest extends unknown[] ? MergeTypes<Rest> : Record<string, unknown>) : Record<string, unknown>;
export type StoreState = MergeTypes<[
    ChainSlice,
    KeysSlice,
    AccountSlice,
    SubAccountSlice,
    SubAccountConfigSlice,
    SpendPermissionsSlice,
    ConfigSlice
]>;
export declare const sdkstore: Omit<import("zustand/vanilla").StoreApi<ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>, ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) => void) => () => void;
        onFinishHydration: (fn: (state: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>, ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>>>;
    };
};
export declare const subAccountsConfig: {
    get: () => SubAccountConfig | undefined;
    set: (subAccountConfig: Partial<SubAccountConfig>) => void;
    clear: () => void;
};
export declare const subAccounts: {
    get: () => SubAccount | undefined;
    set: (subAccount: Partial<SubAccount>) => void;
    clear: () => void;
};
export declare const spendPermissions: {
    get: () => SpendPermission[];
    set: (spendPermissions: SpendPermission[]) => void;
    clear: () => void;
};
export declare const account: {
    get: () => Account;
    set: (account: Partial<Account>) => void;
    clear: () => void;
};
export declare const chains: {
    get: () => Chain[];
    set: (chains: Chain[]) => void;
    clear: () => void;
};
export declare const keys: {
    get: (key: string) => string | null;
    set: (key: string, value: string | null) => void;
    clear: () => void;
};
export declare const config: {
    get: () => Config;
    set: (config: Partial<Config>) => void;
};
export declare const store: {
    subAccounts: {
        get: () => SubAccount | undefined;
        set: (subAccount: Partial<SubAccount>) => void;
        clear: () => void;
    };
    subAccountsConfig: {
        get: () => SubAccountConfig | undefined;
        set: (subAccountConfig: Partial<SubAccountConfig>) => void;
        clear: () => void;
    };
    spendPermissions: {
        get: () => SpendPermission[];
        set: (spendPermissions: SpendPermission[]) => void;
        clear: () => void;
    };
    account: {
        get: () => Account;
        set: (account: Partial<Account>) => void;
        clear: () => void;
    };
    chains: {
        get: () => Chain[];
        set: (chains: Chain[]) => void;
        clear: () => void;
    };
    keys: {
        get: (key: string) => string | null;
        set: (key: string, value: string | null) => void;
        clear: () => void;
    };
    config: {
        get: () => Config;
        set: (config: Partial<Config>) => void;
    };
    setState: {
        (partial: (ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) | Partial<ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>> | ((state: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) => (ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) | Partial<ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>>), replace?: false): void;
        (state: (ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) | ((state: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) => ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>), replace: true): void;
    };
    getState: () => ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>;
    getInitialState: () => ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>;
    subscribe: (listener: (state: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>, prevState: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) => void) => () => void;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>, ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) => void) => () => void;
        onFinishHydration: (fn: (state: ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>, ChainSlice & KeysSlice & AccountSlice & SubAccountSlice & SubAccountConfigSlice & SpendPermissionsSlice & ConfigSlice & Record<string, unknown>>>;
    };
};
export {};
//# sourceMappingURL=store.d.ts.map
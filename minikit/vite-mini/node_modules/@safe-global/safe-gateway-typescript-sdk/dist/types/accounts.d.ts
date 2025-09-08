export type Account = {
    id: string;
    groupId: string | null;
    address: `0x${string}`;
};
export type AccountDataType = {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
};
export type AccountDataSetting = {
    dataTypeId: string;
    enabled: boolean;
};
export type CreateAccountRequest = {
    address: `0x${string}`;
};
export type UpsertAccountDataSettingsRequest = {
    accountDataSettings: AccountDataSetting[];
};

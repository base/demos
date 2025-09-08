import { z } from 'zod';
import type { AdapterType, AppKitSdkVersion, SdkFramework } from '@reown/appkit-common';
type SdkType = 'w3m' | 'appkit';
type SdkVersion = `${SdkFramework}-${AdapterType}-${string}` | AppKitSdkVersion | undefined;
export declare const GetTransactionByHashResponse: z.ZodObject<{
    accessList: z.ZodArray<z.ZodString, "many">;
    blockHash: z.ZodNullable<z.ZodString>;
    blockNumber: z.ZodNullable<z.ZodString>;
    chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    from: z.ZodString;
    gas: z.ZodString;
    hash: z.ZodString;
    input: z.ZodNullable<z.ZodString>;
    maxFeePerGas: z.ZodString;
    maxPriorityFeePerGas: z.ZodString;
    nonce: z.ZodString;
    r: z.ZodString;
    s: z.ZodString;
    to: z.ZodString;
    transactionIndex: z.ZodNullable<z.ZodString>;
    type: z.ZodString;
    v: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: string;
    chainId: string | number;
    from: string;
    to: string;
    accessList: string[];
    blockHash: string | null;
    blockNumber: string | null;
    gas: string;
    hash: string;
    input: string | null;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    nonce: string;
    r: string;
    s: string;
    transactionIndex: string | null;
    v: string;
}, {
    value: string;
    type: string;
    chainId: string | number;
    from: string;
    to: string;
    accessList: string[];
    blockHash: string | null;
    blockNumber: string | null;
    gas: string;
    hash: string;
    input: string | null;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    nonce: string;
    r: string;
    s: string;
    transactionIndex: string | null;
    v: string;
}>;
export declare const AppSwitchNetworkRequest: z.ZodObject<{
    chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    chainId: string | number;
}, {
    chainId: string | number;
}>;
export declare const AppConnectEmailRequest: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const AppConnectOtpRequest: z.ZodObject<{
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otp: string;
}, {
    otp: string;
}>;
export declare const AppConnectSocialRequest: z.ZodObject<{
    uri: z.ZodString;
    preferredAccountType: z.ZodOptional<z.ZodString>;
    chainId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    uri: string;
    preferredAccountType?: string | undefined;
    chainId?: string | number | undefined;
}, {
    uri: string;
    preferredAccountType?: string | undefined;
    chainId?: string | number | undefined;
}>;
export declare const AppGetUserRequest: z.ZodObject<{
    chainId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    preferredAccountType: z.ZodOptional<z.ZodString>;
    socialUri: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    chainId?: string | number | undefined;
    preferredAccountType?: string | undefined;
    socialUri?: string | undefined;
}, {
    chainId?: string | number | undefined;
    preferredAccountType?: string | undefined;
    socialUri?: string | undefined;
}>;
export declare const AppGetSocialRedirectUriRequest: z.ZodObject<{
    provider: z.ZodEnum<["google", "github", "apple", "facebook", "x", "discord"]>;
}, "strip", z.ZodTypeAny, {
    provider: "google" | "github" | "apple" | "facebook" | "x" | "discord";
}, {
    provider: "google" | "github" | "apple" | "facebook" | "x" | "discord";
}>;
export declare const AppUpdateEmailRequest: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const AppUpdateEmailPrimaryOtpRequest: z.ZodObject<{
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otp: string;
}, {
    otp: string;
}>;
export declare const AppUpdateEmailSecondaryOtpRequest: z.ZodObject<{
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otp: string;
}, {
    otp: string;
}>;
export declare const AppSyncThemeRequest: z.ZodObject<{
    themeMode: z.ZodOptional<z.ZodEnum<["light", "dark"]>>;
    themeVariables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    w3mThemeVariables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    themeMode?: "light" | "dark" | undefined;
    themeVariables?: Record<string, string | number> | undefined;
    w3mThemeVariables?: Record<string, string> | undefined;
}, {
    themeMode?: "light" | "dark" | undefined;
    themeVariables?: Record<string, string | number> | undefined;
    w3mThemeVariables?: Record<string, string> | undefined;
}>;
export declare const AppSyncDappDataRequest: z.ZodObject<{
    metadata: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        url: z.ZodString;
        icons: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        url: string;
        name: string;
        description: string;
        icons: string[];
    }, {
        url: string;
        name: string;
        description: string;
        icons: string[];
    }>>;
    sdkVersion: z.ZodType<SdkVersion>;
    sdkType: z.ZodOptional<z.ZodType<SdkType, z.ZodTypeDef, SdkType>>;
    projectId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    projectId: string;
    metadata?: {
        url: string;
        name: string;
        description: string;
        icons: string[];
    } | undefined;
    sdkVersion?: SdkVersion;
    sdkType?: SdkType | undefined;
}, {
    projectId: string;
    metadata?: {
        url: string;
        name: string;
        description: string;
        icons: string[];
    } | undefined;
    sdkVersion?: SdkVersion;
    sdkType?: SdkType | undefined;
}>;
export declare const AppSetPreferredAccountRequest: z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>;
export declare const FrameConnectEmailResponse: z.ZodObject<{
    action: z.ZodEnum<["VERIFY_DEVICE", "VERIFY_OTP", "CONNECT"]>;
}, "strip", z.ZodTypeAny, {
    action: "VERIFY_DEVICE" | "VERIFY_OTP" | "CONNECT";
}, {
    action: "VERIFY_DEVICE" | "VERIFY_OTP" | "CONNECT";
}>;
export declare const FrameGetFarcasterUriResponse: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
export declare const FrameConnectFarcasterResponse: z.ZodObject<{
    userName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
}, {
    userName: string;
}>;
export declare const FrameConnectSocialResponse: z.ZodObject<{
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address: z.ZodString;
    chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        type: z.ZodEnum<["eoa", "smartAccount"]>;
    }, "strip", z.ZodTypeAny, {
        type: "eoa" | "smartAccount";
        address: string;
    }, {
        type: "eoa" | "smartAccount";
        address: string;
    }>, "many">>;
    userName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    preferredAccountType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    chainId: string | number;
    address: string;
    email?: string | null | undefined;
    accounts?: {
        type: "eoa" | "smartAccount";
        address: string;
    }[] | undefined;
    userName?: string | null | undefined;
    preferredAccountType?: string | undefined;
}, {
    chainId: string | number;
    address: string;
    email?: string | null | undefined;
    accounts?: {
        type: "eoa" | "smartAccount";
        address: string;
    }[] | undefined;
    userName?: string | null | undefined;
    preferredAccountType?: string | undefined;
}>;
export declare const FrameUpdateEmailResponse: z.ZodObject<{
    action: z.ZodEnum<["VERIFY_PRIMARY_OTP", "VERIFY_SECONDARY_OTP"]>;
}, "strip", z.ZodTypeAny, {
    action: "VERIFY_PRIMARY_OTP" | "VERIFY_SECONDARY_OTP";
}, {
    action: "VERIFY_PRIMARY_OTP" | "VERIFY_SECONDARY_OTP";
}>;
export declare const FrameGetUserResponse: z.ZodObject<{
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address: z.ZodString;
    chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    smartAccountDeployed: z.ZodOptional<z.ZodBoolean>;
    accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        type: z.ZodEnum<["eoa", "smartAccount"]>;
    }, "strip", z.ZodTypeAny, {
        type: "eoa" | "smartAccount";
        address: string;
    }, {
        type: "eoa" | "smartAccount";
        address: string;
    }>, "many">>;
    preferredAccountType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    chainId: string | number;
    address: string;
    email?: string | null | undefined;
    smartAccountDeployed?: boolean | undefined;
    accounts?: {
        type: "eoa" | "smartAccount";
        address: string;
    }[] | undefined;
    preferredAccountType?: string | undefined;
}, {
    chainId: string | number;
    address: string;
    email?: string | null | undefined;
    smartAccountDeployed?: boolean | undefined;
    accounts?: {
        type: "eoa" | "smartAccount";
        address: string;
    }[] | undefined;
    preferredAccountType?: string | undefined;
}>;
export declare const FrameGetSocialRedirectUriResponse: z.ZodObject<{
    uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uri: string;
}, {
    uri: string;
}>;
export declare const FrameIsConnectedResponse: z.ZodObject<{
    isConnected: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    isConnected: boolean;
}, {
    isConnected: boolean;
}>;
export declare const FrameGetChainIdResponse: z.ZodObject<{
    chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    chainId: string | number;
}, {
    chainId: string | number;
}>;
export declare const FrameSwitchNetworkResponse: z.ZodObject<{
    chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    chainId: string | number;
}, {
    chainId: string | number;
}>;
export declare const FrameUpdateEmailSecondaryOtpResponse: z.ZodObject<{
    newEmail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newEmail: string;
}, {
    newEmail: string;
}>;
export declare const FrameGetSmartAccountEnabledNetworksResponse: z.ZodObject<{
    smartAccountEnabledNetworks: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    smartAccountEnabledNetworks: number[];
}, {
    smartAccountEnabledNetworks: number[];
}>;
export declare const FrameInitSmartAccountResponse: z.ZodObject<{
    address: z.ZodString;
    isDeployed: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    address: string;
    isDeployed: boolean;
}, {
    address: string;
    isDeployed: boolean;
}>;
export declare const FrameReadyResponse: z.ZodObject<{
    version: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    version?: string | undefined;
}, {
    version?: string | undefined;
}>;
export declare const FrameSetPreferredAccountResponse: z.ZodObject<{
    type: z.ZodString;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    address: string;
}, {
    type: string;
    address: string;
}>;
export declare const RpcResponse: z.ZodAny;
export declare const RpcEthAccountsRequest: z.ZodObject<{
    method: z.ZodLiteral<"eth_accounts">;
}, "strip", z.ZodTypeAny, {
    method: "eth_accounts";
}, {
    method: "eth_accounts";
}>;
export declare const RpcEthBlockNumber: z.ZodObject<{
    method: z.ZodLiteral<"eth_blockNumber">;
}, "strip", z.ZodTypeAny, {
    method: "eth_blockNumber";
}, {
    method: "eth_blockNumber";
}>;
export declare const RpcEthCall: z.ZodObject<{
    method: z.ZodLiteral<"eth_call">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_call";
    params: any[];
}, {
    method: "eth_call";
    params: any[];
}>;
export declare const RpcEthChainId: z.ZodObject<{
    method: z.ZodLiteral<"eth_chainId">;
}, "strip", z.ZodTypeAny, {
    method: "eth_chainId";
}, {
    method: "eth_chainId";
}>;
export declare const RpcEthEstimateGas: z.ZodObject<{
    method: z.ZodLiteral<"eth_estimateGas">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_estimateGas";
    params: any[];
}, {
    method: "eth_estimateGas";
    params: any[];
}>;
export declare const RpcEthFeeHistory: z.ZodObject<{
    method: z.ZodLiteral<"eth_feeHistory">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_feeHistory";
    params: any[];
}, {
    method: "eth_feeHistory";
    params: any[];
}>;
export declare const RpcEthGasPrice: z.ZodObject<{
    method: z.ZodLiteral<"eth_gasPrice">;
}, "strip", z.ZodTypeAny, {
    method: "eth_gasPrice";
}, {
    method: "eth_gasPrice";
}>;
export declare const RpcEthGetAccount: z.ZodObject<{
    method: z.ZodLiteral<"eth_getAccount">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getAccount";
    params: any[];
}, {
    method: "eth_getAccount";
    params: any[];
}>;
export declare const RpcEthGetBalance: z.ZodObject<{
    method: z.ZodLiteral<"eth_getBalance">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getBalance";
    params: any[];
}, {
    method: "eth_getBalance";
    params: any[];
}>;
export declare const RpcEthGetBlockyByHash: z.ZodObject<{
    method: z.ZodLiteral<"eth_getBlockByHash">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getBlockByHash";
    params: any[];
}, {
    method: "eth_getBlockByHash";
    params: any[];
}>;
export declare const RpcEthGetBlockByNumber: z.ZodObject<{
    method: z.ZodLiteral<"eth_getBlockByNumber">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getBlockByNumber";
    params: any[];
}, {
    method: "eth_getBlockByNumber";
    params: any[];
}>;
export declare const RpcEthGetBlockReceipts: z.ZodObject<{
    method: z.ZodLiteral<"eth_getBlockReceipts">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getBlockReceipts";
    params: any[];
}, {
    method: "eth_getBlockReceipts";
    params: any[];
}>;
export declare const RcpEthGetBlockTransactionCountByHash: z.ZodObject<{
    method: z.ZodLiteral<"eth_getBlockTransactionCountByHash">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getBlockTransactionCountByHash";
    params: any[];
}, {
    method: "eth_getBlockTransactionCountByHash";
    params: any[];
}>;
export declare const RcpEthGetBlockTransactionCountByNumber: z.ZodObject<{
    method: z.ZodLiteral<"eth_getBlockTransactionCountByNumber">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getBlockTransactionCountByNumber";
    params: any[];
}, {
    method: "eth_getBlockTransactionCountByNumber";
    params: any[];
}>;
export declare const RpcEthGetCode: z.ZodObject<{
    method: z.ZodLiteral<"eth_getCode">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getCode";
    params: any[];
}, {
    method: "eth_getCode";
    params: any[];
}>;
export declare const RpcEthGetFilter: z.ZodObject<{
    method: z.ZodLiteral<"eth_getFilterChanges">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getFilterChanges";
    params: any[];
}, {
    method: "eth_getFilterChanges";
    params: any[];
}>;
export declare const RpcEthGetFilterLogs: z.ZodObject<{
    method: z.ZodLiteral<"eth_getFilterLogs">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getFilterLogs";
    params: any[];
}, {
    method: "eth_getFilterLogs";
    params: any[];
}>;
export declare const RpcEthGetLogs: z.ZodObject<{
    method: z.ZodLiteral<"eth_getLogs">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getLogs";
    params: any[];
}, {
    method: "eth_getLogs";
    params: any[];
}>;
export declare const RpcEthGetProof: z.ZodObject<{
    method: z.ZodLiteral<"eth_getProof">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getProof";
    params: any[];
}, {
    method: "eth_getProof";
    params: any[];
}>;
export declare const RpcEthGetStorageAt: z.ZodObject<{
    method: z.ZodLiteral<"eth_getStorageAt">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getStorageAt";
    params: any[];
}, {
    method: "eth_getStorageAt";
    params: any[];
}>;
export declare const RpcEthGetTransactionByBlockHashAndIndex: z.ZodObject<{
    method: z.ZodLiteral<"eth_getTransactionByBlockHashAndIndex">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getTransactionByBlockHashAndIndex";
    params: any[];
}, {
    method: "eth_getTransactionByBlockHashAndIndex";
    params: any[];
}>;
export declare const RpcEthGetTransactionByBlockNumberAndIndex: z.ZodObject<{
    method: z.ZodLiteral<"eth_getTransactionByBlockNumberAndIndex">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getTransactionByBlockNumberAndIndex";
    params: any[];
}, {
    method: "eth_getTransactionByBlockNumberAndIndex";
    params: any[];
}>;
export declare const RpcEthGetTransactionByHash: z.ZodObject<{
    method: z.ZodLiteral<"eth_getTransactionByHash">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getTransactionByHash";
    params: any[];
}, {
    method: "eth_getTransactionByHash";
    params: any[];
}>;
export declare const RpcEthGetTransactionCount: z.ZodObject<{
    method: z.ZodLiteral<"eth_getTransactionCount">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getTransactionCount";
    params: any[];
}, {
    method: "eth_getTransactionCount";
    params: any[];
}>;
export declare const RpcEthGetTransactionReceipt: z.ZodObject<{
    method: z.ZodLiteral<"eth_getTransactionReceipt">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getTransactionReceipt";
    params: any[];
}, {
    method: "eth_getTransactionReceipt";
    params: any[];
}>;
export declare const RpcEthGetUncleCountByBlockHash: z.ZodObject<{
    method: z.ZodLiteral<"eth_getUncleCountByBlockHash">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getUncleCountByBlockHash";
    params: any[];
}, {
    method: "eth_getUncleCountByBlockHash";
    params: any[];
}>;
export declare const RpcEthGetUncleCountByBlockNumber: z.ZodObject<{
    method: z.ZodLiteral<"eth_getUncleCountByBlockNumber">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_getUncleCountByBlockNumber";
    params: any[];
}, {
    method: "eth_getUncleCountByBlockNumber";
    params: any[];
}>;
export declare const RpcEthMaxPriorityFeePerGas: z.ZodObject<{
    method: z.ZodLiteral<"eth_maxPriorityFeePerGas">;
}, "strip", z.ZodTypeAny, {
    method: "eth_maxPriorityFeePerGas";
}, {
    method: "eth_maxPriorityFeePerGas";
}>;
export declare const RpcEthNewBlockFilter: z.ZodObject<{
    method: z.ZodLiteral<"eth_newBlockFilter">;
}, "strip", z.ZodTypeAny, {
    method: "eth_newBlockFilter";
}, {
    method: "eth_newBlockFilter";
}>;
export declare const RpcEthNewFilter: z.ZodObject<{
    method: z.ZodLiteral<"eth_newFilter">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_newFilter";
    params: any[];
}, {
    method: "eth_newFilter";
    params: any[];
}>;
export declare const RpcEthNewPendingTransactionFilter: z.ZodObject<{
    method: z.ZodLiteral<"eth_newPendingTransactionFilter">;
}, "strip", z.ZodTypeAny, {
    method: "eth_newPendingTransactionFilter";
}, {
    method: "eth_newPendingTransactionFilter";
}>;
export declare const RpcEthSendRawTransaction: z.ZodObject<{
    method: z.ZodLiteral<"eth_sendRawTransaction">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_sendRawTransaction";
    params: any[];
}, {
    method: "eth_sendRawTransaction";
    params: any[];
}>;
export declare const RpcEthSyncing: z.ZodObject<{
    method: z.ZodLiteral<"eth_syncing">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_syncing";
    params: any[];
}, {
    method: "eth_syncing";
    params: any[];
}>;
export declare const RpcUnistallFilter: z.ZodObject<{
    method: z.ZodLiteral<"eth_uninstallFilter">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_uninstallFilter";
    params: any[];
}, {
    method: "eth_uninstallFilter";
    params: any[];
}>;
export declare const RpcPersonalSignRequest: z.ZodObject<{
    method: z.ZodLiteral<"personal_sign">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "personal_sign";
    params: any[];
}, {
    method: "personal_sign";
    params: any[];
}>;
export declare const RpcEthSignTypedDataV4: z.ZodObject<{
    method: z.ZodLiteral<"eth_signTypedData_v4">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_signTypedData_v4";
    params: any[];
}, {
    method: "eth_signTypedData_v4";
    params: any[];
}>;
export declare const RpcEthSendTransactionRequest: z.ZodObject<{
    method: z.ZodLiteral<"eth_sendTransaction">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "eth_sendTransaction";
    params: any[];
}, {
    method: "eth_sendTransaction";
    params: any[];
}>;
export declare const RpcSolanaSignMessageRequest: z.ZodObject<{
    method: z.ZodLiteral<"solana_signMessage">;
    params: z.ZodObject<{
        message: z.ZodString;
        pubkey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        pubkey: string;
    }, {
        message: string;
        pubkey: string;
    }>;
}, "strip", z.ZodTypeAny, {
    method: "solana_signMessage";
    params: {
        message: string;
        pubkey: string;
    };
}, {
    method: "solana_signMessage";
    params: {
        message: string;
        pubkey: string;
    };
}>;
export declare const RpcSolanaSignTransactionRequest: z.ZodObject<{
    method: z.ZodLiteral<"solana_signTransaction">;
    params: z.ZodObject<{
        transaction: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        transaction: string;
    }, {
        transaction: string;
    }>;
}, "strip", z.ZodTypeAny, {
    method: "solana_signTransaction";
    params: {
        transaction: string;
    };
}, {
    method: "solana_signTransaction";
    params: {
        transaction: string;
    };
}>;
export declare const RpcSolanaSignAllTransactionsRequest: z.ZodObject<{
    method: z.ZodLiteral<"solana_signAllTransactions">;
    params: z.ZodObject<{
        transactions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        transactions: string[];
    }, {
        transactions: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    method: "solana_signAllTransactions";
    params: {
        transactions: string[];
    };
}, {
    method: "solana_signAllTransactions";
    params: {
        transactions: string[];
    };
}>;
export declare const RpcSolanaSignAndSendTransactionRequest: z.ZodObject<{
    method: z.ZodLiteral<"solana_signAndSendTransaction">;
    params: z.ZodObject<{
        transaction: z.ZodString;
        options: z.ZodOptional<z.ZodObject<{
            skipPreflight: z.ZodOptional<z.ZodBoolean>;
            preflightCommitment: z.ZodOptional<z.ZodEnum<["processed", "confirmed", "finalized", "recent", "single", "singleGossip", "root", "max"]>>;
            maxRetries: z.ZodOptional<z.ZodNumber>;
            minContextSlot: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            skipPreflight?: boolean | undefined;
            preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
            maxRetries?: number | undefined;
            minContextSlot?: number | undefined;
        }, {
            skipPreflight?: boolean | undefined;
            preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
            maxRetries?: number | undefined;
            minContextSlot?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        transaction: string;
        options?: {
            skipPreflight?: boolean | undefined;
            preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
            maxRetries?: number | undefined;
            minContextSlot?: number | undefined;
        } | undefined;
    }, {
        transaction: string;
        options?: {
            skipPreflight?: boolean | undefined;
            preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
            maxRetries?: number | undefined;
            minContextSlot?: number | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    method: "solana_signAndSendTransaction";
    params: {
        transaction: string;
        options?: {
            skipPreflight?: boolean | undefined;
            preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
            maxRetries?: number | undefined;
            minContextSlot?: number | undefined;
        } | undefined;
    };
}, {
    method: "solana_signAndSendTransaction";
    params: {
        transaction: string;
        options?: {
            skipPreflight?: boolean | undefined;
            preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
            maxRetries?: number | undefined;
            minContextSlot?: number | undefined;
        } | undefined;
    };
}>;
export declare const WalletSendCallsRequest: z.ZodObject<{
    method: z.ZodLiteral<"wallet_sendCalls">;
    params: z.ZodArray<z.ZodObject<{
        chainId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        from: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
        capabilities: z.ZodOptional<z.ZodAny>;
        calls: z.ZodArray<z.ZodObject<{
            to: z.ZodString;
            data: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            to: string;
            data?: string | undefined;
            value?: string | undefined;
        }, {
            to: string;
            data?: string | undefined;
            value?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        calls: {
            to: string;
            data?: string | undefined;
            value?: string | undefined;
        }[];
        chainId?: string | number | undefined;
        from?: string | undefined;
        version?: string | undefined;
        capabilities?: any;
    }, {
        calls: {
            to: string;
            data?: string | undefined;
            value?: string | undefined;
        }[];
        chainId?: string | number | undefined;
        from?: string | undefined;
        version?: string | undefined;
        capabilities?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    method: "wallet_sendCalls";
    params: {
        calls: {
            to: string;
            data?: string | undefined;
            value?: string | undefined;
        }[];
        chainId?: string | number | undefined;
        from?: string | undefined;
        version?: string | undefined;
        capabilities?: any;
    }[];
}, {
    method: "wallet_sendCalls";
    params: {
        calls: {
            to: string;
            data?: string | undefined;
            value?: string | undefined;
        }[];
        chainId?: string | number | undefined;
        from?: string | undefined;
        version?: string | undefined;
        capabilities?: any;
    }[];
}>;
export declare const WalletGetCallsReceiptRequest: z.ZodObject<{
    method: z.ZodLiteral<"wallet_getCallsStatus">;
    params: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    method: "wallet_getCallsStatus";
    params: string[];
}, {
    method: "wallet_getCallsStatus";
    params: string[];
}>;
export declare const WalletGetCapabilitiesRequest: z.ZodObject<{
    method: z.ZodLiteral<"wallet_getCapabilities">;
}, "strip", z.ZodTypeAny, {
    method: "wallet_getCapabilities";
}, {
    method: "wallet_getCapabilities";
}>;
export declare const WalletGrantPermissionsRequest: z.ZodObject<{
    method: z.ZodLiteral<"wallet_grantPermissions">;
    params: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    method: "wallet_grantPermissions";
    params: any[];
}, {
    method: "wallet_grantPermissions";
    params: any[];
}>;
export declare const WalletRevokePermissionsRequest: z.ZodObject<{
    method: z.ZodLiteral<"wallet_revokePermissions">;
    params: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    method: "wallet_revokePermissions";
    params?: any;
}, {
    method: "wallet_revokePermissions";
    params?: any;
}>;
export declare const WalletGetAssetsRequest: z.ZodObject<{
    method: z.ZodLiteral<"wallet_getAssets">;
    params: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    method: "wallet_getAssets";
    params?: any;
}, {
    method: "wallet_getAssets";
    params?: any;
}>;
export declare const FrameSession: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
export declare const EventSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
}, {
    id?: string | undefined;
}>;
export declare const W3mFrameSchema: {
    appEvent: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/SWITCH_NETWORK">;
        payload: z.ZodObject<{
            chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            chainId: string | number;
        }, {
            chainId: string | number;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/SWITCH_NETWORK";
        payload: {
            chainId: string | number;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/SWITCH_NETWORK";
        payload: {
            chainId: string | number;
        };
        id?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/CONNECT_EMAIL">;
        payload: z.ZodObject<{
            email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
        }, {
            email: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/CONNECT_EMAIL";
        payload: {
            email: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/CONNECT_EMAIL";
        payload: {
            email: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/CONNECT_DEVICE">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/CONNECT_DEVICE";
        id?: string | undefined;
    }, {
        type: "@w3m-app/CONNECT_DEVICE";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/CONNECT_OTP">;
        payload: z.ZodObject<{
            otp: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            otp: string;
        }, {
            otp: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/CONNECT_OTP";
        payload: {
            otp: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/CONNECT_OTP";
        payload: {
            otp: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/CONNECT_SOCIAL">;
        payload: z.ZodObject<{
            uri: z.ZodString;
            preferredAccountType: z.ZodOptional<z.ZodString>;
            chainId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            preferredAccountType?: string | undefined;
            chainId?: string | number | undefined;
        }, {
            uri: string;
            preferredAccountType?: string | undefined;
            chainId?: string | number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/CONNECT_SOCIAL";
        payload: {
            uri: string;
            preferredAccountType?: string | undefined;
            chainId?: string | number | undefined;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/CONNECT_SOCIAL";
        payload: {
            uri: string;
            preferredAccountType?: string | undefined;
            chainId?: string | number | undefined;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/GET_FARCASTER_URI">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/GET_FARCASTER_URI";
        id?: string | undefined;
    }, {
        type: "@w3m-app/GET_FARCASTER_URI";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/CONNECT_FARCASTER">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/CONNECT_FARCASTER";
        id?: string | undefined;
    }, {
        type: "@w3m-app/CONNECT_FARCASTER";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/GET_USER">;
        payload: z.ZodOptional<z.ZodObject<{
            chainId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            preferredAccountType: z.ZodOptional<z.ZodString>;
            socialUri: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            chainId?: string | number | undefined;
            preferredAccountType?: string | undefined;
            socialUri?: string | undefined;
        }, {
            chainId?: string | number | undefined;
            preferredAccountType?: string | undefined;
            socialUri?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/GET_USER";
        id?: string | undefined;
        payload?: {
            chainId?: string | number | undefined;
            preferredAccountType?: string | undefined;
            socialUri?: string | undefined;
        } | undefined;
    }, {
        type: "@w3m-app/GET_USER";
        id?: string | undefined;
        payload?: {
            chainId?: string | number | undefined;
            preferredAccountType?: string | undefined;
            socialUri?: string | undefined;
        } | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/GET_SOCIAL_REDIRECT_URI">;
        payload: z.ZodObject<{
            provider: z.ZodEnum<["google", "github", "apple", "facebook", "x", "discord"]>;
        }, "strip", z.ZodTypeAny, {
            provider: "google" | "github" | "apple" | "facebook" | "x" | "discord";
        }, {
            provider: "google" | "github" | "apple" | "facebook" | "x" | "discord";
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/GET_SOCIAL_REDIRECT_URI";
        payload: {
            provider: "google" | "github" | "apple" | "facebook" | "x" | "discord";
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/GET_SOCIAL_REDIRECT_URI";
        payload: {
            provider: "google" | "github" | "apple" | "facebook" | "x" | "discord";
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/SIGN_OUT">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/SIGN_OUT";
        id?: string | undefined;
    }, {
        type: "@w3m-app/SIGN_OUT";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/IS_CONNECTED">;
        payload: z.ZodOptional<z.ZodObject<{
            token: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            token: string;
        }, {
            token: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/IS_CONNECTED";
        id?: string | undefined;
        payload?: {
            token: string;
        } | undefined;
    }, {
        type: "@w3m-app/IS_CONNECTED";
        id?: string | undefined;
        payload?: {
            token: string;
        } | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/GET_CHAIN_ID">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/GET_CHAIN_ID";
        id?: string | undefined;
    }, {
        type: "@w3m-app/GET_CHAIN_ID";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS";
        id?: string | undefined;
    }, {
        type: "@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/INIT_SMART_ACCOUNT">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/INIT_SMART_ACCOUNT";
        id?: string | undefined;
    }, {
        type: "@w3m-app/INIT_SMART_ACCOUNT";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/SET_PREFERRED_ACCOUNT">;
        payload: z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/SET_PREFERRED_ACCOUNT";
        payload: {
            type: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/SET_PREFERRED_ACCOUNT";
        payload: {
            type: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/RPC_REQUEST">;
        payload: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
            method: z.ZodLiteral<"personal_sign">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "personal_sign";
            params: any[];
        }, {
            method: "personal_sign";
            params: any[];
        }>, z.ZodObject<{
            method: z.ZodLiteral<"wallet_getAssets">;
            params: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            method: "wallet_getAssets";
            params?: any;
        }, {
            method: "wallet_getAssets";
            params?: any;
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_accounts">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_accounts";
        }, {
            method: "eth_accounts";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_blockNumber">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_blockNumber";
        }, {
            method: "eth_blockNumber";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_call">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_call";
            params: any[];
        }, {
            method: "eth_call";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_chainId">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_chainId";
        }, {
            method: "eth_chainId";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_estimateGas">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_estimateGas";
            params: any[];
        }, {
            method: "eth_estimateGas";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_feeHistory">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_feeHistory";
            params: any[];
        }, {
            method: "eth_feeHistory";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_gasPrice">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_gasPrice";
        }, {
            method: "eth_gasPrice";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getAccount">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getAccount";
            params: any[];
        }, {
            method: "eth_getAccount";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getBalance">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getBalance";
            params: any[];
        }, {
            method: "eth_getBalance";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getBlockByHash">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getBlockByHash";
            params: any[];
        }, {
            method: "eth_getBlockByHash";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getBlockByNumber">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getBlockByNumber";
            params: any[];
        }, {
            method: "eth_getBlockByNumber";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getBlockReceipts">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getBlockReceipts";
            params: any[];
        }, {
            method: "eth_getBlockReceipts";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getBlockTransactionCountByHash">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getBlockTransactionCountByHash";
            params: any[];
        }, {
            method: "eth_getBlockTransactionCountByHash";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getBlockTransactionCountByNumber">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getBlockTransactionCountByNumber";
            params: any[];
        }, {
            method: "eth_getBlockTransactionCountByNumber";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getCode">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getCode";
            params: any[];
        }, {
            method: "eth_getCode";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getFilterChanges">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getFilterChanges";
            params: any[];
        }, {
            method: "eth_getFilterChanges";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getFilterLogs">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getFilterLogs";
            params: any[];
        }, {
            method: "eth_getFilterLogs";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getLogs">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getLogs";
            params: any[];
        }, {
            method: "eth_getLogs";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getProof">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getProof";
            params: any[];
        }, {
            method: "eth_getProof";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getStorageAt">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getStorageAt";
            params: any[];
        }, {
            method: "eth_getStorageAt";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getTransactionByBlockHashAndIndex">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getTransactionByBlockHashAndIndex";
            params: any[];
        }, {
            method: "eth_getTransactionByBlockHashAndIndex";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getTransactionByBlockNumberAndIndex">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getTransactionByBlockNumberAndIndex";
            params: any[];
        }, {
            method: "eth_getTransactionByBlockNumberAndIndex";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getTransactionByHash">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getTransactionByHash";
            params: any[];
        }, {
            method: "eth_getTransactionByHash";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getTransactionCount">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getTransactionCount";
            params: any[];
        }, {
            method: "eth_getTransactionCount";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getTransactionReceipt">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getTransactionReceipt";
            params: any[];
        }, {
            method: "eth_getTransactionReceipt";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getUncleCountByBlockHash">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getUncleCountByBlockHash";
            params: any[];
        }, {
            method: "eth_getUncleCountByBlockHash";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_getUncleCountByBlockNumber">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_getUncleCountByBlockNumber";
            params: any[];
        }, {
            method: "eth_getUncleCountByBlockNumber";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_maxPriorityFeePerGas">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_maxPriorityFeePerGas";
        }, {
            method: "eth_maxPriorityFeePerGas";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_newBlockFilter">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_newBlockFilter";
        }, {
            method: "eth_newBlockFilter";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_newFilter">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_newFilter";
            params: any[];
        }, {
            method: "eth_newFilter";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_newPendingTransactionFilter">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_newPendingTransactionFilter";
        }, {
            method: "eth_newPendingTransactionFilter";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_sendRawTransaction">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_sendRawTransaction";
            params: any[];
        }, {
            method: "eth_sendRawTransaction";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_syncing">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_syncing";
            params: any[];
        }, {
            method: "eth_syncing";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_uninstallFilter">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_uninstallFilter";
            params: any[];
        }, {
            method: "eth_uninstallFilter";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"personal_sign">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "personal_sign";
            params: any[];
        }, {
            method: "personal_sign";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_signTypedData_v4">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_signTypedData_v4";
            params: any[];
        }, {
            method: "eth_signTypedData_v4";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"eth_sendTransaction">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "eth_sendTransaction";
            params: any[];
        }, {
            method: "eth_sendTransaction";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"solana_signMessage">;
            params: z.ZodObject<{
                message: z.ZodString;
                pubkey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                pubkey: string;
            }, {
                message: string;
                pubkey: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "solana_signMessage";
            params: {
                message: string;
                pubkey: string;
            };
        }, {
            method: "solana_signMessage";
            params: {
                message: string;
                pubkey: string;
            };
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"solana_signTransaction">;
            params: z.ZodObject<{
                transaction: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                transaction: string;
            }, {
                transaction: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "solana_signTransaction";
            params: {
                transaction: string;
            };
        }, {
            method: "solana_signTransaction";
            params: {
                transaction: string;
            };
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"solana_signAllTransactions">;
            params: z.ZodObject<{
                transactions: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                transactions: string[];
            }, {
                transactions: string[];
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "solana_signAllTransactions";
            params: {
                transactions: string[];
            };
        }, {
            method: "solana_signAllTransactions";
            params: {
                transactions: string[];
            };
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"solana_signAndSendTransaction">;
            params: z.ZodObject<{
                transaction: z.ZodString;
                options: z.ZodOptional<z.ZodObject<{
                    skipPreflight: z.ZodOptional<z.ZodBoolean>;
                    preflightCommitment: z.ZodOptional<z.ZodEnum<["processed", "confirmed", "finalized", "recent", "single", "singleGossip", "root", "max"]>>;
                    maxRetries: z.ZodOptional<z.ZodNumber>;
                    minContextSlot: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                }, {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                transaction: string;
                options?: {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                } | undefined;
            }, {
                transaction: string;
                options?: {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                } | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "solana_signAndSendTransaction";
            params: {
                transaction: string;
                options?: {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                } | undefined;
            };
        }, {
            method: "solana_signAndSendTransaction";
            params: {
                transaction: string;
                options?: {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                } | undefined;
            };
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"wallet_getCallsStatus">;
            params: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "wallet_getCallsStatus";
            params: string[];
        }, {
            method: "wallet_getCallsStatus";
            params: string[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"wallet_sendCalls">;
            params: z.ZodArray<z.ZodObject<{
                chainId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                from: z.ZodOptional<z.ZodString>;
                version: z.ZodOptional<z.ZodString>;
                capabilities: z.ZodOptional<z.ZodAny>;
                calls: z.ZodArray<z.ZodObject<{
                    to: z.ZodString;
                    data: z.ZodOptional<z.ZodString>;
                    value: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }, {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                calls: {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }[];
                chainId?: string | number | undefined;
                from?: string | undefined;
                version?: string | undefined;
                capabilities?: any;
            }, {
                calls: {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }[];
                chainId?: string | number | undefined;
                from?: string | undefined;
                version?: string | undefined;
                capabilities?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "wallet_sendCalls";
            params: {
                calls: {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }[];
                chainId?: string | number | undefined;
                from?: string | undefined;
                version?: string | undefined;
                capabilities?: any;
            }[];
        }, {
            method: "wallet_sendCalls";
            params: {
                calls: {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }[];
                chainId?: string | number | undefined;
                from?: string | undefined;
                version?: string | undefined;
                capabilities?: any;
            }[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"wallet_getCapabilities">;
        }, "strip", z.ZodTypeAny, {
            method: "wallet_getCapabilities";
        }, {
            method: "wallet_getCapabilities";
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"wallet_grantPermissions">;
            params: z.ZodArray<z.ZodAny, "many">;
        }, "strip", z.ZodTypeAny, {
            method: "wallet_grantPermissions";
            params: any[];
        }, {
            method: "wallet_grantPermissions";
            params: any[];
        }>]>, z.ZodObject<{
            method: z.ZodLiteral<"wallet_revokePermissions">;
            params: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            method: "wallet_revokePermissions";
            params?: any;
        }, {
            method: "wallet_revokePermissions";
            params?: any;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/RPC_REQUEST";
        payload: {
            method: "eth_accounts";
        } | {
            method: "eth_blockNumber";
        } | {
            method: "eth_call";
            params: any[];
        } | {
            method: "eth_chainId";
        } | {
            method: "eth_estimateGas";
            params: any[];
        } | {
            method: "eth_feeHistory";
            params: any[];
        } | {
            method: "eth_gasPrice";
        } | {
            method: "eth_getAccount";
            params: any[];
        } | {
            method: "eth_getBalance";
            params: any[];
        } | {
            method: "eth_getBlockByHash";
            params: any[];
        } | {
            method: "eth_getBlockByNumber";
            params: any[];
        } | {
            method: "eth_getBlockReceipts";
            params: any[];
        } | {
            method: "eth_getBlockTransactionCountByHash";
            params: any[];
        } | {
            method: "eth_getBlockTransactionCountByNumber";
            params: any[];
        } | {
            method: "eth_getCode";
            params: any[];
        } | {
            method: "eth_getFilterChanges";
            params: any[];
        } | {
            method: "eth_getFilterLogs";
            params: any[];
        } | {
            method: "eth_getLogs";
            params: any[];
        } | {
            method: "eth_getProof";
            params: any[];
        } | {
            method: "eth_getStorageAt";
            params: any[];
        } | {
            method: "eth_getTransactionByBlockHashAndIndex";
            params: any[];
        } | {
            method: "eth_getTransactionByBlockNumberAndIndex";
            params: any[];
        } | {
            method: "eth_getTransactionByHash";
            params: any[];
        } | {
            method: "eth_getTransactionCount";
            params: any[];
        } | {
            method: "eth_getTransactionReceipt";
            params: any[];
        } | {
            method: "eth_getUncleCountByBlockHash";
            params: any[];
        } | {
            method: "eth_getUncleCountByBlockNumber";
            params: any[];
        } | {
            method: "eth_maxPriorityFeePerGas";
        } | {
            method: "eth_newBlockFilter";
        } | {
            method: "eth_newFilter";
            params: any[];
        } | {
            method: "eth_newPendingTransactionFilter";
        } | {
            method: "eth_sendRawTransaction";
            params: any[];
        } | {
            method: "eth_syncing";
            params: any[];
        } | {
            method: "eth_uninstallFilter";
            params: any[];
        } | {
            method: "personal_sign";
            params: any[];
        } | {
            method: "eth_signTypedData_v4";
            params: any[];
        } | {
            method: "eth_sendTransaction";
            params: any[];
        } | {
            method: "solana_signMessage";
            params: {
                message: string;
                pubkey: string;
            };
        } | {
            method: "solana_signTransaction";
            params: {
                transaction: string;
            };
        } | {
            method: "solana_signAllTransactions";
            params: {
                transactions: string[];
            };
        } | {
            method: "solana_signAndSendTransaction";
            params: {
                transaction: string;
                options?: {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                } | undefined;
            };
        } | {
            method: "wallet_sendCalls";
            params: {
                calls: {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }[];
                chainId?: string | number | undefined;
                from?: string | undefined;
                version?: string | undefined;
                capabilities?: any;
            }[];
        } | {
            method: "wallet_getCallsStatus";
            params: string[];
        } | {
            method: "wallet_getCapabilities";
        } | {
            method: "wallet_grantPermissions";
            params: any[];
        } | {
            method: "wallet_revokePermissions";
            params?: any;
        } | {
            method: "wallet_getAssets";
            params?: any;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/RPC_REQUEST";
        payload: {
            method: "eth_accounts";
        } | {
            method: "eth_blockNumber";
        } | {
            method: "eth_call";
            params: any[];
        } | {
            method: "eth_chainId";
        } | {
            method: "eth_estimateGas";
            params: any[];
        } | {
            method: "eth_feeHistory";
            params: any[];
        } | {
            method: "eth_gasPrice";
        } | {
            method: "eth_getAccount";
            params: any[];
        } | {
            method: "eth_getBalance";
            params: any[];
        } | {
            method: "eth_getBlockByHash";
            params: any[];
        } | {
            method: "eth_getBlockByNumber";
            params: any[];
        } | {
            method: "eth_getBlockReceipts";
            params: any[];
        } | {
            method: "eth_getBlockTransactionCountByHash";
            params: any[];
        } | {
            method: "eth_getBlockTransactionCountByNumber";
            params: any[];
        } | {
            method: "eth_getCode";
            params: any[];
        } | {
            method: "eth_getFilterChanges";
            params: any[];
        } | {
            method: "eth_getFilterLogs";
            params: any[];
        } | {
            method: "eth_getLogs";
            params: any[];
        } | {
            method: "eth_getProof";
            params: any[];
        } | {
            method: "eth_getStorageAt";
            params: any[];
        } | {
            method: "eth_getTransactionByBlockHashAndIndex";
            params: any[];
        } | {
            method: "eth_getTransactionByBlockNumberAndIndex";
            params: any[];
        } | {
            method: "eth_getTransactionByHash";
            params: any[];
        } | {
            method: "eth_getTransactionCount";
            params: any[];
        } | {
            method: "eth_getTransactionReceipt";
            params: any[];
        } | {
            method: "eth_getUncleCountByBlockHash";
            params: any[];
        } | {
            method: "eth_getUncleCountByBlockNumber";
            params: any[];
        } | {
            method: "eth_maxPriorityFeePerGas";
        } | {
            method: "eth_newBlockFilter";
        } | {
            method: "eth_newFilter";
            params: any[];
        } | {
            method: "eth_newPendingTransactionFilter";
        } | {
            method: "eth_sendRawTransaction";
            params: any[];
        } | {
            method: "eth_syncing";
            params: any[];
        } | {
            method: "eth_uninstallFilter";
            params: any[];
        } | {
            method: "personal_sign";
            params: any[];
        } | {
            method: "eth_signTypedData_v4";
            params: any[];
        } | {
            method: "eth_sendTransaction";
            params: any[];
        } | {
            method: "solana_signMessage";
            params: {
                message: string;
                pubkey: string;
            };
        } | {
            method: "solana_signTransaction";
            params: {
                transaction: string;
            };
        } | {
            method: "solana_signAllTransactions";
            params: {
                transactions: string[];
            };
        } | {
            method: "solana_signAndSendTransaction";
            params: {
                transaction: string;
                options?: {
                    skipPreflight?: boolean | undefined;
                    preflightCommitment?: "processed" | "confirmed" | "finalized" | "recent" | "single" | "singleGossip" | "root" | "max" | undefined;
                    maxRetries?: number | undefined;
                    minContextSlot?: number | undefined;
                } | undefined;
            };
        } | {
            method: "wallet_sendCalls";
            params: {
                calls: {
                    to: string;
                    data?: string | undefined;
                    value?: string | undefined;
                }[];
                chainId?: string | number | undefined;
                from?: string | undefined;
                version?: string | undefined;
                capabilities?: any;
            }[];
        } | {
            method: "wallet_getCallsStatus";
            params: string[];
        } | {
            method: "wallet_getCapabilities";
        } | {
            method: "wallet_grantPermissions";
            params: any[];
        } | {
            method: "wallet_revokePermissions";
            params?: any;
        } | {
            method: "wallet_getAssets";
            params?: any;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/UPDATE_EMAIL">;
        payload: z.ZodObject<{
            email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
        }, {
            email: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/UPDATE_EMAIL";
        payload: {
            email: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/UPDATE_EMAIL";
        payload: {
            email: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/UPDATE_EMAIL_PRIMARY_OTP">;
        payload: z.ZodObject<{
            otp: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            otp: string;
        }, {
            otp: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/UPDATE_EMAIL_PRIMARY_OTP";
        payload: {
            otp: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/UPDATE_EMAIL_PRIMARY_OTP";
        payload: {
            otp: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/UPDATE_EMAIL_SECONDARY_OTP">;
        payload: z.ZodObject<{
            otp: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            otp: string;
        }, {
            otp: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/UPDATE_EMAIL_SECONDARY_OTP";
        payload: {
            otp: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/UPDATE_EMAIL_SECONDARY_OTP";
        payload: {
            otp: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/SYNC_THEME">;
        payload: z.ZodObject<{
            themeMode: z.ZodOptional<z.ZodEnum<["light", "dark"]>>;
            themeVariables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
            w3mThemeVariables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            themeMode?: "light" | "dark" | undefined;
            themeVariables?: Record<string, string | number> | undefined;
            w3mThemeVariables?: Record<string, string> | undefined;
        }, {
            themeMode?: "light" | "dark" | undefined;
            themeVariables?: Record<string, string | number> | undefined;
            w3mThemeVariables?: Record<string, string> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/SYNC_THEME";
        payload: {
            themeMode?: "light" | "dark" | undefined;
            themeVariables?: Record<string, string | number> | undefined;
            w3mThemeVariables?: Record<string, string> | undefined;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/SYNC_THEME";
        payload: {
            themeMode?: "light" | "dark" | undefined;
            themeVariables?: Record<string, string | number> | undefined;
            w3mThemeVariables?: Record<string, string> | undefined;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/SYNC_DAPP_DATA">;
        payload: z.ZodObject<{
            metadata: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                description: z.ZodString;
                url: z.ZodString;
                icons: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                url: string;
                name: string;
                description: string;
                icons: string[];
            }, {
                url: string;
                name: string;
                description: string;
                icons: string[];
            }>>;
            sdkVersion: z.ZodType<SdkVersion>;
            sdkType: z.ZodOptional<z.ZodType<SdkType, z.ZodTypeDef, SdkType>>;
            projectId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            projectId: string;
            metadata?: {
                url: string;
                name: string;
                description: string;
                icons: string[];
            } | undefined;
            sdkVersion?: SdkVersion;
            sdkType?: SdkType | undefined;
        }, {
            projectId: string;
            metadata?: {
                url: string;
                name: string;
                description: string;
                icons: string[];
            } | undefined;
            sdkVersion?: SdkVersion;
            sdkType?: SdkType | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/SYNC_DAPP_DATA";
        payload: {
            projectId: string;
            metadata?: {
                url: string;
                name: string;
                description: string;
                icons: string[];
            } | undefined;
            sdkVersion?: SdkVersion;
            sdkType?: SdkType | undefined;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-app/SYNC_DAPP_DATA";
        payload: {
            projectId: string;
            metadata?: {
                url: string;
                name: string;
                description: string;
                icons: string[];
            } | undefined;
            sdkVersion?: SdkVersion;
            sdkType?: SdkType | undefined;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-app/RELOAD">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-app/RELOAD";
        id?: string | undefined;
    }, {
        type: "@w3m-app/RELOAD";
        id?: string | undefined;
    }>]>;
    frameEvent: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SWITCH_NETWORK_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SWITCH_NETWORK_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SWITCH_NETWORK_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SWITCH_NETWORK_SUCCESS">;
        payload: z.ZodObject<{
            chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            chainId: string | number;
        }, {
            chainId: string | number;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SWITCH_NETWORK_SUCCESS";
        payload: {
            chainId: string | number;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SWITCH_NETWORK_SUCCESS";
        payload: {
            chainId: string | number;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_EMAIL_SUCCESS">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["VERIFY_DEVICE", "VERIFY_OTP", "CONNECT"]>;
        }, "strip", z.ZodTypeAny, {
            action: "VERIFY_DEVICE" | "VERIFY_OTP" | "CONNECT";
        }, {
            action: "VERIFY_DEVICE" | "VERIFY_OTP" | "CONNECT";
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_EMAIL_SUCCESS";
        payload: {
            action: "VERIFY_DEVICE" | "VERIFY_OTP" | "CONNECT";
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_EMAIL_SUCCESS";
        payload: {
            action: "VERIFY_DEVICE" | "VERIFY_OTP" | "CONNECT";
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_EMAIL_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_EMAIL_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_EMAIL_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_FARCASTER_URI_SUCCESS">;
        payload: z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_FARCASTER_URI_SUCCESS";
        payload: {
            url: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_FARCASTER_URI_SUCCESS";
        payload: {
            url: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_FARCASTER_URI_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_FARCASTER_URI_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_FARCASTER_URI_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_FARCASTER_SUCCESS">;
        payload: z.ZodObject<{
            userName: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            userName: string;
        }, {
            userName: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_FARCASTER_SUCCESS";
        payload: {
            userName: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_FARCASTER_SUCCESS";
        payload: {
            userName: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_FARCASTER_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_FARCASTER_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_FARCASTER_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_OTP_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_OTP_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_OTP_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_OTP_SUCCESS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_OTP_SUCCESS";
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_OTP_SUCCESS";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_DEVICE_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_DEVICE_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_DEVICE_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_DEVICE_SUCCESS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_DEVICE_SUCCESS";
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_DEVICE_SUCCESS";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_SOCIAL_SUCCESS">;
        payload: z.ZodObject<{
            email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            address: z.ZodString;
            chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                address: z.ZodString;
                type: z.ZodEnum<["eoa", "smartAccount"]>;
            }, "strip", z.ZodTypeAny, {
                type: "eoa" | "smartAccount";
                address: string;
            }, {
                type: "eoa" | "smartAccount";
                address: string;
            }>, "many">>;
            userName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            preferredAccountType: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            userName?: string | null | undefined;
            preferredAccountType?: string | undefined;
        }, {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            userName?: string | null | undefined;
            preferredAccountType?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_SOCIAL_SUCCESS";
        payload: {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            userName?: string | null | undefined;
            preferredAccountType?: string | undefined;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_SOCIAL_SUCCESS";
        payload: {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            userName?: string | null | undefined;
            preferredAccountType?: string | undefined;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/CONNECT_SOCIAL_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/CONNECT_SOCIAL_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/CONNECT_SOCIAL_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_USER_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_USER_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_USER_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_USER_SUCCESS">;
        payload: z.ZodObject<{
            email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            address: z.ZodString;
            chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            smartAccountDeployed: z.ZodOptional<z.ZodBoolean>;
            accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                address: z.ZodString;
                type: z.ZodEnum<["eoa", "smartAccount"]>;
            }, "strip", z.ZodTypeAny, {
                type: "eoa" | "smartAccount";
                address: string;
            }, {
                type: "eoa" | "smartAccount";
                address: string;
            }>, "many">>;
            preferredAccountType: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            smartAccountDeployed?: boolean | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            preferredAccountType?: string | undefined;
        }, {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            smartAccountDeployed?: boolean | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            preferredAccountType?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_USER_SUCCESS";
        payload: {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            smartAccountDeployed?: boolean | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            preferredAccountType?: string | undefined;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_USER_SUCCESS";
        payload: {
            chainId: string | number;
            address: string;
            email?: string | null | undefined;
            smartAccountDeployed?: boolean | undefined;
            accounts?: {
                type: "eoa" | "smartAccount";
                address: string;
            }[] | undefined;
            preferredAccountType?: string | undefined;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS">;
        payload: z.ZodObject<{
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            uri: string;
        }, {
            uri: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS";
        payload: {
            uri: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS";
        payload: {
            uri: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SIGN_OUT_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SIGN_OUT_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SIGN_OUT_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SIGN_OUT_SUCCESS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SIGN_OUT_SUCCESS";
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SIGN_OUT_SUCCESS";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/IS_CONNECTED_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/IS_CONNECTED_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/IS_CONNECTED_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/IS_CONNECTED_SUCCESS">;
        payload: z.ZodObject<{
            isConnected: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            isConnected: boolean;
        }, {
            isConnected: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/IS_CONNECTED_SUCCESS";
        payload: {
            isConnected: boolean;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/IS_CONNECTED_SUCCESS";
        payload: {
            isConnected: boolean;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_CHAIN_ID_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_CHAIN_ID_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_CHAIN_ID_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_CHAIN_ID_SUCCESS">;
        payload: z.ZodObject<{
            chainId: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            chainId: string | number;
        }, {
            chainId: string | number;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_CHAIN_ID_SUCCESS";
        payload: {
            chainId: string | number;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_CHAIN_ID_SUCCESS";
        payload: {
            chainId: string | number;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/RPC_REQUEST_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/RPC_REQUEST_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/RPC_REQUEST_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/RPC_REQUEST_SUCCESS">;
        payload: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/RPC_REQUEST_SUCCESS";
        id?: string | undefined;
        payload?: any;
    }, {
        type: "@w3m-frame/RPC_REQUEST_SUCCESS";
        id?: string | undefined;
        payload?: any;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SESSION_UPDATE">;
        payload: z.ZodObject<{
            token: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            token: string;
        }, {
            token: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SESSION_UPDATE";
        payload: {
            token: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SESSION_UPDATE";
        payload: {
            token: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/UPDATE_EMAIL_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/UPDATE_EMAIL_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/UPDATE_EMAIL_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/UPDATE_EMAIL_SUCCESS">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["VERIFY_PRIMARY_OTP", "VERIFY_SECONDARY_OTP"]>;
        }, "strip", z.ZodTypeAny, {
            action: "VERIFY_PRIMARY_OTP" | "VERIFY_SECONDARY_OTP";
        }, {
            action: "VERIFY_PRIMARY_OTP" | "VERIFY_SECONDARY_OTP";
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/UPDATE_EMAIL_SUCCESS";
        payload: {
            action: "VERIFY_PRIMARY_OTP" | "VERIFY_SECONDARY_OTP";
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/UPDATE_EMAIL_SUCCESS";
        payload: {
            action: "VERIFY_PRIMARY_OTP" | "VERIFY_SECONDARY_OTP";
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS";
        id?: string | undefined;
    }, {
        type: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS">;
        payload: z.ZodObject<{
            newEmail: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            newEmail: string;
        }, {
            newEmail: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS";
        payload: {
            newEmail: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS";
        payload: {
            newEmail: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SYNC_THEME_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SYNC_THEME_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SYNC_THEME_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SYNC_THEME_SUCCESS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SYNC_THEME_SUCCESS";
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SYNC_THEME_SUCCESS";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SYNC_DAPP_DATA_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SYNC_DAPP_DATA_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SYNC_DAPP_DATA_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SYNC_DAPP_DATA_SUCCESS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SYNC_DAPP_DATA_SUCCESS";
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SYNC_DAPP_DATA_SUCCESS";
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS">;
        payload: z.ZodObject<{
            smartAccountEnabledNetworks: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            smartAccountEnabledNetworks: number[];
        }, {
            smartAccountEnabledNetworks: number[];
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS";
        payload: {
            smartAccountEnabledNetworks: number[];
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS";
        payload: {
            smartAccountEnabledNetworks: number[];
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/INIT_SMART_ACCOUNT_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/INIT_SMART_ACCOUNT_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/INIT_SMART_ACCOUNT_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS">;
        payload: z.ZodObject<{
            type: z.ZodString;
            address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            address: string;
        }, {
            type: string;
            address: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS";
        payload: {
            type: string;
            address: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS";
        payload: {
            type: string;
            address: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/READY">;
        payload: z.ZodObject<{
            version: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            version?: string | undefined;
        }, {
            version?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/READY";
        payload: {
            version?: string | undefined;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/READY";
        payload: {
            version?: string | undefined;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/RELOAD_ERROR">;
        payload: z.ZodObject<{
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
        }, {
            message: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/RELOAD_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }, {
        type: "@w3m-frame/RELOAD_ERROR";
        payload: {
            message: string;
        };
        id?: string | undefined;
    }>]>, z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodLiteral<"@w3m-frame/RELOAD_SUCCESS">;
    }, "strip", z.ZodTypeAny, {
        type: "@w3m-frame/RELOAD_SUCCESS";
        id?: string | undefined;
    }, {
        type: "@w3m-frame/RELOAD_SUCCESS";
        id?: string | undefined;
    }>]>;
};
export {};

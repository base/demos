import { PublicClient, WalletSendCallsParameters } from 'viem';
import { InsufficientBalanceErrorData } from '../../core/error/errors.js';
import { Hex } from 'viem';
import { Attribution, RequestArguments } from '../../core/provider/interface.js';
import { EmptyFetchPermissionsRequest, FetchPermissionsRequest } from '../../core/rpc/coinbase_fetchSpendPermissions.js';
import { WalletConnectResponse } from '../../core/rpc/wallet_connect.js';
import { Address } from '../../core/type/index.js';
export declare function getSenderFromRequest(request: RequestArguments): `0x${string}` | null;
export declare function addSenderToRequest(request: RequestArguments, sender: Address): {
    params: any[];
    method: string;
};
export declare function assertParamsChainId(params: unknown): asserts params is [
    {
        chainId: `0x${string}`;
    }
];
export declare function assertGetCapabilitiesParams(params: unknown): asserts params is [`0x${string}`, `0x${string}`[]?];
export declare function injectRequestCapabilities<T extends RequestArguments>(request: T, capabilities: Record<string, unknown>): T;
/**
 * Initializes the `subAccountConfig` store with the owner account function and capabilities
 * @returns void
 */
export declare function initSubAccountConfig(): Promise<void>;
export type PermissionDetails = {
    spender: Address;
    token: Address;
    allowance: Hex;
    salt: Hex;
    extraData: Hex;
};
export type SpendPermission = PermissionDetails & {
    account: Address;
    period: number;
    start: number;
    end: number;
};
export type SpendPermissionBatch = {
    account: Address;
    period: number;
    start: number;
    end: number;
    permissions: PermissionDetails[];
};
export declare function assertFetchPermissionsRequest(request: RequestArguments): asserts request is FetchPermissionsRequest | EmptyFetchPermissionsRequest;
export declare function fillMissingParamsForFetchPermissions(request: FetchPermissionsRequest | EmptyFetchPermissionsRequest): FetchPermissionsRequest;
export declare function createSpendPermissionMessage({ spendPermission, chainId, }: {
    spendPermission: SpendPermission;
    chainId: number;
}): {
    readonly domain: {
        readonly name: "Spend Permission Manager";
        readonly version: "1";
        readonly chainId: number;
        readonly verifyingContract: "0xf85210B21cC50302F477BA56686d2019dC9b67Ad";
    };
    readonly types: {
        readonly SpendPermission: readonly [{
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
        }];
    };
    readonly primaryType: "SpendPermission";
    readonly message: {
        readonly account: `0x${string}`;
        readonly spender: `0x${string}`;
        readonly token: `0x${string}`;
        readonly allowance: `0x${string}`;
        readonly period: number;
        readonly start: number;
        readonly end: number;
        readonly salt: `0x${string}`;
        readonly extraData: `0x${string}`;
    };
};
export declare function createSpendPermissionBatchMessage({ spendPermissionBatch, chainId, }: {
    spendPermissionBatch: SpendPermissionBatch;
    chainId: number;
}): {
    readonly domain: {
        readonly name: "Spend Permission Manager";
        readonly version: "1";
        readonly chainId: number;
        readonly verifyingContract: "0xf85210B21cC50302F477BA56686d2019dC9b67Ad";
    };
    readonly types: {
        readonly SpendPermissionBatch: readonly [{
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly name: "period";
            readonly type: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
        }, {
            readonly name: "permissions";
            readonly type: "PermissionDetails[]";
        }];
        readonly PermissionDetails: readonly [{
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
        }];
    };
    readonly primaryType: "SpendPermissionBatch";
    readonly message: {
        readonly account: `0x${string}`;
        readonly period: number;
        readonly start: number;
        readonly end: number;
        readonly permissions: {
            spender: `0x${string}`;
            token: `0x${string}`;
            allowance: `0x${string}`;
            salt: `0x${string}`;
            extraData: `0x${string}`;
        }[];
    };
};
export declare function waitForCallsTransactionHash({ client, id, }: {
    client: PublicClient;
    id: string;
}): Promise<`0x${string}` | undefined>;
export declare function createWalletSendCallsRequest({ calls, from, chainId, capabilities, }: {
    calls: {
        to: Address;
        data: Hex;
        value: Hex;
    }[];
    from: Address;
    chainId: number;
    capabilities?: Record<string, unknown>;
}): {
    method: "wallet_sendCalls";
    params: WalletSendCallsParameters;
};
export declare function presentSubAccountFundingDialog(): Promise<"cancel" | "update_permission" | "continue_popup">;
export declare function parseFundingOptions({ errorData, sourceAddress, }: {
    errorData: InsufficientBalanceErrorData;
    sourceAddress: Address;
}): {
    token: Address;
    requiredAmount: bigint;
}[];
export declare function isSendCallsParams(params: unknown): params is WalletSendCallsParameters;
export declare function isEthSendTransactionParams(params: unknown): params is [
    {
        to: Address;
        data: Hex;
        from: Address;
        value: Hex;
    }
];
export declare function compute16ByteHash(input: string): Hex;
export declare function makeDataSuffix({ attribution, dappOrigin, }: {
    attribution?: Attribution;
    dappOrigin: string;
}): Hex | undefined;
/**
 * Checks if a specific capability is present in a request's params
 * @param request The request object to check
 * @param capabilityName The name of the capability to check for
 * @returns boolean indicating if the capability is present
 */
export declare function requestHasCapability(request: RequestArguments, capabilityName: string): boolean;
/**
 * Prepends an item to an array without duplicates
 * @param array The array to prepend to
 * @param item The item to prepend
 * @returns The array with the item prepended
 */
export declare function prependWithoutDuplicates<T>(array: T[], item: T): T[];
/**
 * Appends an item to an array without duplicates
 * @param array The array to append to
 * @param item The item to append
 * @returns The array with the item appended
 */
export declare function appendWithoutDuplicates<T>(array: T[], item: T): T[];
export declare function getCachedWalletConnectResponse(): Promise<WalletConnectResponse | null>;
//# sourceMappingURL=utils.d.ts.map
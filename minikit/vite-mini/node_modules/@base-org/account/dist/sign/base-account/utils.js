import { hexToBigInt, isAddress } from 'viem';
import { keccak256, numberToHex, slice, toHex } from 'viem';
import { standardErrors } from '../../core/error/errors.js';
import { logDialogActionClicked, logDialogDismissed, logDialogShown, } from '../../core/telemetry/events/dialog.js';
import { config, store } from '../../store/store.js';
import { initDialog } from '../../ui/Dialog/index.js';
import { get } from '../../util/get.js';
import { waitForCallsStatus } from 'viem/actions';
import { getCryptoKeyAccount } from '../../kms/crypto-key/index.js';
import { spendPermissionManagerAddress } from './utils/constants.js';
// ***************************************************************
// Utility
// ***************************************************************
export function getSenderFromRequest(request) {
    var _a;
    if (!Array.isArray(request.params)) {
        return null;
    }
    switch (request.method) {
        case 'personal_sign':
            return request.params[1];
        case 'eth_signTypedData_v4':
            return request.params[0];
        case 'eth_signTransaction':
        case 'eth_sendTransaction':
        case 'wallet_sendCalls':
            return (_a = request.params[0]) === null || _a === void 0 ? void 0 : _a.from;
        default:
            return null;
    }
}
export function addSenderToRequest(request, sender) {
    if (!Array.isArray(request.params)) {
        throw standardErrors.rpc.invalidParams();
    }
    const params = [...request.params];
    switch (request.method) {
        case 'eth_signTransaction':
        case 'eth_sendTransaction':
        case 'wallet_sendCalls':
            params[0].from = sender;
            break;
        case 'eth_signTypedData_v4':
            params[0] = sender;
            break;
        case 'personal_sign':
            params[1] = sender;
            break;
        default:
            break;
    }
    return Object.assign(Object.assign({}, request), { params });
}
export function assertParamsChainId(params) {
    var _a;
    if (!params || !Array.isArray(params) || !((_a = params[0]) === null || _a === void 0 ? void 0 : _a.chainId)) {
        throw standardErrors.rpc.invalidParams();
    }
    if (typeof params[0].chainId !== 'string' && typeof params[0].chainId !== 'number') {
        throw standardErrors.rpc.invalidParams();
    }
}
export function assertGetCapabilitiesParams(params) {
    if (!params || !Array.isArray(params) || (params.length !== 1 && params.length !== 2)) {
        throw standardErrors.rpc.invalidParams();
    }
    if (typeof params[0] !== 'string' || !isAddress(params[0])) {
        throw standardErrors.rpc.invalidParams();
    }
    if (params.length === 2) {
        if (!Array.isArray(params[1])) {
            throw standardErrors.rpc.invalidParams();
        }
        for (const param of params[1]) {
            if (typeof param !== 'string' || !param.startsWith('0x')) {
                throw standardErrors.rpc.invalidParams();
            }
        }
    }
}
export function injectRequestCapabilities(request, capabilities) {
    // Modify request to include auto sub account capabilities
    const modifiedRequest = Object.assign({}, request);
    if (capabilities && request.method.startsWith('wallet_')) {
        let requestCapabilities = get(modifiedRequest, 'params.0.capabilities');
        if (typeof requestCapabilities === 'undefined') {
            requestCapabilities = {};
        }
        if (typeof requestCapabilities !== 'object') {
            throw standardErrors.rpc.invalidParams();
        }
        requestCapabilities = Object.assign(Object.assign({}, capabilities), requestCapabilities);
        if (modifiedRequest.params && Array.isArray(modifiedRequest.params)) {
            modifiedRequest.params[0] = Object.assign(Object.assign({}, modifiedRequest.params[0]), { capabilities: requestCapabilities });
        }
    }
    return modifiedRequest;
}
/**
 * Initializes the `subAccountConfig` store with the owner account function and capabilities
 * @returns void
 */
export async function initSubAccountConfig() {
    var _a;
    const config = (_a = store.subAccountsConfig.get()) !== null && _a !== void 0 ? _a : {};
    const capabilities = {};
    if (config.enableAutoSubAccounts) {
        // Get the owner account
        const { account: owner } = config.toOwnerAccount
            ? await config.toOwnerAccount()
            : await getCryptoKeyAccount();
        if (!owner) {
            throw standardErrors.provider.unauthorized('No owner account found');
        }
        capabilities.addSubAccount = {
            account: {
                type: 'create',
                keys: [
                    {
                        type: owner.address ? 'address' : 'webauthn-p256',
                        publicKey: owner.address || owner.publicKey,
                    },
                ],
            },
        };
    }
    // Store the owner account and capabilities in the non-persisted config
    store.subAccountsConfig.set({
        capabilities,
    });
}
export function assertFetchPermissionsRequest(request) {
    if (request.method === 'coinbase_fetchPermissions' && request.params === undefined) {
        return;
    }
    if (request.method === 'coinbase_fetchPermissions' &&
        Array.isArray(request.params) &&
        request.params.length === 1 &&
        typeof request.params[0] === 'object') {
        if (typeof request.params[0].account !== 'string' ||
            !request.params[0].chainId.startsWith('0x')) {
            throw standardErrors.rpc.invalidParams('FetchPermissions - Invalid params: params[0].account must be a hex string');
        }
        if (typeof request.params[0].chainId !== 'string' ||
            !request.params[0].chainId.startsWith('0x')) {
            throw standardErrors.rpc.invalidParams('FetchPermissions - Invalid params: params[0].chainId must be a hex string');
        }
        if (typeof request.params[0].spender !== 'string' ||
            !request.params[0].spender.startsWith('0x')) {
            throw standardErrors.rpc.invalidParams('FetchPermissions - Invalid params: params[0].spender must be a hex string');
        }
        return;
    }
    throw standardErrors.rpc.invalidParams();
}
export function fillMissingParamsForFetchPermissions(request) {
    var _a, _b, _c;
    if (request.params !== undefined) {
        return request;
    }
    // this is based on the assumption that the first account is the active account
    // it could change in the context of multi-(universal)-account
    const accountFromStore = (_a = store.getState().account.accounts) === null || _a === void 0 ? void 0 : _a[0];
    const chainId = (_b = store.getState().account.chain) === null || _b === void 0 ? void 0 : _b.id;
    const subAccountFromStore = (_c = store.getState().subAccount) === null || _c === void 0 ? void 0 : _c.address;
    if (!accountFromStore || !subAccountFromStore || !chainId) {
        throw standardErrors.rpc.invalidParams('FetchPermissions - one or more of account, sub account, or chain id is missing, connect to sub account via wallet_connect first');
    }
    return {
        method: 'coinbase_fetchPermissions',
        params: [
            {
                account: accountFromStore,
                chainId: numberToHex(chainId),
                spender: subAccountFromStore,
            },
        ],
    };
}
export function createSpendPermissionMessage({ spendPermission, chainId, }) {
    return {
        domain: {
            name: 'Spend Permission Manager',
            version: '1',
            chainId: chainId,
            verifyingContract: spendPermissionManagerAddress,
        },
        types: {
            SpendPermission: [
                { name: 'account', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'token', type: 'address' },
                { name: 'allowance', type: 'uint160' },
                { name: 'period', type: 'uint48' },
                { name: 'start', type: 'uint48' },
                { name: 'end', type: 'uint48' },
                { name: 'salt', type: 'uint256' },
                { name: 'extraData', type: 'bytes' },
            ],
        },
        primaryType: 'SpendPermission',
        message: {
            account: spendPermission.account,
            spender: spendPermission.spender,
            token: spendPermission.token,
            allowance: spendPermission.allowance,
            period: spendPermission.period,
            start: spendPermission.start,
            end: spendPermission.end,
            salt: spendPermission.salt,
            extraData: spendPermission.extraData,
        },
    };
}
export function createSpendPermissionBatchMessage({ spendPermissionBatch, chainId, }) {
    return {
        domain: {
            name: 'Spend Permission Manager',
            version: '1',
            chainId,
            verifyingContract: spendPermissionManagerAddress,
        },
        types: {
            SpendPermissionBatch: [
                { name: 'account', type: 'address' },
                { name: 'period', type: 'uint48' },
                { name: 'start', type: 'uint48' },
                { name: 'end', type: 'uint48' },
                { name: 'permissions', type: 'PermissionDetails[]' },
            ],
            PermissionDetails: [
                { name: 'spender', type: 'address' },
                { name: 'token', type: 'address' },
                { name: 'allowance', type: 'uint160' },
                { name: 'salt', type: 'uint256' },
                { name: 'extraData', type: 'bytes' },
            ],
        },
        primaryType: 'SpendPermissionBatch',
        message: {
            account: spendPermissionBatch.account,
            period: spendPermissionBatch.period,
            start: spendPermissionBatch.start,
            end: spendPermissionBatch.end,
            permissions: spendPermissionBatch.permissions.map((p) => ({
                spender: p.spender,
                token: p.token,
                allowance: p.allowance,
                salt: p.salt,
                extraData: p.extraData,
            })),
        },
    };
}
export async function waitForCallsTransactionHash({ client, id, }) {
    var _a;
    const result = await waitForCallsStatus(client, {
        id,
    });
    if (result.status === 'success') {
        return (_a = result.receipts) === null || _a === void 0 ? void 0 : _a[0].transactionHash;
    }
    throw standardErrors.rpc.internal('failed to send transaction');
}
export function createWalletSendCallsRequest({ calls, from, chainId, capabilities, }) {
    const paymasterUrls = config.get().paymasterUrls;
    let request = {
        method: 'wallet_sendCalls',
        params: [
            {
                version: '1.0',
                calls,
                chainId: numberToHex(chainId),
                from,
                atomicRequired: true,
                capabilities,
            },
        ],
    };
    if (paymasterUrls === null || paymasterUrls === void 0 ? void 0 : paymasterUrls[chainId]) {
        request = injectRequestCapabilities(request, {
            paymasterService: { url: paymasterUrls === null || paymasterUrls === void 0 ? void 0 : paymasterUrls[chainId] },
        });
    }
    return request;
}
export async function presentSubAccountFundingDialog() {
    const dialog = initDialog();
    const userChoice = await new Promise((resolve) => {
        logDialogShown({ dialogContext: 'sub_account_insufficient_balance' });
        dialog.presentItem({
            title: 'Insufficient spend permission',
            message: "Your spend permission's remaining balance cannot cover this transaction. Please choose how to proceed:",
            onClose: () => {
                logDialogDismissed({ dialogContext: 'sub_account_insufficient_balance' });
                dialog.clear();
            },
            actionItems: [
                {
                    text: 'Edit spend permission',
                    variant: 'primary',
                    onClick: () => {
                        logDialogActionClicked({
                            dialogContext: 'sub_account_insufficient_balance',
                            dialogAction: 'create_permission',
                        });
                        dialog.clear();
                        resolve('update_permission');
                    },
                },
                {
                    text: 'Use primary account',
                    variant: 'secondary',
                    onClick: () => {
                        logDialogActionClicked({
                            dialogContext: 'sub_account_insufficient_balance',
                            dialogAction: 'continue_in_popup',
                        });
                        dialog.clear();
                        resolve('continue_popup');
                    },
                },
            ],
        });
    });
    return userChoice;
}
export function parseFundingOptions({ errorData, sourceAddress, }) {
    var _a;
    const spendPermissionRequests = [];
    for (const [token, { amount, sources }] of Object.entries((_a = errorData === null || errorData === void 0 ? void 0 : errorData.required) !== null && _a !== void 0 ? _a : {})) {
        const sourcesWithSufficientBalance = sources.filter((source) => {
            return (hexToBigInt(source.balance) >= hexToBigInt(amount) &&
                source.address.toLowerCase() === (sourceAddress === null || sourceAddress === void 0 ? void 0 : sourceAddress.toLowerCase()));
        });
        if (sourcesWithSufficientBalance.length === 0) {
            throw new Error('Source address has insufficient balance for a token');
        }
        spendPermissionRequests.push({
            token: token,
            requiredAmount: hexToBigInt(amount),
        });
    }
    return spendPermissionRequests;
}
export function isSendCallsParams(params) {
    return typeof params === 'object' && params !== null && 'calls' in params;
}
export function isEthSendTransactionParams(params) {
    return (Array.isArray(params) &&
        params.length === 1 &&
        typeof params[0] === 'object' &&
        params[0] !== null &&
        'to' in params[0]);
}
export function compute16ByteHash(input) {
    return slice(keccak256(toHex(input)), 0, 16);
}
export function makeDataSuffix({ attribution, dappOrigin, }) {
    if (!attribution) {
        return;
    }
    if ('auto' in attribution && attribution.auto && dappOrigin) {
        return compute16ByteHash(dappOrigin);
    }
    if ('dataSuffix' in attribution) {
        return attribution.dataSuffix;
    }
    return;
}
/**
 * Checks if a specific capability is present in a request's params
 * @param request The request object to check
 * @param capabilityName The name of the capability to check for
 * @returns boolean indicating if the capability is present
 */
export function requestHasCapability(request, capabilityName) {
    var _a;
    if (!Array.isArray(request === null || request === void 0 ? void 0 : request.params))
        return false;
    const capabilities = (_a = request.params[0]) === null || _a === void 0 ? void 0 : _a.capabilities;
    if (!capabilities || typeof capabilities !== 'object')
        return false;
    return capabilityName in capabilities;
}
/**
 * Prepends an item to an array without duplicates
 * @param array The array to prepend to
 * @param item The item to prepend
 * @returns The array with the item prepended
 */
export function prependWithoutDuplicates(array, item) {
    const filtered = array.filter((i) => i !== item);
    return [item, ...filtered];
}
/**
 * Appends an item to an array without duplicates
 * @param array The array to append to
 * @param item The item to append
 * @returns The array with the item appended
 */
export function appendWithoutDuplicates(array, item) {
    const filtered = array.filter((i) => i !== item);
    return [...filtered, item];
}
export async function getCachedWalletConnectResponse() {
    const spendPermissions = store.spendPermissions.get();
    const subAccount = store.subAccounts.get();
    const accounts = store.account.get().accounts;
    if (!accounts) {
        return null;
    }
    const walletConnectAccounts = accounts === null || accounts === void 0 ? void 0 : accounts.map((account) => ({
        address: account,
        capabilities: {
            subAccounts: subAccount ? [subAccount] : undefined,
            spendPermissions: spendPermissions.length > 0 ? { permissions: spendPermissions } : undefined,
        },
    }));
    return {
        accounts: walletConnectAccounts,
    };
}
//# sourceMappingURL=utils.js.map
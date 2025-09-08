import { standardErrors } from '../../../core/error/errors.js';
import { assertPresence } from '../../../util/assertPresence.js';
import { encodeFunctionData, erc20Abi, hexToBigInt, numberToHex, } from 'viem';
import { createSpendPermissionBatchMessage, createSpendPermissionMessage, createWalletSendCallsRequest, isEthSendTransactionParams, isSendCallsParams, parseFundingOptions, presentSubAccountFundingDialog, waitForCallsTransactionHash, } from '../utils.js';
import { abi } from './constants.js';
export async function handleInsufficientBalanceError({ errorData, globalAccountAddress, subAccountAddress, client, request, subAccountRequest, globalAccountRequest, }) {
    var _a;
    const chainId = (_a = client.chain) === null || _a === void 0 ? void 0 : _a.id;
    assertPresence(chainId, standardErrors.rpc.internal(`invalid chainId`));
    // Build spend permission requests for each token and check
    // that each token has global account as sufficient source
    // If not, will throw error
    const spendPermissionRequests = parseFundingOptions({
        errorData,
        sourceAddress: globalAccountAddress,
    });
    // Present options to user via snackbar
    const userChoice = await presentSubAccountFundingDialog();
    if (userChoice === 'cancel') {
        throw new Error('User cancelled funding');
    }
    let signatureRequest;
    // Request 3x the amount per day -- maybe we can do something smarter here
    const defaultPeriod = 60 * 60 * 24;
    const defaultMultiplier = 3;
    if (userChoice === 'update_permission') {
        if (spendPermissionRequests.length === 1) {
            const spendPermission = spendPermissionRequests[0];
            const message = createSpendPermissionMessage({
                spendPermission: {
                    token: spendPermission.token,
                    allowance: numberToHex(spendPermission.requiredAmount * BigInt(defaultMultiplier)),
                    period: defaultPeriod,
                    account: globalAccountAddress,
                    spender: subAccountAddress,
                    start: 0,
                    end: 281474976710655,
                    salt: numberToHex(BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))),
                    extraData: '0x',
                },
                chainId,
            });
            signatureRequest = {
                method: 'eth_signTypedData_v4',
                params: [globalAccountAddress, message],
            };
        }
        else {
            // Batch spend permission request
            const message = createSpendPermissionBatchMessage({
                spendPermissionBatch: {
                    account: globalAccountAddress,
                    period: defaultPeriod,
                    start: 0,
                    end: 281474976710655,
                    permissions: spendPermissionRequests.map((spendPermission) => ({
                        token: spendPermission.token,
                        allowance: numberToHex(spendPermission.requiredAmount * BigInt(defaultMultiplier)),
                        period: defaultPeriod,
                        account: globalAccountAddress,
                        spender: subAccountAddress,
                        salt: '0x0',
                        extraData: '0x',
                    })),
                },
                chainId,
            });
            signatureRequest = {
                method: 'eth_signTypedData_v4',
                params: [globalAccountAddress, message],
            };
        }
        try {
            // Request the signature - will be stored in backend
            await globalAccountRequest(signatureRequest);
        }
        catch (error) {
            console.error(error);
            // If the signature request is denied, we throw the original error
            throw new Error('User denied spend permission request');
        }
        // Retry the original request after updating permissions
        return subAccountRequest(request);
    }
    /* Handle continue_popup path */
    // Construct calls to transfer required tokens to sub account
    const transferCalls = spendPermissionRequests.map((spendPermission) => {
        const isNative = spendPermission.token.toLowerCase() ===
            '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase();
        if (isNative) {
            return {
                to: subAccountAddress,
                value: numberToHex(spendPermission.requiredAmount),
                data: '0x',
            };
        }
        return {
            to: spendPermission.token,
            value: '0x0',
            data: encodeFunctionData({
                abi: erc20Abi,
                functionName: 'transfer',
                args: [subAccountAddress, spendPermission.requiredAmount],
            }),
        };
    });
    // Construct call to execute the original calls using executeBatch
    let originalSendCallsParams;
    if (request.method === 'wallet_sendCalls' && isSendCallsParams(request.params)) {
        originalSendCallsParams = request.params[0];
    }
    else if (request.method === 'eth_sendTransaction' &&
        isEthSendTransactionParams(request.params)) {
        const sendCallsRequest = createWalletSendCallsRequest({
            calls: [request.params[0]],
            chainId,
            from: request.params[0].from,
        });
        originalSendCallsParams = sendCallsRequest.params[0];
    }
    else {
        throw new Error('Could not get original call');
    }
    const subAccountCallData = encodeFunctionData({
        abi,
        functionName: 'executeBatch',
        args: [
            originalSendCallsParams.calls.map((call) => {
                var _a, _b;
                return ({
                    target: call.to,
                    value: hexToBigInt((_a = call.value) !== null && _a !== void 0 ? _a : '0x0'),
                    data: (_b = call.data) !== null && _b !== void 0 ? _b : '0x',
                });
            }),
        ],
    });
    // Send using wallet_sendCalls
    const calls = [
        ...transferCalls,
        { data: subAccountCallData, to: subAccountAddress, value: '0x0' },
    ];
    const result = await globalAccountRequest({
        method: 'wallet_sendCalls',
        params: [Object.assign(Object.assign({}, originalSendCallsParams), { calls, from: globalAccountAddress })],
    });
    if (request.method === 'eth_sendTransaction') {
        return waitForCallsTransactionHash({
            client,
            id: result,
        });
    }
    return result;
}
//# sourceMappingURL=handleInsufficientBalance.js.map
import { isViemError, standardErrors, viemHttpErrorToProviderError } from '../../../core/error/errors.js';
import { ensureHexString } from '../../../core/type/util.js';
import { assertArrayPresence, assertPresence } from '../../../util/assertPresence.js';
import { convertCredentialToJSON } from '../../../util/encoding.js';
import { get } from '../../../util/get.js';
import { hexToString, isHex, numberToHex, } from 'viem';
import { createWalletSendCallsRequest, injectRequestCapabilities, waitForCallsTransactionHash, } from '../utils.js';
import { createSmartAccount } from './createSmartAccount.js';
export async function createSubAccountSigner({ address, client, factory, factoryData, owner, ownerIndex, parentAddress, attribution, }) {
    var _a;
    const subAccount = {
        address,
        factory,
        factoryData,
    };
    const chainId = (_a = client.chain) === null || _a === void 0 ? void 0 : _a.id;
    if (!chainId) {
        throw standardErrors.rpc.internal('chainId not found');
    }
    const account = await createSmartAccount({
        owner,
        ownerIndex: ownerIndex !== null && ownerIndex !== void 0 ? ownerIndex : 1,
        address,
        client,
        factoryData,
    });
    const request = async (args) => {
        var _a, _b, _c, _d, _e, _f;
        try {
            switch (args.method) {
                case 'wallet_addSubAccount':
                    return subAccount;
                case 'eth_accounts':
                    return [subAccount.address];
                case 'eth_coinbase':
                    return subAccount.address;
                case 'net_version':
                    return chainId.toString();
                case 'eth_chainId':
                    return numberToHex(chainId);
                case 'eth_sendTransaction': {
                    assertArrayPresence(args.params);
                    const rawParams = args.params[0];
                    assertPresence(rawParams.to, standardErrors.rpc.invalidParams('to is required'));
                    const params = {
                        to: rawParams.to,
                        data: ensureHexString((_a = rawParams.data) !== null && _a !== void 0 ? _a : '0x', true),
                        value: ensureHexString((_b = rawParams.value) !== null && _b !== void 0 ? _b : '0x', true),
                        from: (_c = rawParams.from) !== null && _c !== void 0 ? _c : subAccount.address,
                    };
                    // Transform into wallet_sendCalls request
                    const sendCallsRequest = createWalletSendCallsRequest({
                        calls: [params],
                        chainId,
                        from: params.from,
                    });
                    const response = (await request(sendCallsRequest));
                    return waitForCallsTransactionHash({
                        client,
                        id: response,
                    });
                }
                case 'wallet_sendCalls': {
                    assertArrayPresence(args.params);
                    // Get the client for the chain
                    const chainId = get(args.params[0], 'chainId');
                    if (!chainId) {
                        throw standardErrors.rpc.invalidParams('chainId is required');
                    }
                    if (!isHex(chainId)) {
                        throw standardErrors.rpc.invalidParams('chainId must be a hex encoded integer');
                    }
                    if (!args.params[0]) {
                        throw standardErrors.rpc.invalidParams('params are required');
                    }
                    if (!('calls' in args.params[0])) {
                        throw standardErrors.rpc.invalidParams('calls are required');
                    }
                    let prepareCallsRequest = {
                        method: 'wallet_prepareCalls',
                        params: [
                            {
                                version: '1.0',
                                calls: args.params[0].calls,
                                chainId: chainId,
                                from: subAccount.address,
                                capabilities: 'capabilities' in args.params[0]
                                    ? args.params[0].capabilities
                                    : {},
                            },
                        ],
                    };
                    if (parentAddress) {
                        prepareCallsRequest = injectRequestCapabilities(prepareCallsRequest, {
                            funding: [
                                {
                                    type: 'spendPermission',
                                    data: {
                                        autoApply: true,
                                        sources: [parentAddress],
                                        preference: 'PREFER_DIRECT_BALANCE',
                                    },
                                },
                            ],
                        });
                    }
                    let prepareCallsResponse = (await request(prepareCallsRequest));
                    const signResponse = await ((_e = (_d = owner).sign) === null || _e === void 0 ? void 0 : _e.call(_d, {
                        // Hash returned from wallet_prepareCalls is double hex encoded
                        hash: hexToString(prepareCallsResponse.signatureRequest.hash),
                    }));
                    let signatureData;
                    if (!signResponse) {
                        throw standardErrors.rpc.internal('signature not found');
                    }
                    if (isHex(signResponse)) {
                        signatureData = {
                            type: 'secp256k1',
                            data: {
                                address: owner.address,
                                signature: signResponse,
                            },
                        };
                    }
                    else {
                        signatureData = {
                            type: 'webauthn',
                            data: {
                                signature: JSON.stringify(convertCredentialToJSON(Object.assign({ id: (_f = owner.id) !== null && _f !== void 0 ? _f : '1' }, signResponse))),
                                publicKey: owner.publicKey,
                            },
                        };
                    }
                    const sendPreparedCallsResponse = (await request({
                        method: 'wallet_sendPreparedCalls',
                        params: [
                            {
                                version: '1.0',
                                type: prepareCallsResponse.type,
                                data: prepareCallsResponse.userOp,
                                chainId: prepareCallsResponse.chainId,
                                signature: signatureData,
                            },
                        ],
                    }));
                    return sendPreparedCallsResponse[0];
                }
                case 'wallet_sendPreparedCalls': {
                    assertArrayPresence(args.params);
                    // Get the client for the chain
                    const chainId = get(args.params[0], 'chainId');
                    if (!chainId) {
                        throw standardErrors.rpc.invalidParams('chainId is required');
                    }
                    if (!isHex(chainId)) {
                        throw standardErrors.rpc.invalidParams('chainId must be a hex encoded integer');
                    }
                    const sendPreparedCallsResponse = await client.request({
                        method: 'wallet_sendPreparedCalls',
                        params: args.params,
                    });
                    return sendPreparedCallsResponse;
                }
                case 'wallet_prepareCalls': {
                    assertArrayPresence(args.params);
                    // Get the client for the chain
                    const chainId = get(args.params[0], 'chainId');
                    if (!chainId) {
                        throw standardErrors.rpc.invalidParams('chainId is required');
                    }
                    if (!isHex(chainId)) {
                        throw standardErrors.rpc.invalidParams('chainId must be a hex encoded integer');
                    }
                    if (!args.params[0]) {
                        throw standardErrors.rpc.invalidParams('params are required');
                    }
                    if (!get(args.params[0], 'calls')) {
                        throw standardErrors.rpc.invalidParams('calls are required');
                    }
                    const prepareCallsParams = args.params[0];
                    if (attribution &&
                        prepareCallsParams.capabilities &&
                        !('attribution' in prepareCallsParams.capabilities)) {
                        prepareCallsParams.capabilities.attribution = attribution;
                    }
                    const prepareCallsResponse = await client.request({
                        method: 'wallet_prepareCalls',
                        params: [Object.assign(Object.assign({}, args.params[0]), { chainId: chainId })],
                    });
                    return prepareCallsResponse;
                }
                case 'personal_sign': {
                    assertArrayPresence(args.params);
                    // Param is expected to be a hex encoded string
                    if (!isHex(args.params[0])) {
                        throw standardErrors.rpc.invalidParams('message must be a hex encoded string');
                    }
                    // signMessage expects the unencoded message
                    const message = hexToString(args.params[0]);
                    return account.signMessage({ message });
                }
                case 'eth_signTypedData_v4': {
                    assertArrayPresence(args.params);
                    const typedData = typeof args.params[1] === 'string' ? JSON.parse(args.params[1]) : args.params[1];
                    return account.signTypedData(typedData);
                }
                case 'eth_signTypedData_v1':
                case 'eth_signTypedData_v3':
                case 'wallet_addEthereumChain':
                case 'wallet_switchEthereumChain':
                default:
                    throw standardErrors.rpc.methodNotSupported();
            }
        }
        catch (error) {
            // Convert error to RPC error if possible
            if (isViemError(error)) {
                const newError = viemHttpErrorToProviderError(error);
                if (newError) {
                    throw newError;
                }
            }
            throw error;
        }
    };
    return { request };
}
//# sourceMappingURL=createSubAccountSigner.js.map
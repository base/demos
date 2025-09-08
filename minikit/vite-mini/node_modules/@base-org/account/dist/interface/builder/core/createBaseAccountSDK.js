import { loadTelemetryScript } from '../../../core/telemetry/initCCA.js';
import { abi } from '../../../sign/base-account/utils/constants.js';
import { store } from '../../../store/store.js';
import { assertPresence } from '../../../util/assertPresence.js';
import { checkCrossOriginOpenerPolicy } from '../../../util/checkCrossOriginOpenerPolicy.js';
import { validatePreferences, validateSubAccount } from '../../../util/validatePreferences.js';
import { decodeAbiParameters, encodeFunctionData, toHex } from 'viem';
import { BaseAccountProvider } from './BaseAccountProvider.js';
import { getInjectedProvider } from './getInjectedProvider.js';
/**
 * Create Base AccountSDK instance with EIP-1193 compliant provider
 * @param params - Options to create a base account SDK instance.
 * @returns An SDK object with a getProvider method that returns an EIP-1193 compliant provider.
 */
export function createBaseAccountSDK(params) {
    var _a, _b, _c, _d;
    const options = {
        metadata: {
            appName: params.appName || 'App',
            appLogoUrl: params.appLogoUrl || '',
            appChainIds: params.appChainIds || [],
        },
        preference: (_a = params.preference) !== null && _a !== void 0 ? _a : {},
        paymasterUrls: params.paymasterUrls,
    };
    //  ====================================================================
    //  If we have a toOwnerAccount function, set it in the non-persisted config
    //  ====================================================================
    if ((_b = params.subAccounts) === null || _b === void 0 ? void 0 : _b.toOwnerAccount) {
        validateSubAccount(params.subAccounts.toOwnerAccount);
    }
    store.subAccountsConfig.set({
        toOwnerAccount: (_c = params.subAccounts) === null || _c === void 0 ? void 0 : _c.toOwnerAccount,
        // @ts-expect-error - enableSubAccounts is not officially supported yet
        enableAutoSubAccounts: (_d = params.subAccounts) === null || _d === void 0 ? void 0 : _d.enableAutoSubAccounts,
    });
    //  ====================================================================
    //  Set the options in the store and rehydrate the store from storage
    //  ====================================================================
    store.config.set(options);
    void store.persist.rehydrate();
    //  ====================================================================
    //  Validation and telemetry
    //  ====================================================================
    void checkCrossOriginOpenerPolicy();
    validatePreferences(options.preference);
    if (options.preference.telemetry !== false) {
        void loadTelemetryScript();
    }
    //  ====================================================================
    //  Return the provider
    //  ====================================================================
    let provider = null;
    const sdk = {
        getProvider: () => {
            var _a;
            if (!provider) {
                provider = (_a = getInjectedProvider()) !== null && _a !== void 0 ? _a : new BaseAccountProvider(options);
            }
            return provider;
        },
        subAccount: {
            async create(accountParam) {
                var _a;
                return (await ((_a = sdk.getProvider()) === null || _a === void 0 ? void 0 : _a.request({
                    method: 'wallet_addSubAccount',
                    params: [
                        {
                            version: '1',
                            account: accountParam,
                        },
                    ],
                })));
            },
            async get() {
                var _a, _b;
                const subAccount = store.subAccounts.get();
                if (subAccount === null || subAccount === void 0 ? void 0 : subAccount.address) {
                    return subAccount;
                }
                const response = (await ((_a = sdk.getProvider()) === null || _a === void 0 ? void 0 : _a.request({
                    method: 'wallet_connect',
                    params: [
                        {
                            version: '1',
                            capabilities: {},
                        },
                    ],
                })));
                const subAccounts = (_b = response.accounts[0].capabilities) === null || _b === void 0 ? void 0 : _b.subAccounts;
                if (!Array.isArray(subAccounts)) {
                    return null;
                }
                return subAccounts[0];
            },
            addOwner: async ({ address, publicKey, chainId, }) => {
                var _a, _b;
                const subAccount = store.subAccounts.get();
                const account = store.account.get();
                assertPresence(account, new Error('account does not exist'));
                assertPresence(subAccount === null || subAccount === void 0 ? void 0 : subAccount.address, new Error('subaccount does not exist'));
                const calls = [];
                if (publicKey) {
                    const [x, y] = decodeAbiParameters([{ type: 'bytes32' }, { type: 'bytes32' }], publicKey);
                    calls.push({
                        to: subAccount.address,
                        data: encodeFunctionData({
                            abi,
                            functionName: 'addOwnerPublicKey',
                            args: [x, y],
                        }),
                        value: toHex(0),
                    });
                }
                if (address) {
                    calls.push({
                        to: subAccount.address,
                        data: encodeFunctionData({
                            abi,
                            functionName: 'addOwnerAddress',
                            args: [address],
                        }),
                        value: toHex(0),
                    });
                }
                return (await ((_a = sdk.getProvider()) === null || _a === void 0 ? void 0 : _a.request({
                    method: 'wallet_sendCalls',
                    params: [
                        {
                            calls,
                            chainId: toHex(chainId),
                            from: (_b = account.accounts) === null || _b === void 0 ? void 0 : _b[0],
                            version: '1',
                        },
                    ],
                })));
            },
            setToOwnerAccount(toSubAccountOwner) {
                validateSubAccount(toSubAccountOwner);
                store.subAccountsConfig.set({
                    toOwnerAccount: toSubAccountOwner,
                });
            },
        },
    };
    return sdk;
}
//# sourceMappingURL=createBaseAccountSDK.js.map
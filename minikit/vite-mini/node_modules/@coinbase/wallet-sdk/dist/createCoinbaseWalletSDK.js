import { decodeAbiParameters, encodeFunctionData, toHex } from 'viem';
import { loadTelemetryScript } from './core/telemetry/initCCA.js';
import { abi } from './sign/scw/utils/constants.js';
import { assertPresence } from './util/assertPresence.js';
import { checkCrossOriginOpenerPolicy } from './util/checkCrossOriginOpenerPolicy.js';
import { validatePreferences, validateSubAccount } from './util/validatePreferences.js';
import { createCoinbaseWalletProvider } from './createCoinbaseWalletProvider.js';
import { store } from './store/store.js';
const DEFAULT_PREFERENCE = {
    options: 'all',
};
/**
 * Create a Coinbase Wallet SDK instance.
 * @param params - Options to create a Coinbase Wallet SDK instance.
 * @returns A Coinbase Wallet SDK object.
 */
export function createCoinbaseWalletSDK(params) {
    var _a, _b, _c, _d;
    const options = {
        metadata: {
            appName: params.appName || 'Dapp',
            appLogoUrl: params.appLogoUrl || '',
            appChainIds: params.appChainIds || [],
        },
        preference: Object.assign(DEFAULT_PREFERENCE, (_a = params.preference) !== null && _a !== void 0 ? _a : {}),
        paymasterUrls: params.paymasterUrls,
    };
    // If we have a toOwnerAccount function, set it in the non-persisted config
    if ((_b = params.subAccounts) === null || _b === void 0 ? void 0 : _b.toOwnerAccount) {
        validateSubAccount(params.subAccounts.toOwnerAccount);
    }
    store.subAccountsConfig.set({
        toOwnerAccount: (_c = params.subAccounts) === null || _c === void 0 ? void 0 : _c.toOwnerAccount,
        // @ts-expect-error - enableSubAccounts is not officially supported yet
        enableAutoSubAccounts: (_d = params.subAccounts) === null || _d === void 0 ? void 0 : _d.enableAutoSubAccounts,
    });
    // set the options in the store
    store.config.set(options);
    // rehydrate the store from storage
    void store.persist.rehydrate();
    // check the cross origin opener policy
    void checkCrossOriginOpenerPolicy();
    // load the telemetry script
    if (options.preference.telemetry !== false) {
        void loadTelemetryScript();
    }
    // Validate user supplied preferences. Throws if key/values are not valid.
    validatePreferences(options.preference);
    let provider = null;
    const sdk = {
        getProvider() {
            if (!provider) {
                provider = createCoinbaseWalletProvider(options);
            }
            // @ts-expect-error - store reference to the sdk on the provider
            provider.sdk = sdk;
            return provider;
        },
        subAccount: {
            async create(account) {
                var _a, _b;
                const state = store.getState();
                assertPresence((_a = state.subAccount) === null || _a === void 0 ? void 0 : _a.address, new Error('subaccount already exists'));
                return (await ((_b = sdk.getProvider()) === null || _b === void 0 ? void 0 : _b.request({
                    method: 'wallet_addSubAccount',
                    params: [
                        {
                            version: '1',
                            account,
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
            async addOwner({ address, publicKey, chainId }) {
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
//# sourceMappingURL=createCoinbaseWalletSDK.js.map
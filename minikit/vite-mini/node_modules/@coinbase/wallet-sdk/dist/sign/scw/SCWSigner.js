import { CB_WALLET_RPC_URL } from '../../core/constants.js';
import { hexToNumber, isAddressEqual, numberToHex } from 'viem';
import { isActionableHttpRequestError, isViemError, standardErrors } from '../../core/error/errors.js';
import { logHandshakeCompleted, logHandshakeError, logHandshakeStarted, logRequestCompleted, logRequestError, logRequestStarted, } from '../../core/telemetry/events/scw-signer.js';
import { logAddOwnerCompleted, logAddOwnerError, logAddOwnerStarted, logInsufficientBalanceErrorHandlingCompleted, logInsufficientBalanceErrorHandlingError, logInsufficientBalanceErrorHandlingStarted, logSubAccountRequestCompleted, logSubAccountRequestError, logSubAccountRequestStarted, } from '../../core/telemetry/events/scw-sub-account.js';
import { parseErrorMessageFromAny } from '../../core/telemetry/utils.js';
import { ensureIntNumber, hexStringFromNumber } from '../../core/type/util.js';
import { createClients, getClient } from '../../store/chain-clients/utils.js';
import { correlationIds } from '../../store/correlation-ids/store.js';
import { store } from '../../store/store.js';
import { assertArrayPresence, assertPresence } from '../../util/assertPresence.js';
import { assertSubAccount } from '../../util/assertSubAccount.js';
import { decryptContent, encryptContent, exportKeyToHexString, importKeyFromHexString, } from '../../util/cipher.js';
import { fetchRPCRequest } from '../../util/provider.js';
import { getCryptoKeyAccount } from '../../kms/crypto-key/index.js';
import { SCWKeyManager } from './SCWKeyManager.js';
import { addSenderToRequest, appendWithoutDuplicates, assertFetchPermissionsRequest, assertGetCapabilitiesParams, assertParamsChainId, fillMissingParamsForFetchPermissions, getCachedWalletConnectResponse, getSenderFromRequest, initSubAccountConfig, injectRequestCapabilities, makeDataSuffix, prependWithoutDuplicates, requestHasCapability, } from './utils.js';
import { createSubAccountSigner } from './utils/createSubAccountSigner.js';
import { findOwnerIndex } from './utils/findOwnerIndex.js';
import { handleAddSubAccountOwner } from './utils/handleAddSubAccountOwner.js';
import { handleInsufficientBalanceError } from './utils/handleInsufficientBalance.js';
export class SCWSigner {
    constructor(params) {
        var _a, _b, _c, _d;
        this.communicator = params.communicator;
        this.callback = params.callback;
        this.keyManager = new SCWKeyManager();
        const { account, chains } = store.getState();
        this.accounts = (_a = account.accounts) !== null && _a !== void 0 ? _a : [];
        this.chain = (_b = account.chain) !== null && _b !== void 0 ? _b : {
            id: (_d = (_c = params.metadata.appChainIds) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : 1,
        };
        if (chains) {
            createClients(chains);
        }
    }
    async handshake(args) {
        var _a, _b, _c;
        const correlationId = correlationIds.get(args);
        logHandshakeStarted({ method: args.method, correlationId });
        try {
            // Open the popup before constructing the request message.
            // This is to ensure that the popup is not blocked by some browsers (i.e. Safari)
            await ((_b = (_a = this.communicator).waitForPopupLoaded) === null || _b === void 0 ? void 0 : _b.call(_a));
            const handshakeMessage = await this.createRequestMessage({
                handshake: {
                    method: args.method,
                    params: (_c = args.params) !== null && _c !== void 0 ? _c : [],
                },
            }, correlationId);
            const response = await this.communicator.postRequestAndWaitForResponse(handshakeMessage);
            // store peer's public key
            if ('failure' in response.content) {
                throw response.content.failure;
            }
            const peerPublicKey = await importKeyFromHexString('public', response.sender);
            await this.keyManager.setPeerPublicKey(peerPublicKey);
            const decrypted = await this.decryptResponseMessage(response);
            this.handleResponse(args, decrypted);
            logHandshakeCompleted({ method: args.method, correlationId });
        }
        catch (error) {
            logHandshakeError({
                method: args.method,
                correlationId,
                errorMessage: parseErrorMessageFromAny(error),
            });
            throw error;
        }
    }
    async request(request) {
        const correlationId = correlationIds.get(request);
        logRequestStarted({ method: request.method, correlationId });
        try {
            const result = await this._request(request);
            logRequestCompleted({ method: request.method, correlationId });
            return result;
        }
        catch (error) {
            logRequestError({
                method: request.method,
                correlationId,
                errorMessage: parseErrorMessageFromAny(error),
            });
            throw error;
        }
    }
    async _request(request) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (this.accounts.length === 0) {
            switch (request.method) {
                case 'eth_requestAccounts': {
                    // Wait for the popup to be loaded before making async calls
                    await ((_b = (_a = this.communicator).waitForPopupLoaded) === null || _b === void 0 ? void 0 : _b.call(_a));
                    await initSubAccountConfig();
                    // This will populate the store with the sub account
                    await this.request({
                        method: 'wallet_connect',
                        params: [
                            {
                                version: '1',
                                capabilities: Object.assign({}, ((_d = (_c = store.subAccountsConfig.get()) === null || _c === void 0 ? void 0 : _c.capabilities) !== null && _d !== void 0 ? _d : {})),
                            },
                        ],
                    });
                    return this.accounts;
                }
                case 'wallet_switchEthereumChain': {
                    assertParamsChainId(request.params);
                    this.chain.id = Number(request.params[0].chainId);
                    return;
                }
                case 'wallet_connect': {
                    // Wait for the popup to be loaded before making async calls
                    await ((_f = (_e = this.communicator).waitForPopupLoaded) === null || _f === void 0 ? void 0 : _f.call(_e));
                    await initSubAccountConfig();
                    // Check if addSubAccount capability is present and if so, inject the the sub account capabilities
                    let capabilitiesToInject = {};
                    if (requestHasCapability(request, 'addSubAccount')) {
                        capabilitiesToInject = (_h = (_g = store.subAccountsConfig.get()) === null || _g === void 0 ? void 0 : _g.capabilities) !== null && _h !== void 0 ? _h : {};
                    }
                    const modifiedRequest = injectRequestCapabilities(request, capabilitiesToInject);
                    return this.sendRequestToPopup(modifiedRequest);
                }
                case 'wallet_sendCalls':
                case 'wallet_sign': {
                    return this.sendRequestToPopup(request);
                }
                default:
                    throw standardErrors.provider.unauthorized();
            }
        }
        if (this.shouldRequestUseSubAccountSigner(request)) {
            const correlationId = correlationIds.get(request);
            logSubAccountRequestStarted({ method: request.method, correlationId });
            try {
                const result = await this.sendRequestToSubAccountSigner(request);
                logSubAccountRequestCompleted({ method: request.method, correlationId });
                return result;
            }
            catch (error) {
                logSubAccountRequestError({
                    method: request.method,
                    correlationId,
                    errorMessage: parseErrorMessageFromAny(error),
                });
                throw error;
            }
        }
        switch (request.method) {
            case 'eth_requestAccounts':
            case 'eth_accounts': {
                const subAccount = store.subAccounts.get();
                const subAccountsConfig = store.subAccountsConfig.get();
                if (subAccount === null || subAccount === void 0 ? void 0 : subAccount.address) {
                    // if auto sub accounts are enabled and we have a sub account, we need to return it as a top level account
                    // otherwise, we just append it to the accounts array
                    this.accounts = (subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.enableAutoSubAccounts)
                        ? prependWithoutDuplicates(this.accounts, subAccount.address)
                        : appendWithoutDuplicates(this.accounts, subAccount.address);
                }
                (_j = this.callback) === null || _j === void 0 ? void 0 : _j.call(this, 'connect', { chainId: numberToHex(this.chain.id) });
                return this.accounts;
            }
            case 'eth_coinbase':
                return this.accounts[0];
            case 'net_version':
                return this.chain.id;
            case 'eth_chainId':
                return numberToHex(this.chain.id);
            case 'wallet_getCapabilities':
                return this.handleGetCapabilitiesRequest(request);
            case 'wallet_switchEthereumChain':
                return this.handleSwitchChainRequest(request);
            case 'eth_ecRecover':
            case 'personal_sign':
            case 'wallet_sign':
            case 'personal_ecRecover':
            case 'eth_signTransaction':
            case 'eth_sendTransaction':
            case 'eth_signTypedData_v1':
            case 'eth_signTypedData_v3':
            case 'eth_signTypedData_v4':
            case 'eth_signTypedData':
            case 'wallet_addEthereumChain':
            case 'wallet_watchAsset':
            case 'wallet_sendCalls':
            case 'wallet_showCallsStatus':
            case 'wallet_grantPermissions':
                return this.sendRequestToPopup(request);
            case 'wallet_connect': {
                // Return cached wallet connect response if available
                const cachedResponse = await getCachedWalletConnectResponse();
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Wait for the popup to be loaded before making async calls
                await ((_l = (_k = this.communicator).waitForPopupLoaded) === null || _l === void 0 ? void 0 : _l.call(_k));
                await initSubAccountConfig();
                const subAccountsConfig = store.subAccountsConfig.get();
                const modifiedRequest = injectRequestCapabilities(request, (_m = subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.capabilities) !== null && _m !== void 0 ? _m : {});
                (_o = this.callback) === null || _o === void 0 ? void 0 : _o.call(this, 'connect', { chainId: numberToHex(this.chain.id) });
                return this.sendRequestToPopup(modifiedRequest);
            }
            // Sub Account Support
            case 'wallet_getSubAccounts': {
                const subAccount = store.subAccounts.get();
                if (subAccount === null || subAccount === void 0 ? void 0 : subAccount.address) {
                    return {
                        subAccounts: [subAccount],
                    };
                }
                if (!this.chain.rpcUrl) {
                    throw standardErrors.rpc.internal('No RPC URL set for chain');
                }
                const response = (await fetchRPCRequest(request, this.chain.rpcUrl));
                assertArrayPresence(response.subAccounts, 'subAccounts');
                if (response.subAccounts.length > 0) {
                    // cache the sub account
                    assertSubAccount(response.subAccounts[0]);
                    const subAccount = response.subAccounts[0];
                    store.subAccounts.set({
                        address: subAccount.address,
                        factory: subAccount.factory,
                        factoryData: subAccount.factoryData,
                    });
                }
                return response;
            }
            case 'wallet_addSubAccount':
                return this.addSubAccount(request);
            case 'coinbase_fetchPermissions': {
                assertFetchPermissionsRequest(request);
                const completeRequest = fillMissingParamsForFetchPermissions(request);
                const permissions = (await fetchRPCRequest(completeRequest, CB_WALLET_RPC_URL));
                const requestedChainId = hexToNumber((_p = completeRequest.params) === null || _p === void 0 ? void 0 : _p[0].chainId);
                store.spendPermissions.set(permissions.permissions.map((permission) => (Object.assign(Object.assign({}, permission), { chainId: requestedChainId }))));
                return permissions;
            }
            default:
                if (!this.chain.rpcUrl) {
                    throw standardErrors.rpc.internal('No RPC URL set for chain');
                }
                return fetchRPCRequest(request, this.chain.rpcUrl);
        }
    }
    async sendRequestToPopup(request) {
        var _a, _b;
        // Open the popup before constructing the request message.
        // This is to ensure that the popup is not blocked by some browsers (i.e. Safari)
        await ((_b = (_a = this.communicator).waitForPopupLoaded) === null || _b === void 0 ? void 0 : _b.call(_a));
        const response = await this.sendEncryptedRequest(request);
        const decrypted = await this.decryptResponseMessage(response);
        return this.handleResponse(request, decrypted);
    }
    async handleResponse(request, decrypted) {
        var _a, _b, _c, _d, _e;
        const result = decrypted.result;
        if ('error' in result)
            throw result.error;
        switch (request.method) {
            case 'eth_requestAccounts': {
                const accounts = result.value;
                this.accounts = accounts;
                store.account.set({
                    accounts,
                    chain: this.chain,
                });
                (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, 'accountsChanged', accounts);
                break;
            }
            case 'wallet_connect': {
                const response = result.value;
                const accounts = response.accounts.map((account) => account.address);
                this.accounts = accounts;
                store.account.set({
                    accounts,
                });
                const account = response.accounts.at(0);
                const capabilities = account === null || account === void 0 ? void 0 : account.capabilities;
                if (capabilities === null || capabilities === void 0 ? void 0 : capabilities.subAccounts) {
                    const capabilityResponse = capabilities === null || capabilities === void 0 ? void 0 : capabilities.subAccounts;
                    assertArrayPresence(capabilityResponse, 'subAccounts');
                    assertSubAccount(capabilityResponse[0]);
                    store.subAccounts.set({
                        address: capabilityResponse[0].address,
                        factory: capabilityResponse[0].factory,
                        factoryData: capabilityResponse[0].factoryData,
                    });
                }
                let accounts_ = [this.accounts[0]];
                const subAccount = store.subAccounts.get();
                const subAccountsConfig = store.subAccountsConfig.get();
                if (subAccount === null || subAccount === void 0 ? void 0 : subAccount.address) {
                    // Sub account should be returned as a top level account if auto sub accounts are enabled
                    this.accounts = (subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.enableAutoSubAccounts)
                        ? prependWithoutDuplicates(this.accounts, subAccount.address)
                        : appendWithoutDuplicates(this.accounts, subAccount.address);
                }
                const spendPermissions = (_c = (_b = response === null || response === void 0 ? void 0 : response.accounts) === null || _b === void 0 ? void 0 : _b[0].capabilities) === null || _c === void 0 ? void 0 : _c.spendPermissions;
                if (spendPermissions && 'permissions' in spendPermissions) {
                    store.spendPermissions.set(spendPermissions === null || spendPermissions === void 0 ? void 0 : spendPermissions.permissions);
                }
                (_d = this.callback) === null || _d === void 0 ? void 0 : _d.call(this, 'accountsChanged', accounts_);
                break;
            }
            case 'wallet_addSubAccount': {
                assertSubAccount(result.value);
                const subAccount = result.value;
                store.subAccounts.set(subAccount);
                const subAccountsConfig = store.subAccountsConfig.get();
                this.accounts = (subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.enableAutoSubAccounts)
                    ? prependWithoutDuplicates(this.accounts, subAccount.address)
                    : appendWithoutDuplicates(this.accounts, subAccount.address);
                (_e = this.callback) === null || _e === void 0 ? void 0 : _e.call(this, 'accountsChanged', this.accounts);
                break;
            }
            default:
                break;
        }
        return result.value;
    }
    async cleanup() {
        var _a, _b;
        const metadata = store.config.get().metadata;
        await this.keyManager.clear();
        // clear the store
        store.account.clear();
        store.subAccounts.clear();
        store.spendPermissions.clear();
        store.chains.clear();
        // reset the signer
        this.accounts = [];
        this.chain = {
            id: (_b = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.appChainIds) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 1,
        };
    }
    /**
     * @returns `null` if the request was successful.
     * https://eips.ethereum.org/EIPS/eip-3326#wallet_switchethereumchain
     */
    async handleSwitchChainRequest(request) {
        assertParamsChainId(request.params);
        const chainId = ensureIntNumber(request.params[0].chainId);
        const localResult = this.updateChain(chainId);
        if (localResult)
            return null;
        const popupResult = await this.sendRequestToPopup(request);
        if (popupResult === null) {
            this.updateChain(chainId);
        }
        return popupResult;
    }
    async handleGetCapabilitiesRequest(request) {
        assertGetCapabilitiesParams(request.params);
        const requestedAccount = request.params[0];
        const filterChainIds = request.params[1]; // Optional second parameter
        if (!this.accounts.some((account) => isAddressEqual(account, requestedAccount))) {
            throw standardErrors.provider.unauthorized('no active account found when getting capabilities');
        }
        const capabilities = store.getState().account.capabilities;
        // Return empty object if capabilities is undefined
        if (!capabilities) {
            return {};
        }
        // If no filter is provided, return all capabilities
        if (!filterChainIds || filterChainIds.length === 0) {
            return capabilities;
        }
        // Convert filter chain IDs to numbers once for efficient lookup
        const filterChainNumbers = new Set(filterChainIds.map((chainId) => hexToNumber(chainId)));
        // Filter capabilities
        const filteredCapabilities = Object.fromEntries(Object.entries(capabilities).filter(([capabilityKey]) => {
            try {
                const capabilityChainNumber = hexToNumber(capabilityKey);
                return filterChainNumbers.has(capabilityChainNumber);
            }
            catch (_a) {
                // If capabilityKey is not a valid hex string, exclude it
                return false;
            }
        }));
        return filteredCapabilities;
    }
    async sendEncryptedRequest(request) {
        const sharedSecret = await this.keyManager.getSharedSecret();
        if (!sharedSecret) {
            throw standardErrors.provider.unauthorized('No shared secret found when encrypting request');
        }
        const encrypted = await encryptContent({
            action: request,
            chainId: this.chain.id,
        }, sharedSecret);
        const correlationId = correlationIds.get(request);
        const message = await this.createRequestMessage({ encrypted }, correlationId);
        return this.communicator.postRequestAndWaitForResponse(message);
    }
    async createRequestMessage(content, correlationId) {
        const publicKey = await exportKeyToHexString('public', await this.keyManager.getOwnPublicKey());
        return {
            id: crypto.randomUUID(),
            correlationId,
            sender: publicKey,
            content,
            timestamp: new Date(),
        };
    }
    async decryptResponseMessage(message) {
        var _a, _b, _c;
        const content = message.content;
        // throw protocol level error
        if ('failure' in content) {
            throw content.failure;
        }
        const sharedSecret = await this.keyManager.getSharedSecret();
        if (!sharedSecret) {
            throw standardErrors.provider.unauthorized('Invalid session: no shared secret found when decrypting response');
        }
        const response = await decryptContent(content.encrypted, sharedSecret);
        const availableChains = (_a = response.data) === null || _a === void 0 ? void 0 : _a.chains;
        if (availableChains) {
            const nativeCurrencies = (_b = response.data) === null || _b === void 0 ? void 0 : _b.nativeCurrencies;
            const chains = Object.entries(availableChains).map(([id, rpcUrl]) => {
                const nativeCurrency = nativeCurrencies === null || nativeCurrencies === void 0 ? void 0 : nativeCurrencies[Number(id)];
                return Object.assign({ id: Number(id), rpcUrl }, (nativeCurrency ? { nativeCurrency } : {}));
            });
            store.chains.set(chains);
            this.updateChain(this.chain.id, chains);
            createClients(chains);
        }
        const walletCapabilities = (_c = response.data) === null || _c === void 0 ? void 0 : _c.capabilities;
        if (walletCapabilities) {
            store.account.set({
                capabilities: walletCapabilities,
            });
        }
        return response;
    }
    updateChain(chainId, newAvailableChains) {
        var _a;
        const state = store.getState();
        const chains = newAvailableChains !== null && newAvailableChains !== void 0 ? newAvailableChains : state.chains;
        const chain = chains === null || chains === void 0 ? void 0 : chains.find((chain) => chain.id === chainId);
        if (!chain)
            return false;
        if (chain !== this.chain) {
            this.chain = chain;
            store.account.set({
                chain,
            });
            (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, 'chainChanged', hexStringFromNumber(chain.id));
        }
        return true;
    }
    async addSubAccount(request) {
        var _a, _b, _c, _d;
        const state = store.getState();
        const subAccount = state.subAccount;
        const subAccountsConfig = store.subAccountsConfig.get();
        if (subAccount === null || subAccount === void 0 ? void 0 : subAccount.address) {
            this.accounts = (subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.enableAutoSubAccounts)
                ? prependWithoutDuplicates(this.accounts, subAccount.address)
                : appendWithoutDuplicates(this.accounts, subAccount.address);
            (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, 'accountsChanged', this.accounts);
            return subAccount;
        }
        // Wait for the popup to be loaded before sending the request
        await ((_c = (_b = this.communicator).waitForPopupLoaded) === null || _c === void 0 ? void 0 : _c.call(_b));
        if (Array.isArray(request.params) &&
            request.params.length > 0 &&
            request.params[0].account &&
            request.params[0].account.type === 'create') {
            let keys;
            if (request.params[0].account.keys && request.params[0].account.keys.length > 0) {
                keys = request.params[0].account.keys;
            }
            else {
                const config = (_d = store.subAccountsConfig.get()) !== null && _d !== void 0 ? _d : {};
                const { account: ownerAccount } = config.toOwnerAccount
                    ? await config.toOwnerAccount()
                    : await getCryptoKeyAccount();
                if (!ownerAccount) {
                    throw standardErrors.provider.unauthorized('could not get subaccount owner account when adding sub account');
                }
                keys = [
                    {
                        type: ownerAccount.address ? 'address' : 'webauthn-p256',
                        publicKey: ownerAccount.address || ownerAccount.publicKey,
                    },
                ];
            }
            request.params[0].account.keys = keys;
        }
        const response = await this.sendRequestToPopup(request);
        assertSubAccount(response);
        return response;
    }
    shouldRequestUseSubAccountSigner(request) {
        const sender = getSenderFromRequest(request);
        const subAccount = store.subAccounts.get();
        if (sender) {
            return sender.toLowerCase() === (subAccount === null || subAccount === void 0 ? void 0 : subAccount.address.toLowerCase());
        }
        return false;
    }
    async sendRequestToSubAccountSigner(request) {
        var _a;
        const subAccount = store.subAccounts.get();
        const subAccountsConfig = store.subAccountsConfig.get();
        const config = store.config.get();
        assertPresence(subAccount === null || subAccount === void 0 ? void 0 : subAccount.address, standardErrors.provider.unauthorized('no active sub account when sending request to sub account signer'));
        // Get the owner account from the config
        const ownerAccount = (subAccountsConfig === null || subAccountsConfig === void 0 ? void 0 : subAccountsConfig.toOwnerAccount)
            ? await subAccountsConfig.toOwnerAccount()
            : await getCryptoKeyAccount();
        assertPresence(ownerAccount === null || ownerAccount === void 0 ? void 0 : ownerAccount.account, standardErrors.provider.unauthorized('no active sub account owner when sending request to sub account signer'));
        const sender = getSenderFromRequest(request);
        // if sender is undefined, we inject the active sub account
        // address into the params for the supported request methods
        if (sender === undefined) {
            request = addSenderToRequest(request, subAccount.address);
        }
        const client = getClient(this.chain.id);
        assertPresence(client, standardErrors.rpc.internal(`client not found for chainId ${this.chain.id} when sending request to sub account signer`));
        const globalAccountAddress = this.accounts.find((account) => account.toLowerCase() !== subAccount.address.toLowerCase());
        assertPresence(globalAccountAddress, standardErrors.provider.unauthorized('no global account found when sending request to sub account signer'));
        const dataSuffix = makeDataSuffix({
            attribution: (_a = config.preference) === null || _a === void 0 ? void 0 : _a.attribution,
            dappOrigin: window.location.origin,
        });
        const publicKey = ownerAccount.account.type === 'local'
            ? ownerAccount.account.address
            : ownerAccount.account.publicKey;
        let ownerIndex = await findOwnerIndex({
            address: subAccount.address,
            factory: subAccount.factory,
            factoryData: subAccount.factoryData,
            publicKey,
            client,
        });
        if (ownerIndex === -1) {
            const correlationId = correlationIds.get(request);
            logAddOwnerStarted({ method: request.method, correlationId });
            try {
                ownerIndex = await handleAddSubAccountOwner({
                    ownerAccount: ownerAccount.account,
                    globalAccountRequest: this.sendRequestToPopup.bind(this),
                });
                logAddOwnerCompleted({ method: request.method, correlationId });
            }
            catch (error) {
                logAddOwnerError({
                    method: request.method,
                    correlationId,
                    errorMessage: parseErrorMessageFromAny(error),
                });
                return standardErrors.provider.unauthorized('failed to add sub account owner when sending request to sub account signer');
            }
        }
        const { request: subAccountRequest } = await createSubAccountSigner({
            address: subAccount.address,
            owner: ownerAccount.account,
            client: client,
            factory: subAccount.factory,
            factoryData: subAccount.factoryData,
            parentAddress: globalAccountAddress,
            attribution: dataSuffix ? { suffix: dataSuffix } : undefined,
            ownerIndex,
        });
        try {
            const result = await subAccountRequest(request);
            return result;
        }
        catch (error) {
            let errorObject;
            if (isViemError(error)) {
                errorObject = JSON.parse(error.details);
            }
            else if (isActionableHttpRequestError(error)) {
                errorObject = error;
            }
            else {
                throw error;
            }
            if (!(isActionableHttpRequestError(errorObject) && errorObject.data)) {
                throw error;
            }
            if (!errorObject.data) {
                throw error;
            }
            const correlationId = correlationIds.get(request);
            logInsufficientBalanceErrorHandlingStarted({ method: request.method, correlationId });
            try {
                const result = await handleInsufficientBalanceError({
                    errorData: errorObject.data,
                    globalAccountAddress,
                    subAccountAddress: subAccount.address,
                    client,
                    request,
                    subAccountRequest,
                    globalAccountRequest: this.request.bind(this),
                });
                logInsufficientBalanceErrorHandlingCompleted({ method: request.method, correlationId });
                return result;
            }
            catch (handlingError) {
                console.error(handlingError);
                logInsufficientBalanceErrorHandlingError({
                    method: request.method,
                    correlationId,
                    errorMessage: parseErrorMessageFromAny(handlingError),
                });
                throw error;
            }
        }
    }
}
//# sourceMappingURL=SCWSigner.js.map
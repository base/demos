"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBaseUrl = void 0;
exports.relayTransaction = relayTransaction;
exports.getRelayCount = getRelayCount;
exports.getSafeInfo = getSafeInfo;
exports.getIncomingTransfers = getIncomingTransfers;
exports.getModuleTransactions = getModuleTransactions;
exports.getMultisigTransactions = getMultisigTransactions;
exports.getBalances = getBalances;
exports.getFiatCurrencies = getFiatCurrencies;
exports.getOwnedSafes = getOwnedSafes;
exports.getAllOwnedSafes = getAllOwnedSafes;
exports.getCollectibles = getCollectibles;
exports.getCollectiblesPage = getCollectiblesPage;
exports.getTransactionHistory = getTransactionHistory;
exports.getTransactionQueue = getTransactionQueue;
exports.getTransactionDetails = getTransactionDetails;
exports.deleteTransaction = deleteTransaction;
exports.postSafeGasEstimation = postSafeGasEstimation;
exports.getNonces = getNonces;
exports.proposeTransaction = proposeTransaction;
exports.getConfirmationView = getConfirmationView;
exports.getTxPreview = getTxPreview;
exports.getChainsConfig = getChainsConfig;
exports.getChainConfig = getChainConfig;
exports.getSafeApps = getSafeApps;
exports.getMasterCopies = getMasterCopies;
exports.getDecodedData = getDecodedData;
exports.getSafeMessages = getSafeMessages;
exports.getSafeMessage = getSafeMessage;
exports.proposeSafeMessage = proposeSafeMessage;
exports.confirmSafeMessage = confirmSafeMessage;
exports.getDelegates = getDelegates;
exports.registerDevice = registerDevice;
exports.unregisterSafe = unregisterSafe;
exports.unregisterDevice = unregisterDevice;
exports.registerEmail = registerEmail;
exports.changeEmail = changeEmail;
exports.resendEmailVerificationCode = resendEmailVerificationCode;
exports.verifyEmail = verifyEmail;
exports.getRegisteredEmail = getRegisteredEmail;
exports.deleteRegisteredEmail = deleteRegisteredEmail;
exports.registerRecoveryModule = registerRecoveryModule;
exports.unsubscribeSingle = unsubscribeSingle;
exports.unsubscribeAll = unsubscribeAll;
exports.getSafeOverviews = getSafeOverviews;
exports.getContract = getContract;
exports.getAuthNonce = getAuthNonce;
exports.verifyAuth = verifyAuth;
exports.createAccount = createAccount;
exports.getAccount = getAccount;
exports.deleteAccount = deleteAccount;
exports.getAccountDataTypes = getAccountDataTypes;
exports.getAccountDataSettings = getAccountDataSettings;
exports.putAccountDataSettings = putAccountDataSettings;
exports.getIndexingStatus = getIndexingStatus;
const endpoint_1 = require("./endpoint");
const config_1 = require("./config");
__exportStar(require("./types/safe-info"), exports);
__exportStar(require("./types/safe-apps"), exports);
__exportStar(require("./types/transactions"), exports);
__exportStar(require("./types/chains"), exports);
__exportStar(require("./types/common"), exports);
__exportStar(require("./types/master-copies"), exports);
__exportStar(require("./types/decoded-data"), exports);
__exportStar(require("./types/safe-messages"), exports);
__exportStar(require("./types/notifications"), exports);
__exportStar(require("./types/relay"), exports);
// Can be set externally to a different CGW host
let baseUrl = config_1.DEFAULT_BASE_URL;
/**
 * Set the base CGW URL
 */
const setBaseUrl = (url) => {
    baseUrl = url;
};
exports.setBaseUrl = setBaseUrl;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Relay a transaction from a Safe
 */
function relayTransaction(chainId, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/relay', { path: { chainId }, body });
}
/**
 * Get the relay limit and number of remaining relays remaining
 */
function getRelayCount(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/relay/{address}', { path: { chainId, address } });
}
/**
 * Get basic information about a Safe. E.g. owners, modules, version etc
 */
function getSafeInfo(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}', { path: { chainId, address } });
}
/**
 * Get filterable list of incoming transactions
 */
function getIncomingTransfers(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/incoming-transfers/', {
        path: { chainId, address },
        query,
    }, pageUrl);
}
/**
 * Get filterable list of module transactions
 */
function getModuleTransactions(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/module-transactions/', {
        path: { chainId, address },
        query,
    }, pageUrl);
}
/**
 * Get filterable list of multisig transactions
 */
function getMultisigTransactions(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/multisig-transactions/', {
        path: { chainId, address },
        query,
    }, pageUrl);
}
/**
 * Get the total balance and all assets stored in a Safe
 */
function getBalances(chainId, address, currency = 'usd', query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId, address, currency },
        query,
    });
}
/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
function getFiatCurrencies() {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/balances/supported-fiat-codes');
}
/**
 * Get the addresses of all Safes belonging to an owner
 */
function getOwnedSafes(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/owners/{address}/safes', { path: { chainId, address } });
}
/**
 * Get the addresses of all Safes belonging to an owner on all chains
 */
function getAllOwnedSafes(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/owners/{address}/safes', { path: { address } });
}
/**
 * Get NFTs stored in a Safe
 */
function getCollectibles(chainId, address, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/collectibles', {
        path: { chainId, address },
        query,
    });
}
/**
 * Get NFTs stored in a Safe
 */
function getCollectiblesPage(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v2/chains/{chainId}/safes/{address}/collectibles', { path: { chainId, address }, query }, pageUrl);
}
/**
 * Get a list of past Safe transactions
 */
function getTransactionHistory(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/transactions/history', { path: { chainId, safe_address: address }, query }, pageUrl);
}
/**
 * Get the list of pending transactions
 */
function getTransactionQueue(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/transactions/queued', { path: { chainId, safe_address: address }, query }, pageUrl);
}
/**
 * Get the details of an individual transaction by its id
 */
function getTransactionDetails(chainId, transactionId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/transactions/{transactionId}', {
        path: { chainId, transactionId },
    });
}
/**
 * Delete a transaction by its safeTxHash
 */
function deleteTransaction(chainId, safeTxHash, signature) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/transactions/{safeTxHash}', {
        path: { chainId, safeTxHash },
        body: { signature },
    });
}
/**
 * Request a gas estimate & recommmended tx nonce for a created transaction
 */
function postSafeGasEstimation(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations', {
        path: { chainId, safe_address: address },
        body,
    });
}
function getNonces(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/nonces', {
        path: { chainId, safe_address: address },
    });
}
/**
 * Propose a new transaction for other owners to sign/execute
 */
function proposeTransaction(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/transactions/{safe_address}/propose', {
        path: { chainId, safe_address: address },
        body,
    });
}
/**
 * Returns decoded data
 */
function getConfirmationView(chainId, safeAddress, operation, data, to, value) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation', {
        path: { chainId, safe_address: safeAddress },
        body: { operation, data, to, value },
    });
}
/**
 * Get a tx preview
 */
function getTxPreview(chainId, safeAddress, operation, data, to, value) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/transactions/{safe_address}/preview', {
        path: { chainId, safe_address: safeAddress },
        body: { operation, data, to, value },
    });
}
/**
 * Returns all defined chain configs
 */
function getChainsConfig(query) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains', {
        query,
    });
}
/**
 * Returns a chain config
 */
function getChainConfig(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}', {
        path: { chainId: chainId },
    });
}
/**
 * Returns Safe Apps List
 */
function getSafeApps(chainId, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safe-apps', {
        path: { chainId: chainId },
        query,
    });
}
/**
 * Returns list of Master Copies
 */
function getMasterCopies(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/about/master-copies', {
        path: { chainId: chainId },
    });
}
/**
 * Returns decoded data
 */
function getDecodedData(chainId, operation, encodedData, to) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/data-decoder', {
        path: { chainId: chainId },
        body: { operation, data: encodedData, to },
    });
}
/**
 * Returns list of `SafeMessage`s
 */
function getSafeMessages(chainId, address, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/messages', { path: { chainId, safe_address: address }, query: {} }, pageUrl);
}
/**
 * Returns a `SafeMessage`
 */
function getSafeMessage(chainId, messageHash) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/messages/{message_hash}', {
        path: { chainId, message_hash: messageHash },
    });
}
/**
 * Propose a new `SafeMessage` for other owners to sign
 */
function proposeSafeMessage(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/messages', {
        path: { chainId, safe_address: address },
        body,
    });
}
/**
 * Add a confirmation to a `SafeMessage`
 */
function confirmSafeMessage(chainId, messageHash, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/messages/{message_hash}/signatures', {
        path: { chainId, message_hash: messageHash },
        body,
    });
}
/**
 * Returns a list of delegates
 */
function getDelegates(chainId, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v2/chains/{chainId}/delegates', {
        path: { chainId },
        query,
    });
}
/**
 * Registers a device/Safe for notifications
 */
function registerDevice(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/register/notifications', {
        body,
    });
}
/**
 * Unregisters a Safe from notifications
 */
function unregisterSafe(chainId, address, uuid) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}', {
        path: { chainId, safe_address: address, uuid },
    });
}
/**
 * Unregisters a device from notifications
 */
function unregisterDevice(chainId, uuid) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/notifications/devices/{uuid}', {
        path: { chainId, uuid },
    });
}
/**
 * Registers a email address for a safe signer.
 *
 * The signer wallet has to sign a message of format: `email-register-{chainId}-{safeAddress}-{emailAddress}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param body Signer address and email address
 * @param headers Signature and Signature timestamp
 * @returns 200 if signature matches the data
 */
function registerEmail(chainId, safeAddress, body, headers) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails', {
        path: { chainId, safe_address: safeAddress },
        body,
        headers,
    });
}
/**
 * Changes an already registered email address for a safe signer. The new email address still needs to be verified.
 *
 * The signer wallet has to sign a message of format: `email-edit-{chainId}-{safeAddress}-{emailAddress}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress
 * @param body New email address
 * @param headers Signature and Signature timestamp
 * @returns 202 if signature matches the data
 */
function changeEmail(chainId, safeAddress, signerAddress, body, headers) {
    return (0, endpoint_1.putEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body,
        headers,
    });
}
/**
 * Resends an email verification code.
 */
function resendEmailVerificationCode(chainId, safeAddress, signerAddress) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body: '',
    });
}
/**
 * Verifies a pending email address registration.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress address who signed the email registration
 * @param body Verification code
 */
function verifyEmail(chainId, safeAddress, signerAddress, body) {
    return (0, endpoint_1.putEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body,
    });
}
/**
 * Gets the registered email address of the signer
 *
 * The signer wallet will have to sign a message of format: `email-retrieval-{chainId}-{safe}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress address of the owner of the Safe
 *
 * @returns email address and verified flag
 */
function getRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers,
    });
}
/**
 * Delete a registered email address for the signer
 *
 * The signer wallet will have to sign a message of format: `email-delete-{chainId}-{safe}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress
 * @param headers
 */
function deleteRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers,
    });
}
/**
 * Register a recovery module for receiving alerts
 * @param chainId
 * @param safeAddress
 * @param body - { moduleAddress: string }
 */
function registerRecoveryModule(chainId, safeAddress, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/recovery', {
        path: { chainId, safe_address: safeAddress },
        body,
    });
}
/**
 * Delete email subscription for a single category
 * @param query
 */
function unsubscribeSingle(query) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/subscriptions', { query });
}
/**
 * Delete email subscription for all categories
 * @param query
 */
function unsubscribeAll(query) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/subscriptions/all', { query });
}
/**
 * Get Safe overviews per address
 */
function getSafeOverviews(safes, query) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/safes', {
        query: Object.assign(Object.assign({}, query), { safes: safes.join(',') }),
    });
}
function getContract(chainId, contractAddress) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/contracts/{contractAddress}', {
        path: {
            chainId: chainId,
            contractAddress: contractAddress,
        },
    });
}
function getAuthNonce() {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/auth/nonce', { credentials: 'include' });
}
function verifyAuth(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/auth/verify', {
        body,
        credentials: 'include',
    });
}
function createAccount(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/accounts', {
        body,
        credentials: 'include',
    });
}
function getAccount(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/accounts/{address}', {
        path: { address },
        credentials: 'include',
    });
}
function deleteAccount(address) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/accounts/{address}', {
        path: { address },
        credentials: 'include',
    });
}
function getAccountDataTypes() {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/accounts/data-types');
}
function getAccountDataSettings(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/accounts/{address}/data-settings', {
        path: { address },
        credentials: 'include',
    });
}
function putAccountDataSettings(address, body) {
    return (0, endpoint_1.putEndpoint)(baseUrl, '/v1/accounts/{address}/data-settings', {
        path: { address },
        body,
        credentials: 'include',
    });
}
function getIndexingStatus(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/about/indexing', {
        path: { chainId },
    });
}
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
//# sourceMappingURL=index.js.map
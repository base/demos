import type { operations } from './types/api';
import type { SafeTransactionEstimation, TransactionDetails, TransactionListPage, SafeIncomingTransfersResponse, SafeModuleTransactionsResponse, SafeMultisigTransactionsResponse, NoncesResponse, TransactionPreview } from './types/transactions';
import type { EthereumAddress, AllOwnedSafes, FiatCurrencies, OwnedSafes, SafeBalanceResponse, SafeCollectibleResponse, SafeCollectiblesPage } from './types/common';
import type { SafeInfo, SafeOverview } from './types/safe-info';
import type { ChainListResponse, ChainInfo } from './types/chains';
import type { SafeAppsResponse } from './types/safe-apps';
import type { MasterCopyReponse } from './types/master-copies';
import type { AnyConfirmationView, DecodedDataResponse } from './types/decoded-data';
import type { SafeMessage, SafeMessageListPage } from './types/safe-messages';
import type { DelegateResponse, DelegatesRequest } from './types/delegates';
import type { GetEmailResponse } from './types/emails';
import type { RelayCountResponse, RelayTransactionResponse } from './types/relay';
import type { Contract } from './types/contracts';
import type { AuthNonce } from './types/auth';
export * from './types/safe-info';
export * from './types/safe-apps';
export * from './types/transactions';
export * from './types/chains';
export * from './types/common';
export * from './types/master-copies';
export * from './types/decoded-data';
export * from './types/safe-messages';
export * from './types/notifications';
export * from './types/relay';
/**
 * Set the base CGW URL
 */
export declare const setBaseUrl: (url: string) => void;
/**
 * Relay a transaction from a Safe
 */
export declare function relayTransaction(chainId: string, body: operations['relay_transaction']['parameters']['body']): Promise<RelayTransactionResponse>;
/**
 * Get the relay limit and number of remaining relays remaining
 */
export declare function getRelayCount(chainId: string, address: string): Promise<RelayCountResponse>;
/**
 * Get basic information about a Safe. E.g. owners, modules, version etc
 */
export declare function getSafeInfo(chainId: string, address: string): Promise<SafeInfo>;
/**
 * Get filterable list of incoming transactions
 */
export declare function getIncomingTransfers(chainId: string, address: string, query?: operations['incoming_transfers']['parameters']['query'], pageUrl?: string): Promise<SafeIncomingTransfersResponse>;
/**
 * Get filterable list of module transactions
 */
export declare function getModuleTransactions(chainId: string, address: string, query?: operations['module_transactions']['parameters']['query'], pageUrl?: string): Promise<SafeModuleTransactionsResponse>;
/**
 * Get filterable list of multisig transactions
 */
export declare function getMultisigTransactions(chainId: string, address: string, query?: operations['multisig_transactions']['parameters']['query'], pageUrl?: string): Promise<SafeMultisigTransactionsResponse>;
/**
 * Get the total balance and all assets stored in a Safe
 */
export declare function getBalances(chainId: string, address: string, currency?: string, query?: operations['safes_balances_list']['parameters']['query']): Promise<SafeBalanceResponse>;
/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
export declare function getFiatCurrencies(): Promise<FiatCurrencies>;
/**
 * Get the addresses of all Safes belonging to an owner
 */
export declare function getOwnedSafes(chainId: string, address: string): Promise<OwnedSafes>;
/**
 * Get the addresses of all Safes belonging to an owner on all chains
 */
export declare function getAllOwnedSafes(address: string): Promise<AllOwnedSafes>;
/**
 * Get NFTs stored in a Safe
 */
export declare function getCollectibles(chainId: string, address: string, query?: operations['safes_collectibles_list']['parameters']['query']): Promise<SafeCollectibleResponse[]>;
/**
 * Get NFTs stored in a Safe
 */
export declare function getCollectiblesPage(chainId: string, address: string, query?: operations['safes_collectibles_list_paginated']['parameters']['query'], pageUrl?: string): Promise<SafeCollectiblesPage>;
/**
 * Get a list of past Safe transactions
 */
export declare function getTransactionHistory(chainId: string, address: string, query?: operations['history_transactions']['parameters']['query'], pageUrl?: string): Promise<TransactionListPage>;
/**
 * Get the list of pending transactions
 */
export declare function getTransactionQueue(chainId: string, address: string, query?: operations['queued_transactions']['parameters']['query'], pageUrl?: string): Promise<TransactionListPage>;
/**
 * Get the details of an individual transaction by its id
 */
export declare function getTransactionDetails(chainId: string, transactionId: string): Promise<TransactionDetails>;
/**
 * Delete a transaction by its safeTxHash
 */
export declare function deleteTransaction(chainId: string, safeTxHash: string, signature: operations['delete_transaction']['parameters']['body']['signature']): Promise<void>;
/**
 * Request a gas estimate & recommmended tx nonce for a created transaction
 */
export declare function postSafeGasEstimation(chainId: string, address: string, body: operations['post_safe_gas_estimation']['parameters']['body']): Promise<SafeTransactionEstimation>;
export declare function getNonces(chainId: string, address: string): Promise<NoncesResponse>;
/**
 * Propose a new transaction for other owners to sign/execute
 */
export declare function proposeTransaction(chainId: string, address: string, body: operations['propose_transaction']['parameters']['body']): Promise<TransactionDetails>;
/**
 * Returns decoded data
 */
export declare function getConfirmationView(chainId: string, safeAddress: string, operation: operations['data_decoder']['parameters']['body']['operation'], data: operations['data_decoder']['parameters']['body']['data'], to?: operations['data_decoder']['parameters']['body']['to'], value?: operations['data_decoder']['parameters']['body']['value']): Promise<AnyConfirmationView>;
/**
 * Get a tx preview
 */
export declare function getTxPreview(chainId: string, safeAddress: string, operation: operations['data_decoder']['parameters']['body']['operation'], data: operations['data_decoder']['parameters']['body']['data'], to?: operations['data_decoder']['parameters']['body']['to'], value?: operations['data_decoder']['parameters']['body']['value']): Promise<TransactionPreview>;
/**
 * Returns all defined chain configs
 */
export declare function getChainsConfig(query?: operations['chains_list']['parameters']['query']): Promise<ChainListResponse>;
/**
 * Returns a chain config
 */
export declare function getChainConfig(chainId: string): Promise<ChainInfo>;
/**
 * Returns Safe Apps List
 */
export declare function getSafeApps(chainId: string, query?: operations['safe_apps_read']['parameters']['query']): Promise<SafeAppsResponse>;
/**
 * Returns list of Master Copies
 */
export declare function getMasterCopies(chainId: string): Promise<MasterCopyReponse>;
/**
 * Returns decoded data
 */
export declare function getDecodedData(chainId: string, operation: operations['data_decoder']['parameters']['body']['operation'], encodedData: operations['data_decoder']['parameters']['body']['data'], to?: operations['data_decoder']['parameters']['body']['to']): Promise<DecodedDataResponse>;
/**
 * Returns list of `SafeMessage`s
 */
export declare function getSafeMessages(chainId: string, address: string, pageUrl?: string): Promise<SafeMessageListPage>;
/**
 * Returns a `SafeMessage`
 */
export declare function getSafeMessage(chainId: string, messageHash: string): Promise<Omit<SafeMessage, 'type'>>;
/**
 * Propose a new `SafeMessage` for other owners to sign
 */
export declare function proposeSafeMessage(chainId: string, address: string, body: operations['propose_safe_message']['parameters']['body']): Promise<void>;
/**
 * Add a confirmation to a `SafeMessage`
 */
export declare function confirmSafeMessage(chainId: string, messageHash: string, body: operations['confirm_safe_message']['parameters']['body']): Promise<void>;
/**
 * Returns a list of delegates
 */
export declare function getDelegates(chainId: string, query?: DelegatesRequest): Promise<DelegateResponse>;
/**
 * Registers a device/Safe for notifications
 */
export declare function registerDevice(body: operations['register_device']['parameters']['body']): Promise<void>;
/**
 * Unregisters a Safe from notifications
 */
export declare function unregisterSafe(chainId: string, address: string, uuid: string): Promise<void>;
/**
 * Unregisters a device from notifications
 */
export declare function unregisterDevice(chainId: string, uuid: string): Promise<void>;
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
export declare function registerEmail(chainId: string, safeAddress: string, body: operations['register_email']['parameters']['body'], headers: operations['register_email']['parameters']['headers']): Promise<void>;
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
export declare function changeEmail(chainId: string, safeAddress: string, signerAddress: string, body: operations['change_email']['parameters']['body'], headers: operations['change_email']['parameters']['headers']): Promise<void>;
/**
 * Resends an email verification code.
 */
export declare function resendEmailVerificationCode(chainId: string, safeAddress: string, signerAddress: string): Promise<void>;
/**
 * Verifies a pending email address registration.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress address who signed the email registration
 * @param body Verification code
 */
export declare function verifyEmail(chainId: string, safeAddress: string, signerAddress: string, body: operations['verify_email']['parameters']['body']): Promise<void>;
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
export declare function getRegisteredEmail(chainId: string, safeAddress: string, signerAddress: string, headers: operations['get_email']['parameters']['headers']): Promise<GetEmailResponse>;
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
export declare function deleteRegisteredEmail(chainId: string, safeAddress: string, signerAddress: string, headers: operations['delete_email']['parameters']['headers']): Promise<void>;
/**
 * Register a recovery module for receiving alerts
 * @param chainId
 * @param safeAddress
 * @param body - { moduleAddress: string }
 */
export declare function registerRecoveryModule(chainId: string, safeAddress: string, body: operations['register_recovery_module']['parameters']['body']): Promise<void>;
/**
 * Delete email subscription for a single category
 * @param query
 */
export declare function unsubscribeSingle(query: operations['unsubscribe_single']['parameters']['query']): Promise<void>;
/**
 * Delete email subscription for all categories
 * @param query
 */
export declare function unsubscribeAll(query: operations['unsubscribe_all']['parameters']['query']): Promise<void>;
/**
 * Get Safe overviews per address
 */
export declare function getSafeOverviews(safes: `${number}:${EthereumAddress}`[], query: Omit<operations['SafesController_getSafeOverview']['parameters']['query'], 'safes'>): Promise<SafeOverview[]>;
export declare function getContract(chainId: string, contractAddress: string): Promise<Contract>;
export declare function getAuthNonce(): Promise<AuthNonce>;
export declare function verifyAuth(body: operations['verify_auth']['parameters']['body']): Promise<void>;
export declare function createAccount(body: operations['create_account']['parameters']['body']): Promise<import("./types/accounts").Account>;
export declare function getAccount(address: string): Promise<import("./types/accounts").Account>;
export declare function deleteAccount(address: string): Promise<void>;
export declare function getAccountDataTypes(): Promise<import("./types/accounts").AccountDataType[]>;
export declare function getAccountDataSettings(address: string): Promise<import("./types/accounts").AccountDataSetting[]>;
export declare function putAccountDataSettings(address: string, body: operations['put_account_data_settings']['parameters']['body']): Promise<import("./types/accounts").AccountDataSetting[]>;
export declare function getIndexingStatus(chainId: string): Promise<import("./types/chains").ChainIndexingStatus>;

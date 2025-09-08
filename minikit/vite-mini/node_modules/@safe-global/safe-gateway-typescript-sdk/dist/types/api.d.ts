import type { AllOwnedSafes, FiatCurrencies, OwnedSafes, SafeBalanceResponse, SafeCollectibleResponse, SafeCollectiblesPage } from './common';
import type { MultisigTransactionRequest, TransactionDetails, SafeTransactionEstimation, SafeTransactionEstimationRequest, TransactionListPage, SafeIncomingTransfersResponse, SafeModuleTransactionsResponse, SafeMultisigTransactionsResponse, NoncesResponse, TransactionPreview } from './transactions';
import type { SafeInfo, SafeOverview } from './safe-info';
import type { ChainListResponse, ChainInfo, ChainIndexingStatus } from './chains';
import type { SafeAppsResponse } from './safe-apps';
import type { AnyConfirmationView, DecodedDataRequest, DecodedDataResponse } from './decoded-data';
import type { MasterCopyReponse } from './master-copies';
import type { ConfirmSafeMessageRequest, ProposeSafeMessageRequest, SafeMessage, SafeMessageListPage } from './safe-messages';
import type { DelegateResponse, DelegatesRequest } from './delegates';
import type { RegisterNotificationsRequest } from './notifications';
import type { ChangeEmailRequestBody, GetEmailResponse, RegisterEmailRequestBody, AuthorizationEmailRequestHeaders, VerifyEmailRequestBody } from './emails';
import type { RelayCountResponse, RelayTransactionRequest, RelayTransactionResponse } from './relay';
import type { RegisterRecoveryModuleRequestBody } from './recovery';
import type { Contract } from './contracts';
import type { AuthNonce } from './auth';
import type { Account, AccountDataSetting, AccountDataType, CreateAccountRequest, UpsertAccountDataSettingsRequest } from './accounts';
export type Primitive = string | number | boolean | null;
interface Params {
    path?: {
        [key: string]: Primitive;
    };
    headers?: Record<string, string>;
    query?: {
        [key: string]: Primitive;
    };
    credentials?: RequestCredentials;
}
interface BodyParams extends Params {
    body?: string | Record<string, unknown>;
}
interface Responses {
    200: {
        schema: unknown;
    };
    [key: number]: {
        schema: unknown;
    } | unknown;
}
interface Endpoint {
    parameters: {
        path: Record<string, Primitive> | null;
    } | null;
}
interface WriteMethod {
    parameters: BodyParams | null;
    responses: Responses;
}
export interface GetEndpoint extends Endpoint {
    get: {
        parameters: Params | null;
        responses: Responses;
    };
}
export interface PostEndpoint extends Endpoint {
    post: WriteMethod;
}
export interface PutEndpoint extends Endpoint {
    put: WriteMethod;
}
export interface DeleteEndpoint extends Endpoint {
    delete: WriteMethod;
}
interface PathRegistry {
    [key: string]: GetEndpoint | PostEndpoint | PutEndpoint | DeleteEndpoint;
}
export interface paths extends PathRegistry {
    '/v1/chains/{chainId}/relay': {
        post: operations['relay_transaction'];
        parameters: {
            path: {
                chainId: string;
            };
        };
    };
    '/v1/chains/{chainId}/relay/{address}': {
        get: operations['relay_count'];
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{address}': {
        /** Get status of the safe */
        get: operations['safes_read'];
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{address}/balances/{currency}': {
        get: operations['safes_balances_list'];
        parameters: {
            path: {
                chainId: string;
                address: string;
                currency: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{address}/incoming-transfers/': {
        get: operations['incoming_transfers'];
        parameters: {
            path: {
                chainId: string;
                address: string;
                currency: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{address}/module-transactions/': {
        get: operations['module_transactions'];
        parameters: {
            path: {
                chainId: string;
                address: string;
                currency: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{address}/multisig-transactions/': {
        get: operations['multisig_transactions'];
        parameters: {
            path: {
                chainId: string;
                address: string;
                currency: string;
            };
        };
    };
    '/v1/balances/supported-fiat-codes': {
        get: operations['get_supported_fiat'];
        parameters: null;
    };
    '/v1/chains/{chainId}/safes/{address}/collectibles': {
        /** Get collectibles (ERC721 tokens) and information about them */
        get: operations['safes_collectibles_list'];
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
    };
    '/v2/chains/{chainId}/safes/{address}/collectibles': {
        /** Get collectibles (ERC721 tokens) and information about them */
        get: operations['safes_collectibles_list_paginated'];
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/transactions/history': {
        get: operations['history_transactions'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/transactions/queued': {
        get: operations['queued_transactions'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/transactions/{transactionId}': {
        get: operations['get_transactions'];
        parameters: {
            path: {
                chainId: string;
                transactionId: string;
            };
        };
    };
    '/v1/chains/{chainId}/transactions/{safeTxHash}': {
        delete: operations['delete_transaction'];
        parameters: {
            path: {
                chainId: string;
                safeTxHash: string;
            };
        };
    };
    '/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations': {
        post: operations['post_safe_gas_estimation'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/transactions/{safe_address}/propose': {
        post: operations['propose_transaction'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/transactions/{safe_address}/preview': {
        post: operations['preview_transaction'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation': {
        post: operations['get_transaction_confirmation_view'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/owners/{address}/safes': {
        get: operations['get_owned_safes'];
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
    };
    '/v1/owners/{address}/safes': {
        get: operations['get_all_owned_safes'];
        parameters: {
            path: {
                address: string;
            };
        };
    };
    '/v1/chains': {
        get: operations['chains_list'];
        parameters: null;
    };
    '/v1/chains/{chainId}': {
        get: operations['chains_read'];
        parameters: {
            path: {
                chainId: string;
            };
        };
    };
    '/v1/chains/{chainId}/safe-apps': {
        get: operations['safe_apps_read'];
        parameters: {
            path: {
                chainId: string;
            };
        };
    };
    '/v1/chains/{chainId}/about/master-copies': {
        get: operations['master_copies'];
        parameters: {
            path: {
                chainId: string;
            };
        };
    };
    '/v1/chains/{chainId}/data-decoder': {
        post: operations['data_decoder'];
        parameters: {
            path: {
                chainId: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/messages': {
        get: operations['get_safe_messages'];
        post: operations['propose_safe_message'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/messages/{message_hash}': {
        get: operations['get_safe_message'];
        parameters: {
            path: {
                chainId: string;
                message_hash: string;
            };
        };
    };
    '/v1/chains/{chainId}/messages/{message_hash}/signatures': {
        post: operations['confirm_safe_message'];
        parameters: {
            path: {
                chainId: string;
                message_hash: string;
            };
        };
    };
    '/v2/chains/{chainId}/delegates': {
        get: operations['get_delegates'];
        parameters: {
            path: {
                chainId: string;
            };
            query: DelegatesRequest;
        };
    };
    '/v1/register/notifications': {
        post: operations['register_device'];
        parameters: null;
    };
    '/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}': {
        delete: operations['unregister_safe'];
        parameters: {
            path: {
                uuid: string;
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/notifications/devices/{uuid}': {
        delete: operations['unregister_device'];
        parameters: {
            path: {
                uuid: string;
                chainId: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/nonces': {
        get: operations['get_nonces'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/emails': {
        post: operations['register_email'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}': {
        put: operations['change_email'];
        get: operations['get_email'];
        delete: operations['delete_email'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend': {
        post: operations['verify_resend'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify': {
        put: operations['verify_email'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
        };
    };
    '/v1/chains/{chainId}/safes/{safe_address}/recovery': {
        post: operations['register_recovery_module'];
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
    };
    '/v1/chains/{chainId}/about/indexing': {
        get: operations['get_indexing'];
        parameters: {
            path: {
                chainId: string;
            };
        };
    };
    '/v1/subscriptions': {
        delete: operations['unsubscribe_single'];
        parameters: {
            path: null;
        };
    };
    '/v1/subscriptions/all': {
        delete: operations['unsubscribe_all'];
        parameters: {
            path: null;
        };
    };
    '/v1/safes': {
        get: operations['SafesController_getSafeOverview'];
        parameters: {
            path: null;
        };
    };
    '/v1/chains/{chainId}/contracts/{contractAddress}': {
        get: operations['get_contract'];
        parameters: {
            path: {
                chainId: string;
                contractAddress: string;
            };
        };
    };
    '/v1/auth/nonce': {
        get: operations['get_auth_nonce'];
        parameters: {
            path: null;
            credentials: 'include';
        };
    };
    '/v1/auth/verify': {
        post: operations['verify_auth'];
        parameters: {
            path: null;
            credentials: 'include';
            body: {
                message: string;
                signature: string;
            };
        };
    };
    '/v1/accounts': {
        post: operations['create_account'];
        parameters: {
            path: null;
            credentials: 'include';
        };
    };
    '/v1/accounts/{address}': {
        get: operations['get_account'];
        delete: operations['delete_account'];
        parameters: {
            path: {
                address: string;
            };
            credentials: 'include';
        };
    };
    '/v1/accounts/data-types': {
        get: operations['get_account_data_types'];
        parameters: {
            path: null;
        };
    };
    '/v1/accounts/{address}/data-settings': {
        get: operations['get_account_data_settings'];
        put: operations['put_account_data_settings'];
        parameters: {
            path: {
                address: string;
            };
            credentials: 'include';
        };
    };
}
export interface operations {
    /** Relay a transaction */
    relay_transaction: {
        parameters: {
            path: {
                chainId: string;
            };
            body: RelayTransactionRequest;
        };
        responses: {
            200: {
                schema: RelayTransactionResponse;
            };
        };
    };
    /** Get the limit and current number of relays */
    relay_count: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
        responses: {
            200: {
                schema: RelayCountResponse;
            };
        };
    };
    /** Get status of the safe */
    safes_read: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
        responses: {
            200: {
                schema: SafeInfo;
            };
            /** Safe not found */
            404: unknown;
            /**
             * code = 1: Checksum address validation failed
             * code = 50: Cannot get Safe info
             */
            422: unknown;
        };
    };
    /** Get balance for Ether and ERC20 tokens with USD fiat conversion */
    safes_balances_list: {
        parameters: {
            path: {
                chainId: string;
                address: string;
                currency: string;
            };
            query: {
                /** If `True` just trusted tokens will be returned */
                trusted?: boolean;
                /** If `True` spam tokens will not be returned */
                exclude_spam?: boolean;
            };
        };
        responses: {
            200: {
                schema: SafeBalanceResponse;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    /** Get filterable incoming transfers */
    incoming_transfers: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
            query?: {
                /** If `True` just trusted tokens will be returned */
                trusted?: boolean;
                execution_date__gte?: string;
                execution_date__lte?: string;
                to?: string;
                token_address?: string;
                value?: string;
                timezone?: string;
            };
        };
        responses: {
            200: {
                schema: SafeIncomingTransfersResponse;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    /** Get filterable module transactions */
    module_transactions: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
            query?: {
                module?: string;
                to?: string;
                timezone?: string;
                transaction_hash?: string;
            };
        };
        responses: {
            200: {
                schema: SafeModuleTransactionsResponse;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    /** Get filterable multisig transactions */
    multisig_transactions: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
            query?: {
                execution_date__gte?: string;
                execution_date__lte?: string;
                to?: string;
                value?: string;
                nonce?: string;
                executed?: string;
                timezone?: string;
            };
        };
        responses: {
            200: {
                schema: SafeMultisigTransactionsResponse;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    get_supported_fiat: {
        parameters: null;
        responses: {
            200: {
                schema: FiatCurrencies;
            };
        };
    };
    /** Get collectibles (ERC721 tokens) and information about them */
    safes_collectibles_list: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
            query: {
                /** If `True` just trusted tokens will be returned */
                trusted?: boolean;
                /** If `True` spam tokens will not be returned */
                exclude_spam?: boolean;
            };
        };
        responses: {
            200: {
                schema: SafeCollectibleResponse[];
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    safes_collectibles_list_paginated: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
            query: {
                /** If `True` just trusted tokens will be returned */
                trusted?: boolean;
                /** If `True` spam tokens will not be returned */
                exclude_spam?: boolean;
            };
        };
        responses: {
            200: {
                schema: SafeCollectiblesPage;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    history_transactions: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            query: {
                /** Taken from the Page['next'] or Page['previous'] */
                page_url?: string;
                trusted?: boolean;
                imitation?: boolean;
                timezone?: string;
            };
        };
        responses: {
            200: {
                schema: TransactionListPage;
            };
        };
    };
    queued_transactions: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            query: {
                /** Taken from the Page['next'] or Page['previous'] */
                page_url?: string;
                trusted?: boolean;
                timezone?: string;
            };
        };
        responses: {
            200: {
                schema: TransactionListPage;
            };
        };
    };
    get_transactions: {
        parameters: {
            path: {
                chainId: string;
                transactionId: string;
            };
        };
        responses: {
            200: {
                schema: TransactionDetails;
            };
        };
    };
    delete_transaction: {
        parameters: {
            path: {
                chainId: string;
                safeTxHash: string;
            };
            body: {
                signature: string;
            };
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    post_safe_gas_estimation: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            body: SafeTransactionEstimationRequest;
        };
        responses: {
            200: {
                schema: SafeTransactionEstimation;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    propose_transaction: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            body: MultisigTransactionRequest;
        };
        responses: {
            200: {
                schema: TransactionDetails;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    preview_transaction: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            body: DecodedDataRequest;
        };
        responses: {
            200: {
                schema: TransactionPreview;
            };
            /** Safe not found */
            404: unknown;
            /** Safe address checksum not valid */
            422: unknown;
        };
    };
    get_transaction_confirmation_view: {
        parameters: {
            path: {
                /** A unique value identifying this chain. */
                chainId: string;
                safe_address: string;
            };
            body: DecodedDataRequest;
        };
        responses: {
            200: {
                schema: AnyConfirmationView;
            };
        };
    };
    get_owned_safes: {
        parameters: {
            path: {
                chainId: string;
                address: string;
            };
        };
        responses: {
            200: {
                schema: OwnedSafes;
            };
        };
    };
    get_all_owned_safes: {
        parameters: {
            path: {
                address: string;
            };
        };
        responses: {
            200: {
                schema: AllOwnedSafes;
            };
        };
    };
    chains_list: {
        parameters: {
            query?: {
                /** Which field to use when ordering the results. */
                ordering?: string;
                /** Number of results to return per page. */
                limit?: number;
                /** The initial index from which to return the results. */
                offset?: number;
            };
        };
        responses: {
            200: {
                schema: ChainListResponse;
            };
        };
    };
    chains_read: {
        parameters: {
            path: {
                /** A unique value identifying this chain. */
                chainId: string;
            };
        };
        responses: {
            200: {
                schema: ChainInfo;
            };
        };
    };
    safe_apps_read: {
        parameters: {
            path: {
                /** A unique value identifying this chain. */
                chainId: string;
            };
            query?: {
                client_url?: string;
                url?: string;
            };
        };
        responses: {
            200: {
                schema: SafeAppsResponse;
            };
        };
    };
    master_copies: {
        parameters: {
            path: {
                /** A unique value identifying this chain. */
                chainId: string;
            };
        };
        responses: {
            200: {
                schema: MasterCopyReponse;
            };
        };
    };
    data_decoder: {
        parameters: {
            path: {
                /** A unique value identifying this chain. */
                chainId: string;
            };
            body: DecodedDataRequest;
        };
        responses: {
            200: {
                schema: DecodedDataResponse;
            };
        };
    };
    get_safe_messages: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            query: {
                /** Taken from the Page['next'] or Page['previous'] */
                page_url?: string;
            };
        };
        responses: {
            200: {
                schema: SafeMessageListPage;
            };
        };
    };
    get_safe_message: {
        parameters: {
            path: {
                chainId: string;
                message_hash: string;
            };
        };
        responses: {
            200: {
                schema: SafeMessage;
            };
        };
    };
    propose_safe_message: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            body: ProposeSafeMessageRequest;
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    confirm_safe_message: {
        parameters: {
            path: {
                chainId: string;
                message_hash: string;
            };
            body: ConfirmSafeMessageRequest;
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    get_delegates: {
        parameters: {
            path: {
                chainId: string;
            };
            query: DelegatesRequest;
        };
        responses: {
            200: {
                schema: DelegateResponse;
            };
        };
    };
    register_device: {
        parameters: {
            body: RegisterNotificationsRequest;
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    unregister_safe: {
        parameters: {
            path: {
                uuid: string;
                chainId: string;
                safe_address: string;
            };
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    unregister_device: {
        parameters: {
            path: {
                uuid: string;
                chainId: string;
            };
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    get_nonces: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
        };
        responses: {
            200: {
                schema: NoncesResponse;
            };
        };
    };
    register_email: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            body: RegisterEmailRequestBody;
            headers: AuthorizationEmailRequestHeaders;
        };
        responses: {
            200: {
                schema: void;
            };
            201: {
                schema: void;
            };
        };
    };
    change_email: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
            body: ChangeEmailRequestBody;
            headers: AuthorizationEmailRequestHeaders;
        };
        responses: {
            200: {
                schema: void;
            };
            202: {
                schema: void;
            };
        };
    };
    get_email: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
            headers: AuthorizationEmailRequestHeaders;
        };
        responses: {
            200: {
                schema: GetEmailResponse;
            };
        };
    };
    verify_resend: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
            body: '';
        };
        responses: {
            202: {
                schema: void;
            };
            200: {
                schema: void;
            };
        };
    };
    verify_email: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
            body: VerifyEmailRequestBody;
        };
        responses: {
            204: {
                schema: void;
            };
            200: {
                schema: void;
            };
            400: unknown;
        };
    };
    delete_email: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
                signer: string;
            };
            headers: AuthorizationEmailRequestHeaders;
        };
        responses: {
            204: {
                schema: void;
            };
            200: {
                schema: void;
            };
            403: unknown;
        };
    };
    register_recovery_module: {
        parameters: {
            path: {
                chainId: string;
                safe_address: string;
            };
            body: RegisterRecoveryModuleRequestBody;
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    get_indexing: {
        parameters: {
            path: {
                chainId: string;
            };
        };
        responses: {
            200: {
                schema: ChainIndexingStatus;
            };
        };
    };
    unsubscribe_single: {
        parameters: {
            query: {
                category: string;
                token: string;
            };
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    unsubscribe_all: {
        parameters: {
            query: {
                token: string;
            };
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    SafesController_getSafeOverview: {
        parameters: {
            query: {
                currency: string;
                safes: string;
                trusted: boolean;
                exclude_spam: boolean;
                wallet_address?: string;
            };
        };
        responses: {
            200: {
                schema: SafeOverview[];
            };
        };
    };
    get_contract: {
        parameters: {
            path: {
                chainId: string;
                contractAddress: string;
            };
        };
        responses: {
            200: {
                schema: Contract;
            };
        };
    };
    get_auth_nonce: {
        parameters: {
            credentials: 'include';
        };
        responses: {
            200: {
                schema: AuthNonce;
            };
        };
    };
    verify_auth: {
        parameters: {
            body: {
                message: string;
                signature: string;
            };
            credentials: 'include';
        };
        responses: {
            200: {
                schema: void;
            };
        };
    };
    create_account: {
        parameters: {
            body: CreateAccountRequest;
            credentials: 'include';
        };
        responses: {
            200: {
                schema: Account;
            };
            403: unknown;
            422: unknown;
        };
    };
    get_account_data_types: {
        parameters: null;
        responses: {
            200: {
                schema: AccountDataType[];
            };
        };
    };
    get_account_data_settings: {
        parameters: {
            path: {
                address: string;
            };
            credentials: 'include';
        };
        responses: {
            200: {
                schema: AccountDataSetting[];
            };
            403: unknown;
        };
    };
    put_account_data_settings: {
        parameters: {
            path: {
                address: string;
            };
            credentials: 'include';
            body: UpsertAccountDataSettingsRequest;
        };
        responses: {
            200: {
                schema: AccountDataSetting[];
            };
            403: unknown;
        };
    };
    get_account: {
        parameters: {
            path: {
                address: string;
            };
            credentials: 'include';
        };
        responses: {
            200: {
                schema: Account;
            };
            403: unknown;
        };
    };
    delete_account: {
        parameters: {
            path: {
                address: string;
            };
            credentials: 'include';
        };
        responses: {
            204: {
                schema: void;
            };
            200: {
                schema: void;
            };
            403: unknown;
        };
    };
}
export {};

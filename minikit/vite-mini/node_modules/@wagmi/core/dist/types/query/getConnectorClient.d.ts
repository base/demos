import { type GetConnectorClientParameters, type GetConnectorClientReturnType } from '../actions/getConnectorClient.js';
import type { Config } from '../createConfig.js';
import type { ScopeKeyParameter } from '../types/properties.js';
import type { Compute, ExactPartial } from '../types/utils.js';
export type GetConnectorClientOptions<config extends Config, chainId extends config['chains'][number]['id']> = Compute<ExactPartial<GetConnectorClientParameters<config, chainId>> & ScopeKeyParameter>;
export declare function getConnectorClientQueryOptions<config extends Config, chainId extends config['chains'][number]['id']>(config: config, options?: GetConnectorClientOptions<config, chainId>): {
    readonly gcTime: 0;
    readonly queryFn: ({ queryKey }: {
        queryKey: readonly ["connectorClient", {
            readonly connectorUid: string | undefined;
            readonly chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
            readonly account?: import("viem").Address | import("viem").Account | null | undefined;
            readonly scopeKey?: string | undefined;
        }];
        signal: AbortSignal;
        meta: import("@tanstack/query-core").QueryMeta | undefined;
        pageParam?: unknown;
        direction?: unknown;
    }) => Promise<{
        account: import("viem").Account;
        batch?: {
            multicall?: boolean | import("viem").Prettify<import("viem").MulticallBatchOptions> | undefined;
        } | undefined;
        cacheTime: number;
        ccipRead?: false | {
            request?: (parameters: import("viem").CcipRequestParameters) => Promise<`0x${string}`>;
        } | undefined;
        chain: Extract<config["chains"][number], {
            id: chainId;
        }>;
        key: string;
        name: string;
        pollingInterval: number;
        request: import("viem").EIP1193RequestFn<[{
            Method: "web3_clientVersion";
            Parameters?: undefined;
            ReturnType: string;
        }, {
            Method: "web3_sha3";
            Parameters: [data: import("viem").Hash];
            ReturnType: string;
        }, {
            Method: "net_listening";
            Parameters?: undefined;
            ReturnType: boolean;
        }, {
            Method: "net_peerCount";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "net_version";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_blobBaseFee";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_blockNumber";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_call";
            Parameters: readonly [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>] | readonly [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier] | readonly [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier, stateOverrideSet: import("viem").RpcStateOverride] | readonly [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier, stateOverrideSet: import("viem").RpcStateOverride, blockOverrides: import("viem").RpcBlockOverrides];
            ReturnType: import("viem").Hex;
        }, {
            Method: "eth_createAccessList";
            Parameters: [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>] | [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
            ReturnType: {
                accessList: import("viem").AccessList;
                gasUsed: import("viem").Quantity;
            };
        }, {
            Method: "eth_chainId";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_coinbase";
            Parameters?: undefined;
            ReturnType: import("viem").Address;
        }, {
            Method: "eth_estimateGas";
            Parameters: [transaction: import("viem").RpcTransactionRequest] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag, stateOverride: import("viem").RpcStateOverride];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_feeHistory";
            Parameters: [blockCount: import("viem").Quantity, newestBlock: import("viem").RpcBlockNumber | import("viem").BlockTag, rewardPercentiles: number[] | undefined];
            ReturnType: import("viem").RpcFeeHistory;
        }, {
            Method: "eth_gasPrice";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_getBalance";
            Parameters: [address: import("viem").Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_getBlockByHash";
            Parameters: [hash: import("viem").Hash, includeTransactionObjects: boolean];
            ReturnType: import("viem").RpcBlock | null;
        }, {
            Method: "eth_getBlockByNumber";
            Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, includeTransactionObjects: boolean];
            ReturnType: import("viem").RpcBlock | null;
        }, {
            Method: "eth_getBlockTransactionCountByHash";
            Parameters: [hash: import("viem").Hash];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_getBlockTransactionCountByNumber";
            Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_getCode";
            Parameters: [address: import("viem").Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
            ReturnType: import("viem").Hex;
        }, {
            Method: "eth_getFilterChanges";
            Parameters: [filterId: import("viem").Quantity];
            ReturnType: import("viem").RpcLog[] | import("viem").Hex[];
        }, {
            Method: "eth_getFilterLogs";
            Parameters: [filterId: import("viem").Quantity];
            ReturnType: import("viem").RpcLog[];
        }, {
            Method: "eth_getLogs";
            Parameters: [{
                address?: import("viem").Address | import("viem").Address[] | undefined;
                topics?: import("viem").LogTopic[] | undefined;
            } & ({
                fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
                toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
                blockHash?: undefined;
            } | {
                fromBlock?: undefined;
                toBlock?: undefined;
                blockHash?: import("viem").Hash | undefined;
            })];
            ReturnType: import("viem").RpcLog[];
        }, {
            Method: "eth_getProof";
            Parameters: [address: import("viem").Address, storageKeys: import("viem").Hash[], block: import("viem").RpcBlockNumber | import("viem").BlockTag];
            ReturnType: import("viem").RpcProof;
        }, {
            Method: "eth_getStorageAt";
            Parameters: [address: import("viem").Address, index: import("viem").Quantity, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
            ReturnType: import("viem").Hex;
        }, {
            Method: "eth_getTransactionByBlockHashAndIndex";
            Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
            ReturnType: import("viem").RpcTransaction | null;
        }, {
            Method: "eth_getTransactionByBlockNumberAndIndex";
            Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
            ReturnType: import("viem").RpcTransaction | null;
        }, {
            Method: "eth_getTransactionByHash";
            Parameters: [hash: import("viem").Hash];
            ReturnType: import("viem").RpcTransaction | null;
        }, {
            Method: "eth_getTransactionCount";
            Parameters: [address: import("viem").Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_getTransactionReceipt";
            Parameters: [hash: import("viem").Hash];
            ReturnType: import("viem").RpcTransactionReceipt | null;
        }, {
            Method: "eth_getUncleByBlockHashAndIndex";
            Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
            ReturnType: import("viem").RpcUncle | null;
        }, {
            Method: "eth_getUncleByBlockNumberAndIndex";
            Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
            ReturnType: import("viem").RpcUncle | null;
        }, {
            Method: "eth_getUncleCountByBlockHash";
            Parameters: [hash: import("viem").Hash];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_getUncleCountByBlockNumber";
            Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_maxPriorityFeePerGas";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_newBlockFilter";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_newFilter";
            Parameters: [filter: {
                fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
                toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
                address?: import("viem").Address | import("viem").Address[] | undefined;
                topics?: import("viem").LogTopic[] | undefined;
            }];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_newPendingTransactionFilter";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_protocolVersion";
            Parameters?: undefined;
            ReturnType: string;
        }, {
            Method: "eth_sendRawTransaction";
            Parameters: [signedTransaction: import("viem").Hex];
            ReturnType: import("viem").Hash;
        }, {
            Method: "eth_simulateV1";
            Parameters: [{
                blockStateCalls: readonly {
                    blockOverrides?: import("viem").RpcBlockOverrides | undefined;
                    calls?: readonly import("viem").ExactPartial<import("viem").RpcTransactionRequest>[] | undefined;
                    stateOverrides?: import("viem").RpcStateOverride | undefined;
                }[];
                returnFullTransactions?: boolean | undefined;
                traceTransfers?: boolean | undefined;
                validation?: boolean | undefined;
            }, import("viem").RpcBlockNumber | import("viem").BlockTag];
            ReturnType: readonly (import("viem").RpcBlock & {
                calls: readonly {
                    error?: {
                        data?: import("viem").Hex | undefined;
                        code: number;
                        message: string;
                    } | undefined;
                    logs?: readonly import("viem").RpcLog[] | undefined;
                    gasUsed: import("viem").Hex;
                    returnData: import("viem").Hex;
                    status: import("viem").Hex;
                }[];
            })[];
        }, {
            Method: "eth_uninstallFilter";
            Parameters: [filterId: import("viem").Quantity];
            ReturnType: boolean;
        }, {
            Method: "eth_accounts";
            Parameters?: undefined;
            ReturnType: import("viem").Address[];
        }, {
            Method: "eth_chainId";
            Parameters?: undefined;
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_estimateGas";
            Parameters: [transaction: import("viem").RpcTransactionRequest] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag, stateOverride: import("viem").RpcStateOverride];
            ReturnType: import("viem").Quantity;
        }, {
            Method: "eth_requestAccounts";
            Parameters?: undefined;
            ReturnType: import("viem").Address[];
        }, {
            Method: "eth_sendTransaction";
            Parameters: [transaction: import("viem").RpcTransactionRequest];
            ReturnType: import("viem").Hash;
        }, {
            Method: "eth_sendRawTransaction";
            Parameters: [signedTransaction: import("viem").Hex];
            ReturnType: import("viem").Hash;
        }, {
            Method: "eth_sign";
            Parameters: [address: import("viem").Address, data: import("viem").Hex];
            ReturnType: import("viem").Hex;
        }, {
            Method: "eth_signTransaction";
            Parameters: [request: import("viem").RpcTransactionRequest];
            ReturnType: import("viem").Hex;
        }, {
            Method: "eth_signTypedData_v4";
            Parameters: [address: import("viem").Address, message: string];
            ReturnType: import("viem").Hex;
        }, {
            Method: "eth_syncing";
            Parameters?: undefined;
            ReturnType: import("viem").NetworkSync | false;
        }, {
            Method: "personal_sign";
            Parameters: [data: import("viem").Hex, address: import("viem").Address];
            ReturnType: import("viem").Hex;
        }, {
            Method: "wallet_addEthereumChain";
            Parameters: [chain: import("viem").AddEthereumChainParameter];
            ReturnType: null;
        }, {
            Method: "wallet_addSubAccount";
            Parameters: [{
                account: import("viem").OneOf<{
                    keys: readonly {
                        publicKey: import("viem").Hex;
                        type: "address" | "p256" | "webcrypto-p256" | "webauthn-p256";
                    }[];
                    type: "create";
                } | {
                    address: import("viem").Address;
                    chainId?: number | undefined;
                    type: "deployed";
                } | {
                    address: import("viem").Address;
                    chainId?: number | undefined;
                    factory: import("viem").Address;
                    factoryData: import("viem").Hex;
                    type: "undeployed";
                }>;
                version: string;
            }];
            ReturnType: {
                address: import("viem").Address;
                factory?: import("viem").Address | undefined;
                factoryData?: import("viem").Hex | undefined;
            };
        }, {
            Method: "wallet_connect";
            Parameters: [{
                capabilities?: import("viem").Capabilities | undefined;
                version: string;
            }];
            ReturnType: {
                accounts: readonly {
                    address: import("viem").Address;
                    capabilities?: import("viem").Capabilities | undefined;
                }[];
            };
        }, {
            Method: "wallet_disconnect";
            Parameters?: undefined;
            ReturnType: void;
        }, {
            Method: "wallet_getCallsStatus";
            Parameters?: [string];
            ReturnType: import("viem").WalletGetCallsStatusReturnType;
        }, {
            Method: "wallet_getCapabilities";
            Parameters?: readonly [] | readonly [import("viem").Address | undefined] | readonly [import("viem").Address | undefined, readonly import("viem").Hex[] | undefined] | undefined;
            ReturnType: import("viem").Prettify<import("viem").WalletCapabilitiesRecord>;
        }, {
            Method: "wallet_getPermissions";
            Parameters?: undefined;
            ReturnType: import("viem").WalletPermission[];
        }, {
            Method: "wallet_grantPermissions";
            Parameters?: [import("viem").WalletGrantPermissionsParameters];
            ReturnType: import("viem").Prettify<import("viem").WalletGrantPermissionsReturnType>;
        }, {
            Method: "wallet_requestPermissions";
            Parameters: [permissions: {
                eth_accounts: Record<string, any>;
            }];
            ReturnType: import("viem").WalletPermission[];
        }, {
            Method: "wallet_revokePermissions";
            Parameters: [permissions: {
                eth_accounts: Record<string, any>;
            }];
            ReturnType: null;
        }, {
            Method: "wallet_sendCalls";
            Parameters?: import("viem").WalletSendCallsParameters;
            ReturnType: import("viem").WalletSendCallsReturnType;
        }, {
            Method: "wallet_sendTransaction";
            Parameters: [transaction: import("viem").RpcTransactionRequest];
            ReturnType: import("viem").Hash;
        }, {
            Method: "wallet_showCallsStatus";
            Parameters?: [string];
            ReturnType: void;
        }, {
            Method: "wallet_switchEthereumChain";
            Parameters: [chain: {
                chainId: string;
            }];
            ReturnType: null;
        }, {
            Method: "wallet_watchAsset";
            Parameters: import("viem").WatchAssetParams;
            ReturnType: boolean;
        }, {
            Method: "eth_chainId";
            Parameters?: undefined;
            ReturnType: import("viem").Hex;
        }, {
            Method: "eth_estimateUserOperationGas";
            Parameters: [userOperation: import("viem").RpcUserOperation, entrypoint: import("viem").Address] | [userOperation: import("viem").RpcUserOperation, entrypoint: import("viem").Address, stateOverrideSet: import("viem").RpcStateOverride];
            ReturnType: import("viem").RpcEstimateUserOperationGasReturnType;
        }, {
            Method: "eth_getUserOperationByHash";
            Parameters: [hash: import("viem").Hash];
            ReturnType: import("viem").RpcGetUserOperationByHashReturnType | null;
        }, {
            Method: "eth_getUserOperationReceipt";
            Parameters: [hash: import("viem").Hash];
            ReturnType: import("viem").RpcUserOperationReceipt | null;
        }, {
            Method: "eth_sendUserOperation";
            Parameters: [userOperation: import("viem").RpcUserOperation, entrypoint: import("viem").Address];
            ReturnType: import("viem").Hash;
        }, {
            Method: "eth_supportedEntryPoints";
            Parameters?: undefined;
            ReturnType: readonly import("viem").Address[];
        }, {
            Method: "pm_getPaymasterStubData";
            Parameters?: [userOperation: import("viem").OneOf<import("viem").PartialBy<Pick<import("viem").RpcUserOperation<"0.6">, "callData" | "callGasLimit" | "initCode" | "maxFeePerGas" | "maxPriorityFeePerGas" | "nonce" | "sender" | "preVerificationGas" | "verificationGasLimit">, "callGasLimit" | "initCode" | "maxFeePerGas" | "maxPriorityFeePerGas" | "preVerificationGas" | "verificationGasLimit"> | import("viem").PartialBy<Pick<import("viem").RpcUserOperation<"0.7">, "callData" | "callGasLimit" | "factory" | "factoryData" | "maxFeePerGas" | "maxPriorityFeePerGas" | "nonce" | "sender" | "preVerificationGas" | "verificationGasLimit">, "callGasLimit" | "factory" | "factoryData" | "maxFeePerGas" | "maxPriorityFeePerGas" | "preVerificationGas" | "verificationGasLimit">>, entrypoint: import("viem").Address, chainId: import("viem").Hex, context: unknown];
            ReturnType: import("viem").OneOf<{
                paymasterAndData: import("viem").Hex;
            } | {
                paymaster: import("viem").Address;
                paymasterData: import("viem").Hex;
                paymasterVerificationGasLimit: import("viem").Hex;
                paymasterPostOpGasLimit: import("viem").Hex;
            }> & {
                sponsor?: {
                    name: string;
                    icon?: string | undefined;
                } | undefined;
                isFinal?: boolean | undefined;
            };
        }, {
            Method: "pm_getPaymasterData";
            Parameters?: [userOperation: Pick<import("viem").RpcUserOperation<"0.6">, "callData" | "callGasLimit" | "initCode" | "maxFeePerGas" | "maxPriorityFeePerGas" | "nonce" | "sender" | "preVerificationGas" | "verificationGasLimit"> | Pick<import("viem").RpcUserOperation<"0.7">, "callData" | "callGasLimit" | "factory" | "factoryData" | "maxFeePerGas" | "maxPriorityFeePerGas" | "nonce" | "sender" | "preVerificationGas" | "verificationGasLimit">, entrypoint: import("viem").Address, chainId: import("viem").Hex, context: unknown];
            ReturnType: import("viem").OneOf<{
                paymasterAndData: import("viem").Hex;
            } | {
                paymaster: import("viem").Address;
                paymasterData: import("viem").Hex;
                paymasterVerificationGasLimit: import("viem").Hex;
                paymasterPostOpGasLimit: import("viem").Hex;
            }>;
        }]>;
        transport: ReturnType<config["_internal"]["transports"][chainId]>["config"] & ReturnType<config["_internal"]["transports"][chainId]>["value"];
        type: string;
        uid: string;
        extend: <const client extends {
            [x: string]: unknown;
            account?: undefined;
            batch?: undefined;
            cacheTime?: undefined;
            ccipRead?: undefined;
            chain?: undefined;
            key?: undefined;
            name?: undefined;
            pollingInterval?: undefined;
            request?: undefined;
            transport?: undefined;
            type?: undefined;
            uid?: undefined;
        } & import("viem").ExactPartial<Pick<import("viem").PublicActions<config["_internal"]["transports"][chainId], Extract<config["chains"][number], {
            id: chainId;
        }>, import("viem").Account>, "getChainId" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<Extract<config["chains"][number], {
            id: chainId;
        }>, import("viem").Account>, "sendTransaction" | "writeContract">>>(fn: (client: import("viem").Client<config["_internal"]["transports"][chainId], Extract<config["chains"][number], {
            id: chainId;
        }>, import("viem").Account, undefined, {
            [x: string]: unknown;
            account?: undefined;
            batch?: undefined;
            cacheTime?: undefined;
            ccipRead?: undefined;
            chain?: undefined;
            key?: undefined;
            name?: undefined;
            pollingInterval?: undefined;
            request?: undefined;
            transport?: undefined;
            type?: undefined;
            uid?: undefined;
        } | undefined>) => client) => import("viem").Client<config["_internal"]["transports"][chainId], Extract<config["chains"][number], {
            id: chainId;
        }>, import("viem").Account, undefined, { [K in keyof client]: client[K]; }>;
    }>;
    readonly queryKey: readonly ["connectorClient", {
        readonly connectorUid: string | undefined;
        readonly chainId?: config["chains"][number]["id"] | (config["chains"][number]["id"] extends infer T ? T extends config["chains"][number]["id"] ? T extends config["chains"][number]["id"] ? T : undefined : never : never) | undefined;
        readonly account?: import("viem").Address | import("viem").Account | null | undefined;
        readonly scopeKey?: string | undefined;
    }];
};
export type GetConnectorClientQueryFnData<config extends Config, chainId extends config['chains'][number]['id']> = GetConnectorClientReturnType<config, chainId>;
export type GetConnectorClientData<config extends Config, chainId extends config['chains'][number]['id']> = GetConnectorClientQueryFnData<config, chainId>;
export declare function getConnectorClientQueryKey<config extends Config, chainId extends config['chains'][number]['id']>(options?: GetConnectorClientOptions<config, chainId>): readonly ["connectorClient", {
    readonly connectorUid: string | undefined;
    readonly chainId?: config["chains"][number]["id"] | (chainId extends config["chains"][number]["id"] ? chainId : undefined) | undefined;
    readonly account?: import("viem").Address | import("viem").Account | null | undefined;
    readonly scopeKey?: string | undefined;
}];
export type GetConnectorClientQueryKey<config extends Config, chainId extends config['chains'][number]['id']> = ReturnType<typeof getConnectorClientQueryKey<config, chainId>>;
//# sourceMappingURL=getConnectorClient.d.ts.map
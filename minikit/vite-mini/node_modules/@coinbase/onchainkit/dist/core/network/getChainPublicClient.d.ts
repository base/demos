import { Chain } from 'viem/chains';
export declare function getChainPublicClient(chain: Chain): {
    account: undefined;
    batch?: {
        multicall?: boolean | import('viem').Prettify<import('viem').MulticallBatchOptions> | undefined;
    } | undefined;
    cacheTime: number;
    ccipRead?: false | {
        request?: (parameters: import('viem').CcipRequestParameters) => Promise<import('node_modules/viem/_types/utils/ccip').CcipRequestReturnType>;
    } | undefined;
    chain: Chain;
    experimental_blockTag?: import('viem').BlockTag | undefined;
    key: string;
    name: string;
    pollingInterval: number;
    request: import('viem').EIP1193RequestFn<import('viem').PublicRpcSchema>;
    transport: import('viem').TransportConfig<"http", import('viem').EIP1193RequestFn> & {
        fetchOptions?: import('viem').HttpTransportConfig["fetchOptions"] | undefined;
        url?: string | undefined;
    };
    type: string;
    uid: string;
    call: (parameters: import('viem').CallParameters<Chain>) => Promise<import('viem').CallReturnType>;
    createAccessList: (parameters: import('viem').CreateAccessListParameters<Chain>) => Promise<{
        accessList: import('viem').AccessList;
        gasUsed: bigint;
    }>;
    createBlockFilter: () => Promise<import('viem').CreateBlockFilterReturnType>;
    createContractEventFilter: <const abi extends import('viem').Abi | readonly unknown[], eventName extends import('viem').ContractEventName<abi> | undefined, args extends import('viem').MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined, toBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined>(args: import('viem').CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>) => Promise<import('viem').CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
    createEventFilter: <const abiEvent extends import('viem').AbiEvent | undefined = undefined, const abiEvents extends readonly import('viem').AbiEvent[] | readonly unknown[] | undefined = abiEvent extends import('viem').AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined, toBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined, _EventName extends string | undefined = import('viem').MaybeAbiEventName<abiEvent>, _Args extends import('viem').MaybeExtractEventArgsFromAbi<abiEvents, _EventName> | undefined = undefined>(args?: import('viem').CreateEventFilterParameters<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args> | undefined) => Promise<import('viem').CreateEventFilterReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args>>;
    createPendingTransactionFilter: () => Promise<import('viem').CreatePendingTransactionFilterReturnType>;
    estimateContractGas: <chain extends Chain | undefined, const abi extends import('viem').Abi | readonly unknown[], functionName extends import('viem').ContractFunctionName<abi, "nonpayable" | "payable">, args extends import('viem').ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: import('viem').EstimateContractGasParameters<abi, functionName, args, chain>) => Promise<import('viem').EstimateContractGasReturnType>;
    estimateGas: (args: import('viem').EstimateGasParameters<Chain>) => Promise<import('viem').EstimateGasReturnType>;
    getBalance: (args: import('viem').GetBalanceParameters) => Promise<import('viem').GetBalanceReturnType>;
    getBlobBaseFee: () => Promise<import('viem').GetBlobBaseFeeReturnType>;
    getBlock: <includeTransactions extends boolean = false, blockTag extends import('viem').BlockTag = "latest">(args?: import('viem').GetBlockParameters<includeTransactions, blockTag> | undefined) => Promise<{
        number: blockTag extends "pending" ? null : bigint;
        hash: blockTag extends "pending" ? null : `0x${string}`;
        nonce: blockTag extends "pending" ? null : `0x${string}`;
        logsBloom: blockTag extends "pending" ? null : `0x${string}`;
        baseFeePerGas: bigint | null;
        blobGasUsed: bigint;
        difficulty: bigint;
        excessBlobGas: bigint;
        extraData: import('viem').Hex;
        gasLimit: bigint;
        gasUsed: bigint;
        miner: import('viem').Address;
        mixHash: import('viem').Hash;
        parentBeaconBlockRoot?: `0x${string}` | undefined;
        parentHash: import('viem').Hash;
        receiptsRoot: import('viem').Hex;
        sealFields: import('viem').Hex[];
        sha3Uncles: import('viem').Hash;
        size: bigint;
        stateRoot: import('viem').Hash;
        timestamp: bigint;
        totalDifficulty: bigint | null;
        transactionsRoot: import('viem').Hash;
        uncles: import('viem').Hash[];
        withdrawals?: import('viem').Withdrawal[] | undefined | undefined;
        withdrawalsRoot?: `0x${string}` | undefined;
        transactions: includeTransactions extends true ? ({
            chainId?: number | undefined;
            yParity?: undefined | undefined;
            from: import('viem').Address;
            gas: bigint;
            hash: import('viem').Hash;
            input: import('viem').Hex;
            nonce: number;
            r: import('viem').Hex;
            s: import('viem').Hex;
            to: import('viem').Address | null;
            typeHex: import('viem').Hex | null;
            v: bigint;
            value: bigint;
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            type: "legacy";
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
        } | {
            chainId: number;
            yParity: number;
            from: import('viem').Address;
            gas: bigint;
            hash: import('viem').Hash;
            input: import('viem').Hex;
            nonce: number;
            r: import('viem').Hex;
            s: import('viem').Hex;
            to: import('viem').Address | null;
            typeHex: import('viem').Hex | null;
            v: bigint;
            value: bigint;
            accessList: import('viem').AccessList;
            authorizationList?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            type: "eip2930";
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
        } | {
            chainId: number;
            yParity: number;
            from: import('viem').Address;
            gas: bigint;
            hash: import('viem').Hash;
            input: import('viem').Hex;
            nonce: number;
            r: import('viem').Hex;
            s: import('viem').Hex;
            to: import('viem').Address | null;
            typeHex: import('viem').Hex | null;
            v: bigint;
            value: bigint;
            accessList: import('viem').AccessList;
            authorizationList?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            type: "eip1559";
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
        } | {
            chainId: number;
            yParity: number;
            from: import('viem').Address;
            gas: bigint;
            hash: import('viem').Hash;
            input: import('viem').Hex;
            nonce: number;
            r: import('viem').Hex;
            s: import('viem').Hex;
            to: import('viem').Address | null;
            typeHex: import('viem').Hex | null;
            v: bigint;
            value: bigint;
            accessList: import('viem').AccessList;
            authorizationList?: undefined | undefined;
            blobVersionedHashes: readonly import('viem').Hex[];
            type: "eip4844";
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas: bigint;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
        } | {
            chainId: number;
            yParity: number;
            from: import('viem').Address;
            gas: bigint;
            hash: import('viem').Hash;
            input: import('viem').Hex;
            nonce: number;
            r: import('viem').Hex;
            s: import('viem').Hex;
            to: import('viem').Address | null;
            typeHex: import('viem').Hex | null;
            v: bigint;
            value: bigint;
            accessList: import('viem').AccessList;
            authorizationList: import('viem').SignedAuthorizationList;
            blobVersionedHashes?: undefined | undefined;
            type: "eip7702";
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
        })[] : `0x${string}`[];
    }>;
    getBlockNumber: (args?: import('viem').GetBlockNumberParameters | undefined) => Promise<import('viem').GetBlockNumberReturnType>;
    getBlockTransactionCount: (args?: import('viem').GetBlockTransactionCountParameters | undefined) => Promise<import('viem').GetBlockTransactionCountReturnType>;
    getBytecode: (args: import('viem').GetBytecodeParameters) => Promise<import('viem').GetBytecodeReturnType>;
    getChainId: () => Promise<import('viem').GetChainIdReturnType>;
    getCode: (args: import('viem').GetBytecodeParameters) => Promise<import('viem').GetBytecodeReturnType>;
    getContractEvents: <const abi extends import('viem').Abi | readonly unknown[], eventName extends import('viem').ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined, toBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined>(args: import('viem').GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<import('viem').GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getEip712Domain: (args: import('viem').GetEip712DomainParameters) => Promise<import('viem').GetEip712DomainReturnType>;
    getEnsAddress: (args: import('viem').GetEnsAddressParameters) => Promise<import('viem').GetEnsAddressReturnType>;
    getEnsAvatar: (args: import('viem').GetEnsAvatarParameters) => Promise<import('viem').GetEnsAvatarReturnType>;
    getEnsName: (args: import('viem').GetEnsNameParameters) => Promise<import('viem').GetEnsNameReturnType>;
    getEnsResolver: (args: import('viem').GetEnsResolverParameters) => Promise<import('viem').GetEnsResolverReturnType>;
    getEnsText: (args: import('viem').GetEnsTextParameters) => Promise<import('viem').GetEnsTextReturnType>;
    getFeeHistory: (args: import('viem').GetFeeHistoryParameters) => Promise<import('viem').GetFeeHistoryReturnType>;
    estimateFeesPerGas: <chainOverride extends Chain | undefined = undefined, type extends import('viem').FeeValuesType = "eip1559">(args?: import('viem').EstimateFeesPerGasParameters<Chain, chainOverride, type> | undefined) => Promise<import('viem').EstimateFeesPerGasReturnType<type>>;
    getFilterChanges: <filterType extends import('viem').FilterType, const abi extends import('viem').Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined, toBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined>(args: import('viem').GetFilterChangesParameters<filterType, abi, eventName, strict, fromBlock, toBlock>) => Promise<import('viem').GetFilterChangesReturnType<filterType, abi, eventName, strict, fromBlock, toBlock>>;
    getFilterLogs: <const abi extends import('viem').Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined, toBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined>(args: import('viem').GetFilterLogsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<import('viem').GetFilterLogsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getGasPrice: () => Promise<import('viem').GetGasPriceReturnType>;
    getLogs: <const abiEvent extends import('viem').AbiEvent | undefined = undefined, const abiEvents extends readonly import('viem').AbiEvent[] | readonly unknown[] | undefined = abiEvent extends import('viem').AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined, toBlock extends import('viem').BlockNumber | import('viem').BlockTag | undefined = undefined>(args?: import('viem').GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> | undefined) => Promise<import('viem').GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
    getProof: (args: import('viem').GetProofParameters) => Promise<import('viem').GetProofReturnType>;
    estimateMaxPriorityFeePerGas: <chainOverride extends Chain | undefined = undefined>(args?: {
        chain?: chainOverride | null | undefined;
    } | undefined) => Promise<import('viem').EstimateMaxPriorityFeePerGasReturnType>;
    getStorageAt: (args: import('viem').GetStorageAtParameters) => Promise<import('viem').GetStorageAtReturnType>;
    getTransaction: <blockTag extends import('viem').BlockTag = "latest">(args: import('viem').GetTransactionParameters<blockTag>) => Promise<{
        chainId?: number | undefined;
        yParity?: undefined | undefined;
        from: import('viem').Address;
        gas: bigint;
        hash: import('viem').Hash;
        input: import('viem').Hex;
        nonce: number;
        r: import('viem').Hex;
        s: import('viem').Hex;
        to: import('viem').Address | null;
        typeHex: import('viem').Hex | null;
        v: bigint;
        value: bigint;
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        type: "legacy";
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : `0x${string}` : never : never;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : bigint : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
    } | {
        chainId: number;
        yParity: number;
        from: import('viem').Address;
        gas: bigint;
        hash: import('viem').Hash;
        input: import('viem').Hex;
        nonce: number;
        r: import('viem').Hex;
        s: import('viem').Hex;
        to: import('viem').Address | null;
        typeHex: import('viem').Hex | null;
        v: bigint;
        value: bigint;
        accessList: import('viem').AccessList;
        authorizationList?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        type: "eip2930";
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : `0x${string}` : never : never;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : bigint : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
    } | {
        chainId: number;
        yParity: number;
        from: import('viem').Address;
        gas: bigint;
        hash: import('viem').Hash;
        input: import('viem').Hex;
        nonce: number;
        r: import('viem').Hex;
        s: import('viem').Hex;
        to: import('viem').Address | null;
        typeHex: import('viem').Hex | null;
        v: bigint;
        value: bigint;
        accessList: import('viem').AccessList;
        authorizationList?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        type: "eip1559";
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : `0x${string}` : never : never;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : bigint : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
    } | {
        chainId: number;
        yParity: number;
        from: import('viem').Address;
        gas: bigint;
        hash: import('viem').Hash;
        input: import('viem').Hex;
        nonce: number;
        r: import('viem').Hex;
        s: import('viem').Hex;
        to: import('viem').Address | null;
        typeHex: import('viem').Hex | null;
        v: bigint;
        value: bigint;
        accessList: import('viem').AccessList;
        authorizationList?: undefined | undefined;
        blobVersionedHashes: readonly import('viem').Hex[];
        type: "eip4844";
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas: bigint;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : `0x${string}` : never : never;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : bigint : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
    } | {
        chainId: number;
        yParity: number;
        from: import('viem').Address;
        gas: bigint;
        hash: import('viem').Hash;
        input: import('viem').Hex;
        nonce: number;
        r: import('viem').Hex;
        s: import('viem').Hex;
        to: import('viem').Address | null;
        typeHex: import('viem').Hex | null;
        v: bigint;
        value: bigint;
        accessList: import('viem').AccessList;
        authorizationList: import('viem').SignedAuthorizationList;
        blobVersionedHashes?: undefined | undefined;
        type: "eip7702";
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : `0x${string}` : never : never;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : bigint : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
    }>;
    getTransactionConfirmations: (args: import('viem').GetTransactionConfirmationsParameters<Chain>) => Promise<import('viem').GetTransactionConfirmationsReturnType>;
    getTransactionCount: (args: import('viem').GetTransactionCountParameters) => Promise<import('viem').GetTransactionCountReturnType>;
    getTransactionReceipt: (args: import('viem').GetTransactionReceiptParameters) => Promise<import('viem').TransactionReceipt>;
    multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: import('viem').MulticallParameters<contracts, allowFailure>) => Promise<import('viem').MulticallReturnType<contracts, allowFailure>>;
    prepareTransactionRequest: <const request extends import('viem').PrepareTransactionRequestRequest<Chain, chainOverride>, chainOverride extends Chain | undefined = undefined, accountOverride extends import('viem').Account | import('viem').Address | undefined = undefined>(args: import('viem').PrepareTransactionRequestParameters<Chain, import('viem').Account | undefined, chainOverride, accountOverride, request>) => Promise<import('viem').UnionRequiredBy<Extract<import('viem').UnionOmit<import('viem').ExtractChainFormatterParameters<import('viem').DeriveChain<Chain, chainOverride>, "transactionRequest", import('viem').TransactionRequest>, "from"> & (import('viem').DeriveChain<Chain, chainOverride> extends infer T_14 ? T_14 extends import('viem').DeriveChain<Chain, chainOverride> ? T_14 extends Chain ? {
        chain: T_14;
    } : {
        chain?: undefined;
    } : never : never) & (import('viem').DeriveAccount<import('viem').Account | undefined, accountOverride> extends infer T_15 ? T_15 extends import('viem').DeriveAccount<import('viem').Account | undefined, accountOverride> ? T_15 extends import('viem').Account ? {
        account: T_15;
        from: import('viem').Address;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import('viem').IsNever<((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_16 ? T_16 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_16 extends "legacy" ? import('viem').TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_17 ? T_17 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_17 extends "eip1559" ? import('viem').TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_18 ? T_18 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_18 extends "eip2930" ? import('viem').TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_19 ? T_19 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_19 extends "eip4844" ? import('viem').TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_20 ? T_20 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_20 extends "eip7702" ? import('viem').TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : import('viem').ExactPartial<((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_21 ? T_21 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_21 extends "legacy" ? import('viem').TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_22 ? T_22 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_22 extends "eip1559" ? import('viem').TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_23 ? T_23 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_23 extends "eip2930" ? import('viem').TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_24 ? T_24 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_24 extends "eip4844" ? import('viem').TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_25 ? T_25 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_25 extends "eip7702" ? import('viem').TransactionRequestEIP7702 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (request["parameters"] extends readonly import('viem').PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "chainId" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "type") extends infer T_26 ? T_26 extends (request["parameters"] extends readonly import('viem').PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "chainId" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "type") ? T_26 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_26 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">) extends infer T ? { [K in keyof T]: (import('viem').UnionRequiredBy<Extract<import('viem').UnionOmit<import('viem').ExtractChainFormatterParameters<import('viem').DeriveChain<Chain, chainOverride>, "transactionRequest", import('viem').TransactionRequest>, "from"> & (import('viem').DeriveChain<Chain, chainOverride> extends infer T_1 ? T_1 extends import('viem').DeriveChain<Chain, chainOverride> ? T_1 extends Chain ? {
        chain: T_1;
    } : {
        chain?: undefined;
    } : never : never) & (import('viem').DeriveAccount<import('viem').Account | undefined, accountOverride> extends infer T_2 ? T_2 extends import('viem').DeriveAccount<import('viem').Account | undefined, accountOverride> ? T_2 extends import('viem').Account ? {
        account: T_2;
        from: import('viem').Address;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import('viem').IsNever<((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_3 ? T_3 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_3 extends "legacy" ? import('viem').TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_4 ? T_4 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_4 extends "eip1559" ? import('viem').TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_5 ? T_5 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_5 extends "eip2930" ? import('viem').TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_6 ? T_6 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_6 extends "eip4844" ? import('viem').TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_7 ? T_7 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_7 extends "eip7702" ? import('viem').TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : import('viem').ExactPartial<((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_8 ? T_8 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_8 extends "legacy" ? import('viem').TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_9 ? T_9 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_9 extends "eip1559" ? import('viem').TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_10 ? T_10 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_10 extends "eip2930" ? import('viem').TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_11 ? T_11 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_11 extends "eip4844" ? import('viem').TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_12 ? T_12 extends (request["type"] extends string | undefined ? request["type"] : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import('viem').GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & import('viem').FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (import('viem').OneOf<{
        maxFeePerGas: import('viem').FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: import('viem').FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, import('viem').FeeValuesEIP1559> & {
        accessList?: import('viem').TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: import('viem').TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly import('viem').ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import('viem').BlobSidecar<`0x${string}`>[] | undefined;
    }) & (import('viem').ExactPartial<import('viem').FeeValuesEIP4844> & import('viem').OneOf<{
        blobs: import('viem').TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: import('viem').TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: import('viem').TransactionSerializableEIP4844["sidecars"];
    }, import('viem').TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: import('viem').AccessList | undefined;
        authorizationList?: import('viem').SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: import('viem').TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_12 extends "eip7702" ? import('viem').TransactionRequestEIP7702 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (request["parameters"] extends readonly import('viem').PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "chainId" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "type") extends infer T_13 ? T_13 extends (request["parameters"] extends readonly import('viem').PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "chainId" | "fees" | "gas" | "nonce" | "blobVersionedHashes" | "type") ? T_13 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_13 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">))[K]; } : never>;
    readContract: <const abi extends import('viem').Abi | readonly unknown[], functionName extends import('viem').ContractFunctionName<abi, "pure" | "view">, const args extends import('viem').ContractFunctionArgs<abi, "pure" | "view", functionName>>(args: import('viem').ReadContractParameters<abi, functionName, args>) => Promise<import('viem').ReadContractReturnType<abi, functionName, args>>;
    sendRawTransaction: (args: import('viem').SendRawTransactionParameters) => Promise<import('viem').SendRawTransactionReturnType>;
    simulate: <const calls extends readonly unknown[]>(args: import('viem').SimulateBlocksParameters<calls>) => Promise<import('viem').SimulateBlocksReturnType<calls>>;
    simulateBlocks: <const calls extends readonly unknown[]>(args: import('viem').SimulateBlocksParameters<calls>) => Promise<import('viem').SimulateBlocksReturnType<calls>>;
    simulateCalls: <const calls extends readonly unknown[]>(args: import('viem').SimulateCallsParameters<calls>) => Promise<import('viem').SimulateCallsReturnType<calls>>;
    simulateContract: <const abi extends import('viem').Abi | readonly unknown[], functionName extends import('viem').ContractFunctionName<abi, "nonpayable" | "payable">, const args_1 extends import('viem').ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainOverride extends Chain | undefined, accountOverride extends import('viem').Account | import('viem').Address | undefined = undefined>(args: import('viem').SimulateContractParameters<abi, functionName, args_1, Chain, chainOverride, accountOverride>) => Promise<import('viem').SimulateContractReturnType<abi, functionName, args_1, Chain, import('viem').Account | undefined, chainOverride, accountOverride>>;
    verifyMessage: (args: import('viem').VerifyMessageActionParameters) => Promise<import('viem').VerifyMessageActionReturnType>;
    verifySiweMessage: (args: import('node_modules/viem/_types/actions/siwe/verifySiweMessage').VerifySiweMessageParameters) => Promise<import('node_modules/viem/_types/actions/siwe/verifySiweMessage').VerifySiweMessageReturnType>;
    verifyTypedData: (args: import('viem').VerifyTypedDataActionParameters) => Promise<import('viem').VerifyTypedDataActionReturnType>;
    uninstallFilter: (args: import('viem').UninstallFilterParameters) => Promise<import('viem').UninstallFilterReturnType>;
    waitForTransactionReceipt: (args: import('viem').WaitForTransactionReceiptParameters<Chain>) => Promise<import('viem').TransactionReceipt>;
    watchBlockNumber: (args: import('viem').WatchBlockNumberParameters) => import('viem').WatchBlockNumberReturnType;
    watchBlocks: <includeTransactions extends boolean = false, blockTag extends import('viem').BlockTag = "latest">(args: import('viem').WatchBlocksParameters<import('viem').HttpTransport<undefined, false>, Chain, includeTransactions, blockTag>) => import('viem').WatchBlocksReturnType;
    watchContractEvent: <const abi extends import('viem').Abi | readonly unknown[], eventName extends import('viem').ContractEventName<abi>, strict extends boolean | undefined = undefined>(args: import('viem').WatchContractEventParameters<abi, eventName, strict, import('viem').HttpTransport<undefined, false>>) => import('viem').WatchContractEventReturnType;
    watchEvent: <const abiEvent extends import('viem').AbiEvent | undefined = undefined, const abiEvents extends readonly import('viem').AbiEvent[] | readonly unknown[] | undefined = abiEvent extends import('viem').AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined>(args: import('viem').WatchEventParameters<abiEvent, abiEvents, strict, import('viem').HttpTransport<undefined, false>>) => import('viem').WatchEventReturnType;
    watchPendingTransactions: (args: import('viem').WatchPendingTransactionsParameters<import('viem').HttpTransport<undefined, false>>) => import('viem').WatchPendingTransactionsReturnType;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        experimental_blockTag?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & import('viem').ExactPartial<Pick<import('viem').PublicActions<import('viem').HttpTransport<undefined, false>, Chain, undefined>, "getChainId" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import('viem').WalletActions<Chain, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: import('viem').Client<import('viem').HttpTransport<undefined, false>, Chain, undefined, import('viem').PublicRpcSchema, import('viem').PublicActions<import('viem').HttpTransport<undefined, false>, Chain>>) => client) => import('viem').Client<import('viem').HttpTransport<undefined, false>, Chain, undefined, import('viem').PublicRpcSchema, { [K in keyof client]: client[K]; } & import('viem').PublicActions<import('viem').HttpTransport<undefined, false>, Chain>>;
};
//# sourceMappingURL=getChainPublicClient.d.ts.map
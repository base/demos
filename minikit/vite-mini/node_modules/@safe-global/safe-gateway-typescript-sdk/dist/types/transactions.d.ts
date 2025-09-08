import type { AddressEx, Page, TokenInfo } from './common';
import type { NativeStakingDepositConfirmationView, NativeStakingValidatorsExitConfirmationView, NativeStakingWithdrawConfirmationView } from './decoded-data';
import type { RichDecodedInfo } from './human-description';
export type ParamValue = string | ParamValue[];
export declare enum Operation {
    CALL = 0,
    DELEGATE = 1
}
export type InternalTransaction = {
    operation: Operation;
    to: string;
    value?: string;
    data: string | null;
    dataDecoded?: DataDecoded;
};
export type ValueDecodedType = InternalTransaction[];
export type Parameter = {
    name: string;
    type: string;
    value: ParamValue;
    valueDecoded?: ValueDecodedType;
};
export type DataDecoded = {
    method: string;
    parameters?: Parameter[];
};
export declare enum TransactionStatus {
    AWAITING_CONFIRMATIONS = "AWAITING_CONFIRMATIONS",
    AWAITING_EXECUTION = "AWAITING_EXECUTION",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    SUCCESS = "SUCCESS"
}
export declare enum TransferDirection {
    INCOMING = "INCOMING",
    OUTGOING = "OUTGOING",
    UNKNOWN = "UNKNOWN"
}
export declare enum TransactionTokenType {
    ERC20 = "ERC20",
    ERC721 = "ERC721",
    NATIVE_COIN = "NATIVE_COIN"
}
export declare enum SettingsInfoType {
    SET_FALLBACK_HANDLER = "SET_FALLBACK_HANDLER",
    ADD_OWNER = "ADD_OWNER",
    REMOVE_OWNER = "REMOVE_OWNER",
    SWAP_OWNER = "SWAP_OWNER",
    CHANGE_THRESHOLD = "CHANGE_THRESHOLD",
    CHANGE_IMPLEMENTATION = "CHANGE_IMPLEMENTATION",
    ENABLE_MODULE = "ENABLE_MODULE",
    DISABLE_MODULE = "DISABLE_MODULE",
    SET_GUARD = "SET_GUARD",
    DELETE_GUARD = "DELETE_GUARD"
}
export declare enum TransactionInfoType {
    TRANSFER = "Transfer",
    SETTINGS_CHANGE = "SettingsChange",
    CUSTOM = "Custom",
    CREATION = "Creation",
    SWAP_ORDER = "SwapOrder",
    TWAP_ORDER = "TwapOrder",
    SWAP_TRANSFER = "SwapTransfer",
    NATIVE_STAKING_DEPOSIT = "NativeStakingDeposit",
    NATIVE_STAKING_VALIDATORS_EXIT = "NativeStakingValidatorsExit",
    NATIVE_STAKING_WITHDRAW = "NativeStakingWithdraw"
}
export declare enum ConflictType {
    NONE = "None",
    HAS_NEXT = "HasNext",
    END = "End"
}
export declare enum TransactionListItemType {
    TRANSACTION = "TRANSACTION",
    LABEL = "LABEL",
    CONFLICT_HEADER = "CONFLICT_HEADER",
    DATE_LABEL = "DATE_LABEL"
}
export declare enum DetailedExecutionInfoType {
    MULTISIG = "MULTISIG",
    MODULE = "MODULE"
}
export type Erc20Transfer = {
    type: TransactionTokenType.ERC20;
    tokenAddress: string;
    tokenName?: string;
    tokenSymbol?: string;
    logoUri?: string;
    decimals?: number;
    value: string;
    trusted: boolean | null;
    imitation: boolean;
};
export type Erc721Transfer = {
    type: TransactionTokenType.ERC721;
    tokenAddress: string;
    tokenId: string;
    tokenName?: string;
    tokenSymbol?: string;
    logoUri?: string;
};
export type NativeCoinTransfer = {
    type: TransactionTokenType.NATIVE_COIN;
    value: string;
};
export type TransferInfo = Erc20Transfer | Erc721Transfer | NativeCoinTransfer;
export type Transfer = {
    type: TransactionInfoType.TRANSFER;
    sender: AddressEx;
    recipient: AddressEx;
    direction: TransferDirection;
    transferInfo: TransferInfo;
    humanDescription?: string;
    richDecodedInfo?: RichDecodedInfo;
};
export type SetFallbackHandler = {
    type: SettingsInfoType.SET_FALLBACK_HANDLER;
    handler: AddressEx;
};
export type AddOwner = {
    type: SettingsInfoType.ADD_OWNER;
    owner: AddressEx;
    threshold: number;
};
export type RemoveOwner = {
    type: SettingsInfoType.REMOVE_OWNER;
    owner: AddressEx;
    threshold: number;
};
export type SwapOwner = {
    type: SettingsInfoType.SWAP_OWNER;
    oldOwner: AddressEx;
    newOwner: AddressEx;
};
export type ChangeThreshold = {
    type: SettingsInfoType.CHANGE_THRESHOLD;
    threshold: number;
};
export type ChangeImplementation = {
    type: SettingsInfoType.CHANGE_IMPLEMENTATION;
    implementation: AddressEx;
};
export type EnableModule = {
    type: SettingsInfoType.ENABLE_MODULE;
    module: AddressEx;
};
export type DisableModule = {
    type: SettingsInfoType.DISABLE_MODULE;
    module: AddressEx;
};
export type SetGuard = {
    type: SettingsInfoType.SET_GUARD;
    guard: AddressEx;
};
export type DeleteGuard = {
    type: SettingsInfoType.DELETE_GUARD;
};
export type SettingsInfo = SetFallbackHandler | AddOwner | RemoveOwner | SwapOwner | ChangeThreshold | ChangeImplementation | EnableModule | DisableModule | SetGuard | DeleteGuard;
export type SettingsChange = {
    type: TransactionInfoType.SETTINGS_CHANGE;
    dataDecoded: DataDecoded;
    settingsInfo?: SettingsInfo;
    humanDescription?: string;
    richDecodedInfo?: RichDecodedInfo;
};
export type Custom = {
    type: TransactionInfoType.CUSTOM;
    to: AddressEx;
    dataSize: string;
    value: string;
    methodName?: string;
    actionCount?: number;
    isCancellation: boolean;
    humanDescription?: string;
    richDecodedInfo?: RichDecodedInfo;
};
export type MultiSend = {
    type: TransactionInfoType.CUSTOM;
    to: AddressEx;
    dataSize: string;
    value: string;
    methodName: 'multiSend';
    actionCount: number;
    isCancellation: boolean;
    humanDescription?: string;
    richDecodedInfo?: RichDecodedInfo;
};
export type Cancellation = Custom & {
    isCancellation: true;
};
export type Creation = {
    type: TransactionInfoType.CREATION;
    creator: AddressEx;
    transactionHash: string;
    implementation?: AddressEx;
    factory?: AddressEx;
    humanDescription?: string;
    richDecodedInfo?: RichDecodedInfo;
};
export type OrderStatuses = 'presignaturePending' | 'open' | 'fulfilled' | 'cancelled' | 'expired';
export type OrderKind = 'sell' | 'buy';
export type OrderToken = {
    /** @description The token address */
    address: string;
    /** @description The token decimals */
    decimals: number;
    /** @description The logo URI for the token */
    logoUri?: string | null;
    /** @description The token name */
    name: string;
    /** @description The token symbol */
    symbol: string;
    /** @description The token trusted status */
    trusted: boolean;
};
export type OrderClass = 'limit' | 'market' | 'liquidity';
export type BaseOrder = {
    humanDescription?: string | null;
    richDecodedInfo?: null | RichDecodedInfo;
    status: OrderStatuses;
    kind: OrderKind;
    orderClass: OrderClass;
    /** @description The timestamp when the order expires */
    validUntil: number;
    /** @description The sell token raw amount (no decimals) */
    sellAmount: string;
    /** @description The buy token raw amount (no decimals) */
    buyAmount: string;
    /** @description The executed sell token raw amount (no decimals) */
    executedSellAmount: string;
    /** @description The executed buy token raw amount (no decimals) */
    executedBuyAmount: string;
    sellToken: OrderToken;
    buyToken: OrderToken;
    /** @description The URL to the explorer page of the order */
    explorerUrl: string;
    /**
     * @deprecated Use `executedFee` instead
     * @description The amount of fees paid for this order.
     */
    executedSurplusFee: string | null;
    /** @description The amount of fees paid for this order */
    executedFee: string | null;
    /** @description The token in which the fee was paid, expressed by SURPLUS tokens (BUY tokens for SELL orders and SELL tokens for BUY orders). */
    executedFeeToken: OrderToken;
    /** @description The (optional) address to receive the proceeds of the trade */
    receiver?: string | null;
    owner: string;
    /** @description The App Data for this order */
    fullAppData?: Record<string, unknown> | null;
};
export declare enum DurationType {
    AUTO = "AUTO",
    LIMIT_DURATION = "LIMIT_DURATION"
}
export declare enum StartTimeValue {
    AT_MINING_TIME = "AT_MINING_TIME",
    AT_EPOCH = "AT_EPOCH"
}
type DurationOfPart = {
    durationType: DurationType.AUTO;
} | {
    durationType: DurationType.LIMIT_DURATION;
    duration: number;
};
type StartTime = {
    startType: StartTimeValue.AT_MINING_TIME;
} | {
    startType: StartTimeValue.AT_EPOCH;
    epoch: number;
};
export type SwapOrder = BaseOrder & {
    type: TransactionInfoType.SWAP_ORDER;
    uid: string;
};
export type SwapTransferOrder = Omit<Transfer, 'type'> & BaseOrder & {
    type: TransactionInfoType.SWAP_TRANSFER;
    uid: string;
};
export type TwapOrder = Omit<BaseOrder, 'executedBuyAmount' | 'executedSellAmount'> & {
    type: TransactionInfoType.TWAP_ORDER;
    /** @description The executed sell token raw amount (no decimals) */
    executedSellAmount: null | string;
    /** @description The executed buy token raw amount (no decimals) */
    executedBuyAmount: null | string;
    /** @description The number of parts the order is split into */
    numberOfParts: string;
    /** @description The amount of sellToken to sell in each part */
    partSellAmount: string;
    /** @description The amount of buyToken that must be bought in each part */
    minPartLimit: string;
    /** @description The duration of the TWAP interval */
    timeBetweenParts: number;
    /** @description Whether the TWAP is valid for the entire interval or not */
    durationOfPart: DurationOfPart;
    /** @description The start time of the TWAP */
    startTime: StartTime;
};
export type Order = SwapOrder | SwapTransferOrder | TwapOrder;
export type StakingTxDepositInfo = {
    type: TransactionInfoType.NATIVE_STAKING_DEPOSIT;
    humanDescription?: string;
} & Omit<NativeStakingDepositConfirmationView, 'type'>;
export type StakingTxExitInfo = {
    type: TransactionInfoType.NATIVE_STAKING_VALIDATORS_EXIT;
    humanDescription?: string;
} & Omit<NativeStakingValidatorsExitConfirmationView, 'type'>;
export type StakingTxWithdrawInfo = {
    type: TransactionInfoType.NATIVE_STAKING_WITHDRAW;
    humanDescription?: string;
} & Omit<NativeStakingWithdrawConfirmationView, 'type'>;
export type StakingTxInfo = StakingTxDepositInfo | StakingTxExitInfo | StakingTxWithdrawInfo;
export type TransactionInfo = Transfer | SettingsChange | Custom | MultiSend | Cancellation | Creation | Order | StakingTxInfo;
export type ModuleExecutionInfo = {
    type: DetailedExecutionInfoType.MODULE;
    address: AddressEx;
};
export type MultisigExecutionInfo = {
    type: DetailedExecutionInfoType.MULTISIG;
    nonce: number;
    confirmationsRequired: number;
    confirmationsSubmitted: number;
    missingSigners?: AddressEx[];
};
export type ExecutionInfo = ModuleExecutionInfo | MultisigExecutionInfo;
export type TransactionSummary = {
    id: string;
    timestamp: number;
    txStatus: TransactionStatus;
    txInfo: TransactionInfo;
    txHash: string | null;
    executionInfo?: ExecutionInfo;
    safeAppInfo?: SafeAppInfo;
};
export type Transaction = {
    transaction: TransactionSummary;
    conflictType: ConflictType;
    type: TransactionListItemType.TRANSACTION;
};
export type IncomingTransfer = Omit<Transaction, 'transaction'> & {
    transaction: Omit<TransactionSummary, 'txInfo' | 'executionInfo'> & {
        txInfo: Omit<Transfer, 'direction'> & {
            direction: TransferDirection.INCOMING;
        };
    };
};
export type ModuleTransaction = Omit<Transaction, 'transaction'> & {
    transaction: Omit<TransactionSummary, 'txInfo' | 'executionInfo'> & {
        txInfo: Transfer;
        executionInfo?: ModuleExecutionInfo;
    };
};
export type MultisigTransaction = Omit<Transaction, 'transaction'> & {
    transaction: Omit<TransactionSummary, 'txInfo' | 'executionInfo'> & {
        txInfo: Omit<Transfer, 'direction'> & {
            direction: TransferDirection.OUTGOING;
        };
        executionInfo?: MultisigExecutionInfo;
    };
};
export type DateLabel = {
    timestamp: number;
    type: TransactionListItemType.DATE_LABEL;
};
export declare enum LabelValue {
    Queued = "Queued",
    Next = "Next"
}
export type Label = {
    label: LabelValue;
    type: TransactionListItemType.LABEL;
};
export type ConflictHeader = {
    nonce: number;
    type: TransactionListItemType.CONFLICT_HEADER;
};
export type TransactionListItem = Transaction | DateLabel | Label | ConflictHeader;
export type TransactionListPage = Page<TransactionListItem>;
export type MultisigTransactionRequest = {
    to: string;
    value: string;
    data?: string;
    nonce: string;
    operation: Operation;
    safeTxGas: string;
    baseGas: string;
    gasPrice: string;
    gasToken: string;
    refundReceiver?: string;
    safeTxHash: string;
    sender: string;
    signature?: string;
    origin?: string;
};
export type SafeAppInfo = {
    name: string;
    url: string;
    logoUri: string;
};
export type TransactionData = {
    hexData?: string;
    dataDecoded?: DataDecoded;
    to: AddressEx;
    value?: string;
    operation: Operation;
    addressInfoIndex?: {
        [key: string]: AddressEx;
    };
    trustedDelegateCallTarget: boolean;
};
export type ModuleExecutionDetails = {
    type: DetailedExecutionInfoType.MODULE;
    address: AddressEx;
};
export type MultisigConfirmation = {
    signer: AddressEx;
    signature?: string;
    submittedAt: number;
};
export type MultisigExecutionDetails = {
    type: DetailedExecutionInfoType.MULTISIG;
    submittedAt: number;
    nonce: number;
    safeTxGas: string;
    baseGas: string;
    gasPrice: string;
    gasToken: string;
    refundReceiver: AddressEx;
    safeTxHash: string;
    executor?: AddressEx;
    signers: AddressEx[];
    confirmationsRequired: number;
    confirmations: MultisigConfirmation[];
    rejectors?: AddressEx[];
    gasTokenInfo?: TokenInfo;
    trusted: boolean;
    proposer: AddressEx | null;
    proposedByDelegate: AddressEx | null;
};
export type DetailedExecutionInfo = ModuleExecutionDetails | MultisigExecutionDetails;
export type TransactionDetails = {
    safeAddress: string;
    txId: string;
    executedAt?: number;
    txStatus: TransactionStatus;
    txInfo: TransactionInfo;
    txData?: TransactionData;
    detailedExecutionInfo?: DetailedExecutionInfo;
    txHash?: string;
    safeAppInfo?: SafeAppInfo;
    note?: string | null;
};
export type TransactionPreview = {
    txInfo: TransactionInfo;
    txData: TransactionData;
};
export type SafeTransactionEstimationRequest = {
    to: string;
    value: string;
    data: string;
    operation: Operation;
};
export type SafeTransactionEstimation = {
    currentNonce: number;
    recommendedNonce: number;
    safeTxGas: string;
};
export type NoncesResponse = {
    currentNonce: number;
    recommendedNonce: number;
};
export type SafeIncomingTransfersResponse = Page<IncomingTransfer>;
export type SafeModuleTransactionsResponse = Page<ModuleTransaction>;
export type SafeMultisigTransactionsResponse = Page<MultisigTransaction>;
export {};

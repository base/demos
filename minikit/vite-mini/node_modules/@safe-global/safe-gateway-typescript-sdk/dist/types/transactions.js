"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelValue = exports.StartTimeValue = exports.DurationType = exports.DetailedExecutionInfoType = exports.TransactionListItemType = exports.ConflictType = exports.TransactionInfoType = exports.SettingsInfoType = exports.TransactionTokenType = exports.TransferDirection = exports.TransactionStatus = exports.Operation = void 0;
var Operation;
(function (Operation) {
    Operation[Operation["CALL"] = 0] = "CALL";
    Operation[Operation["DELEGATE"] = 1] = "DELEGATE";
})(Operation || (exports.Operation = Operation = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["AWAITING_CONFIRMATIONS"] = "AWAITING_CONFIRMATIONS";
    TransactionStatus["AWAITING_EXECUTION"] = "AWAITING_EXECUTION";
    TransactionStatus["CANCELLED"] = "CANCELLED";
    TransactionStatus["FAILED"] = "FAILED";
    TransactionStatus["SUCCESS"] = "SUCCESS";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var TransferDirection;
(function (TransferDirection) {
    TransferDirection["INCOMING"] = "INCOMING";
    TransferDirection["OUTGOING"] = "OUTGOING";
    TransferDirection["UNKNOWN"] = "UNKNOWN";
})(TransferDirection || (exports.TransferDirection = TransferDirection = {}));
var TransactionTokenType;
(function (TransactionTokenType) {
    TransactionTokenType["ERC20"] = "ERC20";
    TransactionTokenType["ERC721"] = "ERC721";
    TransactionTokenType["NATIVE_COIN"] = "NATIVE_COIN";
})(TransactionTokenType || (exports.TransactionTokenType = TransactionTokenType = {}));
var SettingsInfoType;
(function (SettingsInfoType) {
    SettingsInfoType["SET_FALLBACK_HANDLER"] = "SET_FALLBACK_HANDLER";
    SettingsInfoType["ADD_OWNER"] = "ADD_OWNER";
    SettingsInfoType["REMOVE_OWNER"] = "REMOVE_OWNER";
    SettingsInfoType["SWAP_OWNER"] = "SWAP_OWNER";
    SettingsInfoType["CHANGE_THRESHOLD"] = "CHANGE_THRESHOLD";
    SettingsInfoType["CHANGE_IMPLEMENTATION"] = "CHANGE_IMPLEMENTATION";
    SettingsInfoType["ENABLE_MODULE"] = "ENABLE_MODULE";
    SettingsInfoType["DISABLE_MODULE"] = "DISABLE_MODULE";
    SettingsInfoType["SET_GUARD"] = "SET_GUARD";
    SettingsInfoType["DELETE_GUARD"] = "DELETE_GUARD";
})(SettingsInfoType || (exports.SettingsInfoType = SettingsInfoType = {}));
var TransactionInfoType;
(function (TransactionInfoType) {
    TransactionInfoType["TRANSFER"] = "Transfer";
    TransactionInfoType["SETTINGS_CHANGE"] = "SettingsChange";
    TransactionInfoType["CUSTOM"] = "Custom";
    TransactionInfoType["CREATION"] = "Creation";
    TransactionInfoType["SWAP_ORDER"] = "SwapOrder";
    TransactionInfoType["TWAP_ORDER"] = "TwapOrder";
    TransactionInfoType["SWAP_TRANSFER"] = "SwapTransfer";
    TransactionInfoType["NATIVE_STAKING_DEPOSIT"] = "NativeStakingDeposit";
    TransactionInfoType["NATIVE_STAKING_VALIDATORS_EXIT"] = "NativeStakingValidatorsExit";
    TransactionInfoType["NATIVE_STAKING_WITHDRAW"] = "NativeStakingWithdraw";
})(TransactionInfoType || (exports.TransactionInfoType = TransactionInfoType = {}));
var ConflictType;
(function (ConflictType) {
    ConflictType["NONE"] = "None";
    ConflictType["HAS_NEXT"] = "HasNext";
    ConflictType["END"] = "End";
})(ConflictType || (exports.ConflictType = ConflictType = {}));
var TransactionListItemType;
(function (TransactionListItemType) {
    TransactionListItemType["TRANSACTION"] = "TRANSACTION";
    TransactionListItemType["LABEL"] = "LABEL";
    TransactionListItemType["CONFLICT_HEADER"] = "CONFLICT_HEADER";
    TransactionListItemType["DATE_LABEL"] = "DATE_LABEL";
})(TransactionListItemType || (exports.TransactionListItemType = TransactionListItemType = {}));
var DetailedExecutionInfoType;
(function (DetailedExecutionInfoType) {
    DetailedExecutionInfoType["MULTISIG"] = "MULTISIG";
    DetailedExecutionInfoType["MODULE"] = "MODULE";
})(DetailedExecutionInfoType || (exports.DetailedExecutionInfoType = DetailedExecutionInfoType = {}));
var DurationType;
(function (DurationType) {
    DurationType["AUTO"] = "AUTO";
    DurationType["LIMIT_DURATION"] = "LIMIT_DURATION";
})(DurationType || (exports.DurationType = DurationType = {}));
var StartTimeValue;
(function (StartTimeValue) {
    StartTimeValue["AT_MINING_TIME"] = "AT_MINING_TIME";
    StartTimeValue["AT_EPOCH"] = "AT_EPOCH";
})(StartTimeValue || (exports.StartTimeValue = StartTimeValue = {}));
var LabelValue;
(function (LabelValue) {
    LabelValue["Queued"] = "Queued";
    LabelValue["Next"] = "Next";
})(LabelValue || (exports.LabelValue = LabelValue = {}));
//# sourceMappingURL=transactions.js.map
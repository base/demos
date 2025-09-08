"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeStakingStatus = exports.ConfirmationViewTypes = void 0;
var ConfirmationViewTypes;
(function (ConfirmationViewTypes) {
    ConfirmationViewTypes["GENERIC"] = "GENERIC";
    ConfirmationViewTypes["COW_SWAP_ORDER"] = "COW_SWAP_ORDER";
    ConfirmationViewTypes["COW_SWAP_TWAP_ORDER"] = "COW_SWAP_TWAP_ORDER";
    ConfirmationViewTypes["KILN_NATIVE_STAKING_DEPOSIT"] = "KILN_NATIVE_STAKING_DEPOSIT";
    ConfirmationViewTypes["KILN_NATIVE_STAKING_VALIDATORS_EXIT"] = "KILN_NATIVE_STAKING_VALIDATORS_EXIT";
    ConfirmationViewTypes["KILN_NATIVE_STAKING_WITHDRAW"] = "KILN_NATIVE_STAKING_WITHDRAW";
})(ConfirmationViewTypes || (exports.ConfirmationViewTypes = ConfirmationViewTypes = {}));
var NativeStakingStatus;
(function (NativeStakingStatus) {
    NativeStakingStatus["NOT_STAKED"] = "NOT_STAKED";
    NativeStakingStatus["ACTIVATING"] = "ACTIVATING";
    NativeStakingStatus["DEPOSIT_IN_PROGRESS"] = "DEPOSIT_IN_PROGRESS";
    NativeStakingStatus["ACTIVE"] = "ACTIVE";
    NativeStakingStatus["EXIT_REQUESTED"] = "EXIT_REQUESTED";
    NativeStakingStatus["EXITING"] = "EXITING";
    NativeStakingStatus["EXITED"] = "EXITED";
    NativeStakingStatus["SLASHED"] = "SLASHED";
})(NativeStakingStatus || (exports.NativeStakingStatus = NativeStakingStatus = {}));
//# sourceMappingURL=decoded-data.js.map
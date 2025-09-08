var WalletEvent = /* @__PURE__ */ ((WalletEvent2) => {
  WalletEvent2["ConnectError"] = "walletConnectError";
  WalletEvent2["ConnectInitiated"] = "walletConnectInitiated";
  WalletEvent2["ConnectSuccess"] = "walletConnectSuccess";
  WalletEvent2["Disconnect"] = "walletDisconnect";
  WalletEvent2["OptionSelected"] = "walletOptionSelected";
  WalletEvent2["ConnectCanceled"] = "walletConnectCanceled";
  return WalletEvent2;
})(WalletEvent || {});
var WalletOption = /* @__PURE__ */ ((WalletOption2) => {
  WalletOption2["Buy"] = "buy";
  WalletOption2["Explorer"] = "explorer";
  WalletOption2["QR"] = "qr";
  WalletOption2["Refresh"] = "refresh";
  WalletOption2["Send"] = "send";
  WalletOption2["Swap"] = "swap";
  return WalletOption2;
})(WalletOption || {});
var SwapEvent = /* @__PURE__ */ ((SwapEvent2) => {
  SwapEvent2["SlippageChanged"] = "swapSlippageChanged";
  SwapEvent2["TokenSelected"] = "swapTokenSelected";
  SwapEvent2["SwapSuccess"] = "swapSuccess";
  SwapEvent2["SwapInitiated"] = "swapInitiated";
  SwapEvent2["SwapFailure"] = "swapFailure";
  SwapEvent2["SwapCanceled"] = "swapCanceled";
  return SwapEvent2;
})(SwapEvent || {});
var BuyOption = /* @__PURE__ */ ((BuyOption2) => {
  BuyOption2["APPLE_PAY"] = "apple_pay";
  BuyOption2["COINBASE"] = "coinbase_account";
  BuyOption2["DEBIT_CARD"] = "debit_card";
  BuyOption2["ETH"] = "eth";
  BuyOption2["USDC"] = "usdc";
  return BuyOption2;
})(BuyOption || {});
var BuyEvent = /* @__PURE__ */ ((BuyEvent2) => {
  BuyEvent2["BuyFailure"] = "buyFailure";
  BuyEvent2["BuyInitiated"] = "buyInitiated";
  BuyEvent2["BuyOptionSelected"] = "buyOptionSelected";
  BuyEvent2["BuySuccess"] = "buySuccess";
  BuyEvent2["BuyCanceled"] = "buyCanceled";
  return BuyEvent2;
})(BuyEvent || {});
var CheckoutEvent = /* @__PURE__ */ ((CheckoutEvent2) => {
  CheckoutEvent2["CheckoutFailure"] = "checkoutFailure";
  CheckoutEvent2["CheckoutInitiated"] = "checkoutInitiated";
  CheckoutEvent2["CheckoutSuccess"] = "checkoutSuccess";
  CheckoutEvent2["CheckoutCanceled"] = "checkoutCanceled";
  return CheckoutEvent2;
})(CheckoutEvent || {});
var MintEvent = /* @__PURE__ */ ((MintEvent2) => {
  MintEvent2["MintFailure"] = "mintFailure";
  MintEvent2["MintInitiated"] = "mintInitiated";
  MintEvent2["MintQuantityChanged"] = "mintQuantityChanged";
  MintEvent2["MintSuccess"] = "mintSuccess";
  MintEvent2["MintCanceled"] = "mintCanceled";
  return MintEvent2;
})(MintEvent || {});
var TransactionEvent = /* @__PURE__ */ ((TransactionEvent2) => {
  TransactionEvent2["TransactionFailure"] = "transactionFailure";
  TransactionEvent2["TransactionInitiated"] = "transactionInitiated";
  TransactionEvent2["TransactionSuccess"] = "transactionSuccess";
  TransactionEvent2["TransactionCanceled"] = "transactionCanceled";
  return TransactionEvent2;
})(TransactionEvent || {});
var FundEvent = /* @__PURE__ */ ((FundEvent2) => {
  FundEvent2["FundAmountChanged"] = "fundAmountChanged";
  FundEvent2["FundFailure"] = "fundFailure";
  FundEvent2["FundInitiated"] = "fundInitiated";
  FundEvent2["FundOptionSelected"] = "fundOptionSelected";
  FundEvent2["FundSuccess"] = "fundSuccess";
  FundEvent2["FundCanceled"] = "fundCanceled";
  return FundEvent2;
})(FundEvent || {});
var EarnEvent = /* @__PURE__ */ ((EarnEvent2) => {
  EarnEvent2["EarnDepositInitiated"] = "earnDepositInitiated";
  EarnEvent2["EarnDepositSuccess"] = "earnDepositSuccess";
  EarnEvent2["EarnDepositFailure"] = "earnDepositFailure";
  EarnEvent2["EarnDepositCanceled"] = "earnDepositCanceled";
  EarnEvent2["EarnWithdrawInitiated"] = "earnWithdrawInitiated";
  EarnEvent2["EarnWithdrawSuccess"] = "earnWithdrawSuccess";
  EarnEvent2["EarnWithdrawFailure"] = "earnWithdrawFailure";
  EarnEvent2["EarnWithdrawCanceled"] = "earnWithdrawCanceled";
  return EarnEvent2;
})(EarnEvent || {});
var AppchainEvent = /* @__PURE__ */ ((AppchainEvent2) => {
  AppchainEvent2["AppchainBridgeDepositInitiated"] = "appchainBridgeDepositInitiated";
  AppchainEvent2["AppchainBridgeDepositSuccess"] = "appchainBridgeDepositSuccess";
  AppchainEvent2["AppchainBridgeDepositFailure"] = "appchainBridgeDepositFailure";
  AppchainEvent2["AppchainBridgeWithdrawInitiated"] = "appchainBridgeWithdrawInitiated";
  AppchainEvent2["AppchainBridgeWithdrawSuccess"] = "appchainBridgeWithdrawSuccess";
  AppchainEvent2["AppchainBridgeWithdrawFailure"] = "appchainBridgeWithdrawFailure";
  AppchainEvent2["AppchainBridgeWaitForClaimFailure"] = "appchainBridgeWaitForClaimFailure";
  AppchainEvent2["AppchainBridgeClaimSuccess"] = "appchainBridgeClaimSuccess";
  AppchainEvent2["AppchainBridgeClaimFailure"] = "appchainBridgeClaimFailure";
  return AppchainEvent2;
})(AppchainEvent || {});
var ErrorEvent = /* @__PURE__ */ ((ErrorEvent2) => {
  ErrorEvent2["ComponentError"] = "componentError";
  return ErrorEvent2;
})(ErrorEvent || {});
export {
  AppchainEvent,
  BuyEvent,
  BuyOption,
  CheckoutEvent,
  EarnEvent,
  ErrorEvent,
  FundEvent,
  MintEvent,
  SwapEvent,
  TransactionEvent,
  WalletEvent,
  WalletOption
};
//# sourceMappingURL=types.js.map

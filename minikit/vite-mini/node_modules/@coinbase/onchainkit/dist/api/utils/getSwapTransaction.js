function getSwapTransaction(rawTx, chainId) {
  const { data, gas, to, value } = rawTx;
  return {
    chainId: Number(chainId),
    data,
    gas: BigInt(gas),
    to,
    value: BigInt(value)
  };
}
export {
  getSwapTransaction
};
//# sourceMappingURL=getSwapTransaction.js.map

import { getChainExplorer } from "../../../../core/network/getChainExplorer.js";
import { useChainId } from "wagmi";
function defaultSendTxSuccessHandler({
  transactionId,
  transactionHash,
  senderChain,
  address,
  onComplete
}) {
  return (receipt) => {
    const accountChainId = (senderChain == null ? void 0 : senderChain.id) ?? useChainId();
    if (receipt && transactionId && transactionHash && (senderChain == null ? void 0 : senderChain.id) && address) {
      const url = new URL("https://wallet.coinbase.com/assets/transactions");
      url.searchParams.set("contentParams[txHash]", transactionHash);
      url.searchParams.set(
        "contentParams[chainId]",
        JSON.stringify(senderChain == null ? void 0 : senderChain.id)
      );
      url.searchParams.set("contentParams[fromAddress]", address);
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const chainExplorer = getChainExplorer(accountChainId);
      window.open(
        `${chainExplorer}/tx/${transactionHash}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
    onComplete == null ? void 0 : onComplete();
  };
}
export {
  defaultSendTxSuccessHandler
};
//# sourceMappingURL=defaultSendTxSuccessHandler.js.map

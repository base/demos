import { useAccount } from "wagmi";
import { useCapabilitiesSafe } from "../../internal/hooks/useCapabilitiesSafe.js";
import { useOnchainKit } from "../../useOnchainKit.js";
const COINBASE_WALLET_SDK_CONNECTOR_ID = "coinbaseWalletSDK";
function useIsWalletACoinbaseSmartWallet() {
  var _a;
  const { chain } = useOnchainKit();
  const { connector } = useAccount();
  const walletCapabilities = useCapabilitiesSafe({
    chainId: chain.id
  });
  return (connector == null ? void 0 : connector.id) === COINBASE_WALLET_SDK_CONNECTOR_ID && ((_a = walletCapabilities.atomicBatch) == null ? void 0 : _a.supported) === true;
}
export {
  useIsWalletACoinbaseSmartWallet
};
//# sourceMappingURL=useIsWalletACoinbaseSmartWallet.js.map

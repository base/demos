import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useOnchainKit } from "../../useOnchainKit.js";
import { useIsWalletACoinbaseSmartWallet } from "../../wallet/hooks/useIsWalletACoinbaseSmartWallet.js";
import { getCoinbaseSmartWalletFundUrl } from "../utils/getCoinbaseSmartWalletFundUrl.js";
import { getOnrampBuyUrl } from "../utils/getOnrampBuyUrl.js";
function useGetFundingUrl({
  fiatCurrency,
  originComponentName
}) {
  const { projectId, chain: defaultChain } = useOnchainKit();
  const { address, chain: accountChain } = useAccount();
  const isCoinbaseSmartWallet = useIsWalletACoinbaseSmartWallet();
  const chain = accountChain || defaultChain;
  return useMemo(() => {
    if (isCoinbaseSmartWallet) {
      return getCoinbaseSmartWalletFundUrl();
    }
    if (projectId === null || address === void 0) {
      return void 0;
    }
    return getOnrampBuyUrl({
      projectId,
      addresses: { [address]: [chain.name.toLowerCase()] },
      fiatCurrency,
      originComponentName
    });
  }, [
    isCoinbaseSmartWallet,
    projectId,
    address,
    chain,
    fiatCurrency,
    originComponentName
  ]);
}
export {
  useGetFundingUrl
};
//# sourceMappingURL=useGetFundingUrl.js.map

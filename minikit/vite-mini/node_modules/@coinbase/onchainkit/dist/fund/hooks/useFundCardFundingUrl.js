import { useOnchainKit } from "../../useOnchainKit.js";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useFundContext } from "../components/FundCardProvider.js";
import { getOnrampBuyUrl } from "../utils/getOnrampBuyUrl.js";
const useFundCardFundingUrl = () => {
  const { projectId, chain: defaultChain } = useOnchainKit();
  const { address, chain: accountChain } = useAccount();
  const {
    selectedPaymentMethod,
    selectedInputType,
    fundAmountFiat,
    fundAmountCrypto,
    asset,
    currency
  } = useFundContext();
  const chain = accountChain || defaultChain;
  return useMemo(() => {
    if (projectId === null || address === void 0) {
      return void 0;
    }
    const fundAmount = selectedInputType === "fiat" ? fundAmountFiat : fundAmountCrypto;
    return getOnrampBuyUrl({
      projectId,
      assets: [asset],
      presetFiatAmount: selectedInputType === "fiat" ? Number(fundAmount) : void 0,
      presetCryptoAmount: selectedInputType === "crypto" ? Number(fundAmount) : void 0,
      defaultPaymentMethod: selectedPaymentMethod == null ? void 0 : selectedPaymentMethod.id,
      addresses: { [address]: [chain.name.toLowerCase()] },
      fiatCurrency: currency,
      originComponentName: "FundCard"
    });
  }, [
    asset,
    fundAmountFiat,
    fundAmountCrypto,
    selectedPaymentMethod,
    selectedInputType,
    projectId,
    address,
    chain,
    currency
  ]);
};
export {
  useFundCardFundingUrl
};
//# sourceMappingURL=useFundCardFundingUrl.js.map

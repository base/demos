import { useCallback } from "react";
import { formatUnits } from "viem";
import { useConfig } from "wagmi";
import { getCommerceContracts } from "../utils/getCommerceContracts.js";
import { getUSDCBalance } from "../utils/getUSDCBalance.js";
import { handlePayRequest } from "../utils/handlePayRequest.js";
const useCommerceContracts = ({
  chargeHandler,
  productId
}) => {
  const config = useConfig();
  return useCallback(
    async (address) => {
      try {
        const [response, usdcBalance] = await Promise.all([
          handlePayRequest({
            address,
            chargeHandler,
            productId
          }),
          getUSDCBalance({
            address,
            config
          })
        ]);
        const { id: chargeId } = response;
        const contracts = getCommerceContracts({
          transaction: response
        });
        const priceInUSDC = formatUnits(
          BigInt(response.callData.feeAmount) + BigInt(response.callData.recipientAmount),
          6
        );
        const insufficientBalance = Number.parseFloat(usdcBalance) < Number.parseFloat(priceInUSDC);
        return { chargeId, contracts, insufficientBalance, priceInUSDC };
      } catch (error) {
        console.error("Unexpected error fetching contracts:", error);
        return {
          chargeId: "",
          contracts: null,
          insufficientBalance: false,
          error
        };
      }
    },
    [config, chargeHandler, productId]
  );
};
export {
  useCommerceContracts
};
//# sourceMappingURL=useCommerceContracts.js.map

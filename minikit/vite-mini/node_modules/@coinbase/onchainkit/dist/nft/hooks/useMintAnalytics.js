import { useAnalytics } from "../../core/analytics/hooks/useAnalytics.js";
import { MintEvent } from "../../core/analytics/types.js";
import { useNFTContext } from "../components/NFTProvider.js";
import { useState, useRef, useMemo, useEffect } from "react";
import { useAccount } from "wagmi";
const useMintAnalytics = () => {
  const [transactionState, setTransactionState] = useState(null);
  const successSent = useRef(false);
  const errorSent = useRef(false);
  const { sendAnalytics } = useAnalytics();
  const { address } = useAccount();
  const { contractAddress, tokenId, quantity, isSponsored } = useNFTContext();
  const analyticsData = useMemo(() => {
    if (!tokenId || !address) {
      return null;
    }
    return {
      address,
      contractAddress,
      tokenId,
      quantity,
      isSponsored: isSponsored ?? false
    };
  }, [address, contractAddress, tokenId, quantity, isSponsored]);
  useEffect(() => {
    if (!analyticsData) {
      return;
    }
    if (transactionState === "buildingTransaction") {
      successSent.current = false;
      errorSent.current = false;
      sendAnalytics(MintEvent.MintInitiated, analyticsData);
    }
    if (transactionState === "success" && !successSent.current) {
      successSent.current = true;
      sendAnalytics(MintEvent.MintSuccess, {
        ...analyticsData,
        amountMinted: quantity
      });
    }
    if (transactionState === "error" && !errorSent.current) {
      errorSent.current = true;
      sendAnalytics(MintEvent.MintFailure, {
        error: "Transaction failed",
        metadata: analyticsData
      });
    }
  }, [transactionState, quantity, analyticsData, sendAnalytics]);
  const handleQuantityChange = (newQuantity) => {
    sendAnalytics(MintEvent.MintQuantityChanged, {
      quantity: newQuantity
    });
  };
  return {
    setTransactionState,
    handleQuantityChange
  };
};
export {
  useMintAnalytics
};
//# sourceMappingURL=useMintAnalytics.js.map

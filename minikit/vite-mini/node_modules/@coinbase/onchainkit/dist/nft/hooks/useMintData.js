import { RequestContext } from "../../core/network/constants.js";
import { convertIpfsToHttps } from "../utils/ipfs.js";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useNFTLifecycleContext } from "../components/NFTLifecycleProvider.js";
import { useMintDetails } from "./useMintDetails.js";
function useMintData(contractAddress, tokenId) {
  const { updateLifecycleStatus } = useNFTLifecycleContext();
  const [error, setError] = useState(null);
  const { address } = useAccount();
  useEffect(() => {
    if (error) {
      updateLifecycleStatus({
        statusName: "error",
        statusData: error
      });
    }
  }, [error, updateLifecycleStatus]);
  const { error: mintError, data: mintData } = useMintDetails(
    {
      contractAddress,
      takerAddress: address,
      ...tokenId ? { tokenId } : {}
    },
    RequestContext.NFT
  );
  if (mintError && !error) {
    setError({
      code: "NmMD01",
      message: mintError.message,
      error: "Error fetching mint data"
    });
    return mintError;
  }
  return {
    name: mintData == null ? void 0 : mintData.name,
    description: mintData == null ? void 0 : mintData.description,
    imageUrl: convertIpfsToHttps(mintData == null ? void 0 : mintData.imageUrl),
    animationUrl: convertIpfsToHttps(mintData == null ? void 0 : mintData.animationUrl),
    mimeType: mintData == null ? void 0 : mintData.mimeType,
    contractType: mintData == null ? void 0 : mintData.contractType,
    maxMintsPerWallet: (mintData == null ? void 0 : mintData.maxMintsPerWallet) === 0 ? void 0 : mintData == null ? void 0 : mintData.maxMintsPerWallet,
    price: mintData == null ? void 0 : mintData.price,
    mintFee: mintData == null ? void 0 : mintData.mintFee,
    isEligibleToMint: mintData == null ? void 0 : mintData.isEligibleToMint,
    creatorAddress: mintData == null ? void 0 : mintData.creatorAddress,
    totalOwners: mintData == null ? void 0 : mintData.totalOwners,
    network: mintData == null ? void 0 : mintData.network
  };
}
export {
  useMintData
};
//# sourceMappingURL=useMintData.js.map

import { RequestContext } from "../../core/network/constants.js";
import { convertIpfsToHttps } from "../utils/ipfs.js";
import { useState, useEffect } from "react";
import { useNFTLifecycleContext } from "../components/NFTLifecycleProvider.js";
import { useTokenDetails } from "./useTokenDetails.js";
function useNFTData(contractAddress, tokenId) {
  const { updateLifecycleStatus } = useNFTLifecycleContext();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error) {
      updateLifecycleStatus({
        statusName: "error",
        statusData: error
      });
    }
  }, [error, updateLifecycleStatus]);
  const { error: tokenError, data: tokenDetails } = useTokenDetails(
    {
      contractAddress,
      tokenId
    },
    RequestContext.NFT
  );
  if (tokenError && !error) {
    setError({
      code: "NmND01",
      message: tokenError.message,
      error: "Error fetching NFT data"
    });
    return tokenError;
  }
  return {
    name: tokenDetails == null ? void 0 : tokenDetails.name,
    description: tokenDetails == null ? void 0 : tokenDetails.description,
    imageUrl: convertIpfsToHttps(tokenDetails == null ? void 0 : tokenDetails.imageUrl),
    animationUrl: convertIpfsToHttps(tokenDetails == null ? void 0 : tokenDetails.animationUrl),
    mimeType: tokenDetails == null ? void 0 : tokenDetails.mimeType,
    ownerAddress: tokenDetails == null ? void 0 : tokenDetails.ownerAddress,
    lastSoldPrice: tokenDetails == null ? void 0 : tokenDetails.lastSoldPrice,
    contractType: tokenDetails == null ? void 0 : tokenDetails.contractType
  };
}
export {
  useNFTData
};
//# sourceMappingURL=useNFTData.js.map

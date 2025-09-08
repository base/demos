import { getChainPublicClient } from "../../core/network/getChainPublicClient.js";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
const getSocials = async ({
  ensName
}) => {
  const client = getChainPublicClient(mainnet);
  const normalizedName = normalize(ensName);
  const fetchTextRecord = async (key) => {
    try {
      const result = await client.getEnsText({
        name: normalizedName,
        key
      });
      return result || null;
    } catch (error) {
      console.warn(`Failed to fetch ENS text record for ${key}:`, error);
      return null;
    }
  };
  const [twitter, github, farcaster, website] = await Promise.all([
    fetchTextRecord("com.twitter"),
    fetchTextRecord("com.github"),
    fetchTextRecord("xyz.farcaster"),
    fetchTextRecord("url")
  ]);
  return { twitter, github, farcaster, website };
};
export {
  getSocials
};
//# sourceMappingURL=getSocials.js.map

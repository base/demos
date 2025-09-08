import { getChainPublicClient } from "../../core/network/getChainPublicClient.js";
import { mainnet } from "viem/chains";
const mainnetClient = getChainPublicClient(mainnet);
const getAddresses = async ({
  names
}) => {
  if (!names || names.length === 0) {
    return [];
  }
  const results = Array(names.length).fill(null);
  try {
    const validItems = names.map((name, index) => name ? { name, index } : null).filter((item) => item !== null);
    if (validItems.length === 0) {
      return results;
    }
    const addressPromises = validItems.map(
      ({ name, index }) => mainnetClient.getEnsAddress({
        name
      }).then((address) => {
        return { index, address };
      }).catch((error) => {
        console.error(`Error resolving address for ${name}:`, error);
        return { index, address: null };
      })
    );
    const resolvedAddresses = await Promise.all(addressPromises);
    resolvedAddresses.forEach(({ index, address }) => {
      results[index] = address;
    });
  } catch (error) {
    console.error("Error resolving addresses in batch:", error);
    return Array(names.length).fill(null);
  }
  return results;
};
export {
  getAddresses
};
//# sourceMappingURL=getAddresses.js.map

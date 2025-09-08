import { getChainPublicClient } from "../../core/network/getChainPublicClient.js";
import { mainnet } from "viem/chains";
const mainnetClient = getChainPublicClient(mainnet);
const getAddress = async ({
  name
}) => {
  const address = await mainnetClient.getEnsAddress({
    name
  });
  return address ?? null;
};
export {
  getAddress
};
//# sourceMappingURL=getAddress.js.map

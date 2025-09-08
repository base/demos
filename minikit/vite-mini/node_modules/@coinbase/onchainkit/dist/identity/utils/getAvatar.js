import { getChainPublicClient } from "../../core/network/getChainPublicClient.js";
import { isBase } from "../../core/utils/isBase.js";
import { isEthereum } from "../../core/utils/isEthereum.js";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "../constants.js";
import { getBaseDefaultProfilePicture } from "./getBaseDefaultProfilePicture.js";
import { isBasename } from "./isBasename.js";
const getAvatar = async ({
  ensName,
  chain = mainnet
}) => {
  const chainIsBase = isBase({ chainId: chain.id });
  const chainIsEthereum = isEthereum({ chainId: chain.id });
  const chainSupportsUniversalResolver = chainIsEthereum || chainIsBase;
  const usernameIsBasename = isBasename(ensName);
  if (!chainSupportsUniversalResolver) {
    return Promise.reject(
      "ChainId not supported, avatar resolution is only supported on Ethereum and Base."
    );
  }
  let client = getChainPublicClient(chain);
  let baseEnsAvatar = null;
  if (chainIsBase) {
    try {
      baseEnsAvatar = await client.getEnsAvatar({
        name: normalize(ensName),
        universalResolverAddress: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id]
      });
      if (baseEnsAvatar) {
        return baseEnsAvatar;
      }
    } catch {
    }
  }
  client = getChainPublicClient(mainnet);
  const mainnetEnsAvatar = await client.getEnsAvatar({
    name: normalize(ensName)
  });
  if (mainnetEnsAvatar) {
    return mainnetEnsAvatar;
  }
  if (usernameIsBasename) {
    return getBaseDefaultProfilePicture(ensName);
  }
  return null;
};
export {
  getAvatar
};
//# sourceMappingURL=getAvatar.js.map

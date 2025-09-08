import { getChainPublicClient } from "../../core/network/getChainPublicClient.js";
import { isBase } from "../../core/utils/isBase.js";
import { isEthereum } from "../../core/utils/isEthereum.js";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "../constants.js";
import { getBaseDefaultProfilePicture } from "./getBaseDefaultProfilePicture.js";
import { isBasename } from "./isBasename.js";
const getAvatars = async ({
  ensNames,
  chain = mainnet
}) => {
  if (!ensNames || ensNames.length === 0) {
    return [];
  }
  const chainIsBase = isBase({ chainId: chain.id });
  const chainIsEthereum = isEthereum({ chainId: chain.id });
  const chainSupportsUniversalResolver = chainIsEthereum || chainIsBase;
  if (!chainSupportsUniversalResolver) {
    return Promise.reject(
      "ChainId not supported, avatar resolution is only supported on Ethereum and Base."
    );
  }
  const results = Array(ensNames.length).fill(null);
  const basenameIndices = [];
  ensNames.forEach((name, index) => {
    if (isBasename(name)) {
      basenameIndices.push(index);
    }
  });
  if (chainIsBase && basenameIndices.length > 0) {
    const client = getChainPublicClient(chain);
    try {
      const baseAvatarPromises = basenameIndices.map(
        (index) => client.getEnsAvatar({
          name: normalize(ensNames[index]),
          universalResolverAddress: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id]
        }).catch((error) => {
          console.error(
            `Error resolving Base avatar for ${ensNames[index]}:`,
            error
          );
          return null;
        })
      );
      const baseAvatarResults = await Promise.all(baseAvatarPromises);
      baseAvatarResults.forEach((avatar, i) => {
        const originalIndex = basenameIndices[i];
        if (avatar) {
          results[originalIndex] = avatar;
        }
      });
    } catch (error) {
      console.error("Error resolving Base avatars in batch:", error);
    }
  }
  const fallbackClient = getChainPublicClient(mainnet);
  try {
    const ensAvatarPromises = ensNames.map((name, index) => {
      if (results[index] !== null) {
        return Promise.resolve(null);
      }
      return fallbackClient.getEnsAvatar({
        name: normalize(name)
      }).catch((error) => {
        console.error(`Error resolving ENS avatar for ${name}:`, error);
        return null;
      });
    });
    const ensAvatarResults = await Promise.all(ensAvatarPromises);
    ensAvatarResults.forEach((avatar, index) => {
      if (avatar && results[index] === null) {
        results[index] = avatar;
      }
    });
  } catch (error) {
    console.error("Error resolving ENS avatars in batch:", error);
  }
  for (const index of basenameIndices) {
    if (results[index] === null) {
      results[index] = getBaseDefaultProfilePicture(
        ensNames[index]
      );
    }
  }
  return results;
};
export {
  getAvatars
};
//# sourceMappingURL=getAvatars.js.map

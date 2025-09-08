import { mainnet } from "viem/chains";
import { getChainPublicClient } from "../../core/network/getChainPublicClient.js";
import { isBase } from "../../core/utils/isBase.js";
import { isEthereum } from "../../core/utils/isEthereum.js";
import L2ResolverAbi from "../abis/L2ResolverAbi.js";
import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "../constants.js";
import { convertReverseNodeToBytes } from "./convertReverseNodeToBytes.js";
import { getAddresses } from "./getAddresses.js";
const getNames = async ({
  addresses,
  chain = mainnet
}) => {
  if (!addresses || addresses.length === 0) {
    return [];
  }
  const chainIsBase = isBase({ chainId: chain.id });
  const chainIsEthereum = isEthereum({ chainId: chain.id });
  const chainSupportsUniversalResolver = chainIsEthereum || chainIsBase;
  if (!chainSupportsUniversalResolver) {
    return Promise.reject(
      "ChainId not supported, name resolution is only supported on Ethereum and Base."
    );
  }
  const client = getChainPublicClient(chain);
  const results = Array(addresses.length).fill(null);
  if (chainIsBase) {
    try {
      const calls = addresses.map((address) => ({
        address: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id],
        abi: L2ResolverAbi,
        functionName: "name",
        args: [convertReverseNodeToBytes(address, chain.id)]
      }));
      const batchResults = await client.multicall({
        contracts: calls,
        allowFailure: true
      });
      const basenamesWithIndices = [];
      for (let index = 0; index < batchResults.length; index++) {
        const result = batchResults[index];
        if (result.status === "success" && result.result) {
          const basename = result.result;
          basenamesWithIndices.push({ basename, index });
        }
      }
      if (basenamesWithIndices.length > 0) {
        try {
          const basenames = basenamesWithIndices.map(
            ({ basename }) => basename
          );
          const resolvedAddresses = await getAddresses({
            names: basenames
          });
          for (let i = 0; i < basenamesWithIndices.length; i++) {
            const { basename, index } = basenamesWithIndices[i];
            const resolvedAddress = resolvedAddresses[i];
            if (resolvedAddress && resolvedAddress.toLowerCase() === addresses[index].toLowerCase()) {
              results[index] = basename;
            }
          }
        } catch (error) {
          console.error(
            "Error during batch basename forward resolution verification:",
            error
          );
        }
      }
      if (results.every((result) => result !== null)) {
        return results;
      }
    } catch (error) {
      console.error("Error resolving Base names in batch:", error);
    }
  }
  const fallbackClient = getChainPublicClient(mainnet);
  const unresolvedIndices = results.map((result, index) => result === null ? index : -1).filter((index) => index !== -1);
  if (unresolvedIndices.length > 0) {
    try {
      const ensPromises = unresolvedIndices.map(
        (index) => fallbackClient.getEnsName({
          address: addresses[index]
        }).catch((error) => {
          console.error(
            `Error resolving ENS name for ${addresses[index]}:`,
            error
          );
          return null;
        })
      );
      const ensResults = await Promise.all(ensPromises);
      const ensNamesWithIndices = [];
      for (let i = 0; i < ensResults.length; i++) {
        const ensName = ensResults[i];
        const originalIndex = unresolvedIndices[i];
        if (ensName) {
          ensNamesWithIndices.push({ ensName, originalIndex });
        }
      }
      if (ensNamesWithIndices.length > 0) {
        try {
          const ensNames = ensNamesWithIndices.map(({ ensName }) => ensName);
          const resolvedAddresses = await getAddresses({
            names: ensNames
          });
          for (let i = 0; i < ensNamesWithIndices.length; i++) {
            const { ensName, originalIndex } = ensNamesWithIndices[i];
            const resolvedAddress = resolvedAddresses[i];
            if (resolvedAddress && resolvedAddress.toLowerCase() === addresses[originalIndex].toLowerCase()) {
              results[originalIndex] = ensName;
            }
          }
        } catch (error) {
          console.error(
            "Error during batch ENS forward resolution verification:",
            error
          );
        }
      }
    } catch (error) {
      console.error("Error resolving ENS names in batch:", error);
    }
  }
  return results;
};
export {
  getNames
};
//# sourceMappingURL=getNames.js.map

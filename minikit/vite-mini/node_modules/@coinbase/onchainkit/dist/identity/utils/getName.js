import { mainnet, base } from "viem/chains";
import { getChainPublicClient } from "../../core/network/getChainPublicClient.js";
import { isBase } from "../../core/utils/isBase.js";
import { isEthereum } from "../../core/utils/isEthereum.js";
import L2ResolverAbi from "../abis/L2ResolverAbi.js";
import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "../constants.js";
import { convertReverseNodeToBytes } from "./convertReverseNodeToBytes.js";
import { getAddress } from "./getAddress.js";
const getName = async ({
  address,
  chain = mainnet
}) => {
  const chainIsBase = isBase({ chainId: chain.id });
  const chainIsEthereum = isEthereum({ chainId: chain.id });
  const chainSupportsUniversalResolver = chainIsEthereum || chainIsBase;
  if (!chainSupportsUniversalResolver) {
    return Promise.reject(
      "ChainId not supported, name resolution is only supported on Ethereum and Base."
    );
  }
  const client = getChainPublicClient(chain);
  if (chainIsBase) {
    const addressReverseNode = convertReverseNodeToBytes(address, base.id);
    try {
      const basename = await client.readContract({
        abi: L2ResolverAbi,
        address: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id],
        functionName: "name",
        args: [addressReverseNode]
      });
      if (basename) {
        try {
          const resolvedAddress = await getAddress({
            name: basename
          });
          if (resolvedAddress && resolvedAddress.toLowerCase() === address.toLowerCase()) {
            return basename;
          }
        } catch (error) {
          console.error(
            "Error during basename forward resolution verification:",
            error
          );
        }
      }
    } catch {
    }
  }
  const fallbackClient = getChainPublicClient(mainnet);
  try {
    const ensName = await fallbackClient.getEnsName({
      address
    });
    if (ensName) {
      try {
        const resolvedAddress = await getAddress({
          name: ensName
        });
        if (resolvedAddress && resolvedAddress.toLowerCase() === address.toLowerCase()) {
          return ensName;
        }
      } catch (error) {
        console.error(
          "Error during ENS forward resolution verification:",
          error
        );
      }
    }
  } catch {
  }
  return null;
};
export {
  getName
};
//# sourceMappingURL=getName.js.map

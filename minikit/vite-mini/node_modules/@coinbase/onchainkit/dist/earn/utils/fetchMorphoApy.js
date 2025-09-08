import { base } from "viem/chains";
const QUERY = `query($address: String!) {
    vaultByAddress(address: $address, chainId: ${base.id} ) {
        address
        symbol
        name
        creationBlockNumber
        creationTimestamp
        creatorAddress
        whitelisted
        asset {
          id
          address
          decimals
          symbol
        }
        chain {
          id
          network
        }
        liquidity {
          underlying
        }
        state {
          id
          apy
          netApy
          netApyWithoutRewards
          totalAssets
          totalAssetsUsd
          fee
          timelock
          rewards {
            amountPerSuppliedToken
            supplyApr
            yearlySupplyTokens
            asset {
              address
              name
              decimals
            }
        }
      }
    }
  }`;
async function fetchMorphoApy(vaultAddress) {
  const response = await fetch("https://blue-api.morpho.org/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { address: vaultAddress }
    })
  });
  const { data, errors } = await response.json();
  if (errors == null ? void 0 : errors.some((err) => err.status === "BAD_USER_INPUT")) {
    throw new Error(
      "Vault not found. Ensure the address is a valid Morpho vault on Base."
    );
  }
  if (errors && (errors == null ? void 0 : errors.length) > 0) {
    throw new Error(
      "Error fetching Morpho vault data. Please try again later."
    );
  }
  return data.vaultByAddress;
}
export {
  fetchMorphoApy
};
//# sourceMappingURL=fetchMorphoApy.js.map

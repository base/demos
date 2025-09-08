import { getAttestationsByFilter } from "../../core/network/attestations.js";
import { isChainSupported } from "./easSupportedChains.js";
async function getAttestations(address, chain, options) {
  if (!address) {
    console.log("Error in getAttestation: Address is not provided");
    return [];
  }
  if (!isChainSupported(chain)) {
    console.log("Error in getAttestation: Chain is not supported");
    return [];
  }
  try {
    const defaultQueryVariablesFilter = {
      revoked: false,
      expirationTime: Math.round(Date.now() / 1e3),
      limit: 10
    };
    const queryVariablesFilter = { ...defaultQueryVariablesFilter, ...options };
    return await getAttestationsByFilter(address, chain, queryVariablesFilter);
  } catch (error) {
    console.log(`Error in getAttestation: ${error.message}`);
    return [];
  }
}
export {
  getAttestations
};
//# sourceMappingURL=getAttestations.js.map

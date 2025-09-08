import { useAttestations } from "../hooks/useAttestations.js";
import { useOnchainKit } from "../../useOnchainKit.js";
import { useIdentityContext } from "./IdentityProvider.js";
function DisplayBadge({ children, address }) {
  const { chain, schemaId } = useOnchainKit();
  const { schemaId: contextSchemaId, address: contextAddress } = useIdentityContext();
  if (!contextSchemaId && !schemaId) {
    throw new Error(
      "Name: a SchemaId must be provided to the OnchainKitProvider or Identity component."
    );
  }
  const attestations = useAttestations({
    address: address ?? contextAddress,
    chain,
    schemaId: contextSchemaId ?? schemaId
  });
  if (attestations.length === 0) {
    return null;
  }
  return children;
}
export {
  DisplayBadge
};
//# sourceMappingURL=DisplayBadge.js.map

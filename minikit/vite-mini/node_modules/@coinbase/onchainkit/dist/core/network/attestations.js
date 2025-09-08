import { gql } from "graphql-request";
import { getAddress } from "viem";
import { createEasGraphQLClient } from "./createEasGraphQLClient.js";
const attestationQuery = gql`
  query AttestationsForUsers(
    $where: AttestationWhereInput
    $distinct: [AttestationScalarFieldEnum!]
    $take: Int
  ) {
    attestations(where: $where, distinct: $distinct, take: $take) {
      id
      txid
      schemaId
      attester
      recipient
      revoked
      revocationTime
      expirationTime
      time
      timeCreated
      decodedDataJson
    }
  }
`;
function getAttestationQueryVariables(address, filters) {
  const checksummedAddress = getAddress(address);
  const conditions = {
    recipient: { equals: checksummedAddress },
    revoked: { equals: filters.revoked }
  };
  if (typeof filters.expirationTime === "number") {
    conditions.OR = [
      { expirationTime: { equals: 0 } },
      { expirationTime: { gt: filters.expirationTime } }
    ];
  }
  if ((filters == null ? void 0 : filters.schemas) && filters.schemas.length > 0) {
    conditions.schemaId = { in: filters.schemas };
  }
  return {
    where: { AND: [conditions] },
    distinct: ["schemaId"],
    take: filters.limit
  };
}
async function getAttestationsByFilter(address, chain, filters) {
  const easGraphqlClient = createEasGraphQLClient(chain);
  const attestationQueryVariables = getAttestationQueryVariables(
    address,
    filters
  );
  const { attestations } = await easGraphqlClient.request(attestationQuery, attestationQueryVariables);
  return attestations;
}
export {
  attestationQuery,
  getAttestationQueryVariables,
  getAttestationsByFilter
};
//# sourceMappingURL=attestations.js.map

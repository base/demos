import { fromRlp, toRlp } from "viem";
function maybeAddProofNode(key, proof) {
  const lastProofRlp = proof[proof.length - 1];
  const lastProof = fromRlp(lastProofRlp);
  if (lastProof.length !== 17) {
    return proof;
  }
  const modifiedProof = [...proof];
  for (const item of lastProof) {
    if (!Array.isArray(item)) {
      continue;
    }
    const suffix = item[0].slice(3);
    if (typeof suffix !== "string" || !key.endsWith(suffix)) {
      continue;
    }
    modifiedProof.push(toRlp(item));
  }
  return modifiedProof;
}
export {
  maybeAddProofNode
};
//# sourceMappingURL=maybeAddProofNode.js.map

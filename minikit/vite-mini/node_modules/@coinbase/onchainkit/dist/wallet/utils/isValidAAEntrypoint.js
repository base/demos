import { entryPoint06Address } from "viem/account-abstraction";
function isValidAAEntrypoint({
  entrypoint
}) {
  if (entrypoint.toLowerCase() !== entryPoint06Address.toLowerCase()) {
    return false;
  }
  return true;
}
export {
  isValidAAEntrypoint
};
//# sourceMappingURL=isValidAAEntrypoint.js.map

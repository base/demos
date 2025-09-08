import { getAddress } from "../../../../identity/utils/getAddress.js";
import { isBasename } from "../../../../identity/utils/isBasename.js";
import { isEns } from "../../../../identity/utils/isEns.js";
import { isAddress } from "viem";
import { base, mainnet } from "viem/chains";
async function validateAddressInput(input) {
  if (isAddress(input, { strict: false })) {
    return input;
  }
  if (isBasename(input) || isEns(input)) {
    const address = await getAddress({
      name: input,
      chain: isBasename(input) ? base : mainnet
    });
    if (address) {
      return address;
    }
  }
  return null;
}
export {
  validateAddressInput
};
//# sourceMappingURL=validateAddressInput.js.map

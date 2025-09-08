import { getAddress } from "../../identity/utils/getAddress.js";
import { isBasename } from "../../identity/utils/isBasename.js";
import { isEns } from "../../identity/utils/isEns.js";
import { isAddress } from "viem";
import "viem/chains";
async function getValidatedAddress(input) {
  const inputIsBasename = isBasename(input);
  const inputIsEns = isEns(input);
  if (inputIsBasename || inputIsEns) {
    const address = await getAddress({
      name: input
    });
    if (address) {
      return address;
    }
  } else if (isAddress(input, { strict: false })) {
    return input;
  }
  return null;
}
export {
  getValidatedAddress
};
//# sourceMappingURL=getValidatedAddress.js.map

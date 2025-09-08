import { baseTokens } from "../../token/constants.js";
import { base } from "viem/chains";
function getToken({
  address,
  symbol,
  name,
  decimals
}) {
  const token = baseTokens.find((token2) => token2.address === address);
  if (token) {
    return token;
  }
  if (symbol && name && decimals) {
    return {
      address,
      name,
      symbol,
      decimals,
      image: null,
      chainId: base.id
    };
  }
  return void 0;
}
export {
  getToken
};
//# sourceMappingURL=getToken.js.map

import { base, baseSepolia } from "viem/chains";
import { USDC_BY_CHAIN } from "../constants.js";
import { getETHPrice } from "./getETHPrice.js";
const defaultPriceFetcher = async (amount, token) => {
  if (!token.address) {
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const price = await getETHPrice();
    return (Number(price) * Number(amount)).toFixed(2);
  }
  if (token.address === USDC_BY_CHAIN[base.id].address || token.address === USDC_BY_CHAIN[baseSepolia.id].address) {
    return (Number(amount) * 1).toFixed(2);
  }
  return "";
};
export {
  defaultPriceFetcher
};
//# sourceMappingURL=defaultPriceFetcher.js.map

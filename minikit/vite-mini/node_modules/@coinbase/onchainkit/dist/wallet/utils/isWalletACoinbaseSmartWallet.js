import { checksumAddress, decodeAbiParameters } from "viem";
import { CB_SW_FACTORY_ADDRESS, CB_SW_PROXY_BYTECODE, ERC_1967_PROXY_IMPLEMENTATION_SLOT, CB_SW_V1_IMPLEMENTATION_ADDRESS } from "../constants.js";
async function isWalletACoinbaseSmartWallet({
  client,
  userOp
}) {
  var _a;
  try {
    const code = await client.getBytecode({ address: userOp.sender });
    if (!code) {
      const factoryAddress = (_a = userOp == null ? void 0 : userOp.initCode) == null ? void 0 : _a.slice(0, 42);
      if (checksumAddress(factoryAddress) !== checksumAddress(CB_SW_FACTORY_ADDRESS)) {
        return {
          isCoinbaseSmartWallet: false,
          error: "Invalid factory address",
          code: "W_ERR_1"
        };
      }
      return { isCoinbaseSmartWallet: true };
    }
    if (code !== CB_SW_PROXY_BYTECODE) {
      return {
        isCoinbaseSmartWallet: false,
        error: "Invalid bytecode",
        code: "W_ERR_2"
      };
    }
  } catch (error) {
    console.error("Error retrieving bytecode:", error);
    return {
      isCoinbaseSmartWallet: false,
      error: "Error retrieving bytecode",
      code: "W_ERR_3"
    };
  }
  let implementation;
  try {
    implementation = await client.request({
      method: "eth_getStorageAt",
      params: [userOp.sender, ERC_1967_PROXY_IMPLEMENTATION_SLOT, "latest"]
    });
  } catch (error) {
    console.error("Error retrieving implementation address:", error);
    return {
      isCoinbaseSmartWallet: false,
      error: "Error retrieving implementation address",
      code: "W_ERR_4"
    };
  }
  const implementationAddress = decodeAbiParameters(
    [{ type: "address" }],
    implementation
  )[0];
  if (checksumAddress(implementationAddress) !== checksumAddress(CB_SW_V1_IMPLEMENTATION_ADDRESS)) {
    return {
      isCoinbaseSmartWallet: false,
      error: "Invalid implementation address",
      code: "W_ERR_5"
    };
  }
  return { isCoinbaseSmartWallet: true };
}
export {
  isWalletACoinbaseSmartWallet
};
//# sourceMappingURL=isWalletACoinbaseSmartWallet.js.map

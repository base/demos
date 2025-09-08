import { readContract } from "wagmi/actions";
import { L2OutputOracleABI } from "../abi.js";
const getOutput = async ({
  config,
  chain,
  wagmiConfig
}) => {
  const outputIndex = await readContract(wagmiConfig, {
    address: config.contracts.l2OutputOracle,
    abi: L2OutputOracleABI,
    functionName: "latestOutputIndex",
    args: [],
    chainId: chain.id
  });
  const output = await readContract(wagmiConfig, {
    address: config.contracts.l2OutputOracle,
    abi: L2OutputOracleABI,
    functionName: "getL2Output",
    args: [outputIndex],
    chainId: chain.id
  });
  return {
    outputIndex,
    ...output
  };
};
export {
  getOutput
};
//# sourceMappingURL=getOutput.js.map

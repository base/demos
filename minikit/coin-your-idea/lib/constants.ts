const rawUrl = process.env.NEXT_PUBLIC_URL || 'localhost:3000';
export const PROJECT_URL = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `http://${rawUrl}`;

export const COIN_FACTORY_ADDRESS = "0x0000000000000000000000000000000000000000" as `0x${string}`;

export const coinFactoryAbi = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "string", name: "uri", type: "string" },
      { internalType: "address", name: "payoutRecipient", type: "address" },
      { internalType: "uint256", name: "initialPurchaseWei", type: "uint256" }
    ],
    name: "createCoin",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
] as const; 
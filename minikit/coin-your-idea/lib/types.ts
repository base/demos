export interface CreateCoinArgs {
  name: string;
  symbol: string;
  uri: string;
  payoutRecipient: `0x${string}`;
  initialPurchaseWei: bigint;
}

export interface CoinDetailsProps {
  name: string;
  symbol: string;
  uri: string;
}

export interface CoinButtonProps {
  name: string;
  symbol: string;
  uri: string;
  payoutRecipient: `0x${string}`;
  initialPurchaseWei: bigint;
  onError: (error: string) => void;
  onTxHash: (hash: string) => void;
}

export interface IdeaInputProps {
  onIdeaGenerated: (params: CreateCoinArgs) => void;
} 
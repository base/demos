import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { IdeaInput } from "./IdeaInput";
import { CoinDetails } from "./CoinDetails";
import { CoinButton } from "./CoinButton";
import { CreateCoinArgs } from "@/lib/types";

interface CoinCreationFlowProps {
  onSuccess: (hash: string) => void;
}

export function CoinCreationFlow({ onSuccess }: CoinCreationFlowProps) {
  const [coinParams, setCoinParams] = useState<CreateCoinArgs | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIdeaGenerated = (params: CreateCoinArgs) => {
    setCoinParams(params);
    setError(null);
  };

  const handleError = (error: Error) => {
    setError(error.message);
  };

  const handleTxHash = (hash: string) => {
    onSuccess(hash);
  };

  return (
    <div className="space-y-6">
      <IdeaInput onIdeaGenerated={handleIdeaGenerated} />

      {error && (
        <Alert variant="destructive" className="mb-6 slide-in-from-top animate-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {coinParams && (
        <div className="space-y-8">
          <CoinDetails coinParams={coinParams} />
          <CoinButton
            name={coinParams.name}
            symbol={coinParams.symbol}
            uri={coinParams.uri}
            initialPurchaseWei={coinParams.initialPurchaseWei}
            onError={handleError}
            onSuccess={handleTxHash}
          />
        </div>
      )}
    </div>
  );
} 
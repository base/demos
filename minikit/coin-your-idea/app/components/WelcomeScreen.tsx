import { Button } from "./ui/button";
import { Wallet, Coins } from "lucide-react";
import { useConnect } from "wagmi";

export function WelcomeScreen() {
  const { connectors, connect } = useConnect();

  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <Coins className="h-16 w-16 text-accentPrimary mb-4" />
      <h2 className="text-2xl font-bold text-center mb-2 text-accentPrimary">CoinSpark!</h2>
      <p className="text-center text-accentPrimary/80 max-w-md mb-6">
        Never let a banger go to waste. Coin it! 
        <br />
        Connect your wallet to get started.
      </p>
      <div className="flex gap-3">
        {connectors.filter(connector => connector.name === 'Coinbase Wallet').map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector })}
            variant="gradient"
            size="xl"
            className="flex items-center gap-2 bg-accentPrimary hover:bg-accentPrimary/90 text-white"
          >
            <Wallet className="h-5 w-5" />
            Sign In
          </Button>
        ))}
      </div>
    </div>
  );
} 
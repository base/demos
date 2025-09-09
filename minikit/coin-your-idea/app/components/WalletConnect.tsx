import { useAccount, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Wallet, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { sdk } from '@farcaster/frame-sdk';

export const WalletConnect = () => {
  const account = useAccount();
  const { disconnect } = useDisconnect();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.substring(0, 4)}...${address.substring(address.length - 2)}`;
  };

  const handleSignIn = async () => {
    try {
      // ensure Farcaster frame SDK is ready
      await sdk.actions.ready();
      const nonce = Math.random().toString(36).substring(2);
      const result = await sdk.actions.signIn({ nonce });
      // notify successful sign-in
      toast.success('Signed in to Farcaster!');
      
    } catch (e) {
      console.error('Farcaster sign in failed', e);
      toast.error('Farcaster sign in failed');
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {account.status === "connected" ? (
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-white rounded-full flex items-center gap-2 border border-accentPrimary shadow-sm">
              <div className="w-2 h-2 rounded-full bg-accentPrimary"></div>
              <span className="text-xs font-medium text-accentPrimary">{formatAddress(account.address)}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 text-accentPrimary" 
                onClick={() => account.address && copyToClipboard(account.address)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => disconnect()}
              className="text-xs text-accentPrimary border-accentPrimary hover:bg-accentPrimary hover:text-white"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleSignIn}
            variant="gradient"
            size="sm"
            className="flex items-center gap-1.5 bg-accentPrimary hover:bg-accentPrimary/90 text-white"
          >
            <Wallet className="h-4 w-4" />
            Sign In
          </Button>
        )}
      </div>
    </>
  );
}; 
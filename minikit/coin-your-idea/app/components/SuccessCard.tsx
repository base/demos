import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface SuccessCardProps {
  txHash: string;
  onReset: () => void;
}

export function SuccessCard({ txHash, onReset }: SuccessCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getEtherscanLink = (hash: string) => {
    return `https://basescan.org/tx/${hash}`;
  };

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          Congratulations! Your coin is now live
        </CardTitle>
        <CardDescription className="text-green-600">
          Your idea has been immortalized on the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-white p-3 flex flex-col gap-2">
          <p className="text-xs text-slate-500">Transaction Hash</p>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-slate-100 p-2 rounded flex-1 overflow-auto">{txHash}</code>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(txHash)} className="text-accentPrimary">
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => window.open(getEtherscanLink(txHash), '_blank')}
                className="text-accentPrimary"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline"
          className="w-full text-accentPrimary border-accentPrimary hover:bg-accentPrimary hover:text-white"
          onClick={onReset}
        >
          Create Another Coin
        </Button>
      </CardFooter>
    </Card>
  );
} 
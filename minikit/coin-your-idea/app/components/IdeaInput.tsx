import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CreateCoinArgs } from "@/lib/types";
import { useAccount } from 'wagmi';

const MAX_IDEA_LENGTH = 400;

interface IdeaInputProps {
  onIdeaGenerated: (params: CreateCoinArgs) => void;
}

export function IdeaInput({ onIdeaGenerated }: IdeaInputProps) {
  const [idea, setIdea] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { address: accountAddress } = useAccount();

  const handleIdeaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const singleLineValue = value.replace(/\n/g, '');
    if (singleLineValue.length <= MAX_IDEA_LENGTH) {
      setIdea(singleLineValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const generateCoinParams = async (ideaText: string) => {
    if (!ideaText) return;
    setLoading(true);
    
    try {
      if (!accountAddress) throw new Error('Connect wallet to generate coins');
      const response = await fetch('/api/generate-coin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: ideaText, owner: accountAddress }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate coin parameters');
      }
      
      const data = await response.json();
      
      let metadataUrl = data.metadataUrl;
      if (metadataUrl.startsWith('/') && typeof window !== 'undefined') {
        metadataUrl = window.location.origin + metadataUrl;
      }
      
      onIdeaGenerated({
        name: data.name,
        symbol: data.symbol,
        uri: metadataUrl,
        payoutRecipient: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        initialPurchaseWei: BigInt(0)
      });
      
      toast.success("Generated coin parameters successfully!");
      
    } catch (e) {
      const errorMessage = `Error: ${(e as Error).message}`;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-accentPrimary shadow-sm hover-scale">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-accentPrimary">Turn Your Idea into a Coin</CardTitle>
        <CardDescription className="text-accentPrimary/80">
          Enter your idea and coin it! (Max {MAX_IDEA_LENGTH} characters)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <textarea
            value={idea}
            onChange={handleIdeaChange}
            onKeyDown={handleKeyDown}
            placeholder="Input your idea here example: 'I want to create a coin for my favorite food'"
            className="w-full px-3 py-2 border border-accentPrimary rounded-md focus:outline-none focus:ring-2 focus:ring-accentPrimary min-h-[100px] resize-none"
            rows={1}
          />
          <div className="text-right text-sm text-accentPrimary/80">
            {idea.length}/{MAX_IDEA_LENGTH} characters
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => generateCoinParams(idea)}
          disabled={!idea || loading}
          className="w-full bg-accentPrimary hover:bg-accentPrimary/90 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating your coin...
            </>
          ) : 'Coin it!'}
        </Button>
      </CardFooter>
    </Card>
  );
} 
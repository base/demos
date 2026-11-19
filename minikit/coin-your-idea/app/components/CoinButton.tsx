import { useEffect, useState } from "react";
import type { Address, Abi } from "viem";
import {
  useWriteContract,
  useSimulateContract,
  useAccount,
} from "wagmi";
import { base } from 'wagmi/chains';
import { createCoinCall } from "@zoralabs/coins-sdk";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader2, CheckCircle, AlertCircle, Coins } from "lucide-react";
import { toast } from "sonner";

// Extend contract parameters to include chainId
type ContractParams = {
  address: Address;
  abi: Abi;
  functionName: string;
  args: readonly unknown[] | unknown[];
  value?: bigint;
};

export type CreateCoinArgs = {
  name: string;
  symbol: string;
  uri: string;
  initialPurchaseWei?: bigint;
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
  className?: string;
};

export function CoinButton({
  name,
  symbol,
  uri = "",
  initialPurchaseWei = BigInt(0),
  onSuccess,
  onError,
  className
}: CreateCoinArgs) {
  const account = useAccount();
  const [status, setStatus] = useState<string>('idle');
  const [contractParams, setContractParams] = useState<ContractParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Create the contract call params
  useEffect(() => {
    const fetchContractParams = async () => {
      if (!uri) {
        setErrorMessage("URI is required");
        setContractParams(null);
        return;
      }

      if (!account.address) {
        setErrorMessage("Please connect your wallet");
        setContractParams(null);
        return;
      }

      try {
        const params = await createCoinCall({
          name,
          symbol,
          uri,
          payoutRecipient: account.address,
          initialPurchaseWei: initialPurchaseWei || BigInt(0),
          platformReferrer: "0x0000000000000000000000000000000000000000" as `0x${string}`,
        });
        
        // Extract only the parameters we need
        const newContractParams: ContractParams = {
          address: params.address,
          abi: params.abi,
          functionName: params.functionName,
          args: params.args,
          value: params.value,
        };
        
        console.log("Setting new contract params:", newContractParams);
        setContractParams(newContractParams);
        setErrorMessage(null);
      } catch (error) {
        console.error("Error creating coin call params:", error);
        const message = error instanceof Error 
          ? error.message 
          : typeof error === 'string'
            ? error
            : 'Failed to create coin parameters';
        setErrorMessage(message);
        setContractParams(null);
        onError?.(error instanceof Error ? error : new Error(message));
      }
    };

    fetchContractParams();
  }, [name, symbol, uri, account.address, initialPurchaseWei, onError]);

  // Simulate the contract call
  const { data: simulation, error: simulationError } = useSimulateContract({
    address: contractParams?.address as `0x${string}`,
    abi: contractParams?.abi,
    functionName: contractParams?.functionName,
    args: contractParams?.args,
    chainId: base.id as typeof base.id,
    query: {
      enabled: !!contractParams,
    },
  });

  // Debug logging
  useEffect(() => {
    console.log('Contract Params:', contractParams);
    console.log('Simulation Data:', simulation);
    console.log('Simulation Error:', simulationError);
  }, [contractParams, simulation, simulationError]);

  // Prepare write function
  const { writeContractAsync } = useWriteContract();

  const handleClick = async () => {
    if (!contractParams) {
      setErrorMessage("Contract parameters not ready");
      return;
    }

    try {
      setIsLoading(true);
      setStatus('pending');
      // Provide chainId explicitly to avoid connector.getChainId() error
      const hash = await writeContractAsync({
        ...contractParams,
        chainId: base.id,
      });
      setStatus('success');
      onSuccess?.(hash);
    } catch (error: any) {
      // Handle user rejection separately
      const isUserRejected = error?.message?.includes('User rejected');
      if (isUserRejected) {
        // User cancelled the transaction
        setStatus('idle');
        toast('Transaction cancelled by user');
        return;
      }
      setStatus('error');
      const message = error instanceof Error 
        ? error.message 
        : typeof error === 'string'
          ? error
          : 'Failed to create coin';
      setErrorMessage(message);
      onError?.(error instanceof Error ? error : new Error(message));
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Format the ETH value for display
  const formatEthValue = (wei: bigint | undefined) => {
    if (!wei) return "0.01 ETH";
    return `${Number(wei) / 1e18} ETH`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Coins className="h-4 w-4 text-brand" />
          <span>Initial cost: {formatEthValue(initialPurchaseWei)}</span>
        </div>
        
        {simulationError && (
          <div className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Simulation failed
          </div>
        )}
      </div>
      
      <Button 
        onClick={handleClick}
        disabled={isLoading || !!simulationError || !contractParams}
        className={`w-full bg-accentPrimary hover:bg-accentPrimary/90 text-white`}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Deploying...
          </>
        ) : "Deploy it!"}
      </Button>
      
      {simulationError && (
        <Alert variant="destructive" className="mt-4 border border-red-200 bg-red-50/50 dark:bg-red-900/10 slide-in-from-top animate-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Simulation Error</AlertTitle>
          <AlertDescription className="text-sm">
            {simulationError.message}
          </AlertDescription>
        </Alert>
      )}
      
      {status === 'error' && errorMessage && (
        <Alert variant="destructive" className="mt-4 border border-red-200 bg-red-50/50 dark:bg-red-900/10 slide-in-from-top animate-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Transaction Failed</AlertTitle>
          <AlertDescription className="text-sm">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

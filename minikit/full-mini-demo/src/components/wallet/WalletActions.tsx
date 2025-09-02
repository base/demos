"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useDisconnect,
  useConnect,
  useSwitchChain,
  useChainId,
} from "wagmi";
import { config } from "~/components/providers/WagmiProvider";
import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { BaseError, UserRejectedRequestError } from "viem";
import { sdk } from "@farcaster/miniapp-sdk";
import { SignInWithBaseButton } from "@base-org/account-ui/react";
import { createBaseAccountSDK } from "@base-org/account";
import { METADATA } from "~/lib/utils";

const RECIPIENT_ADDRESS = "0x8342A48694A74044116F330db5050a267b28dD85";

// Initialize Base Account SDK
const baseAccountSDK = createBaseAccountSDK({
  appName: METADATA.name,
});

const renderError = (error: Error | null): React.ReactElement | null => {
  if (!error) return null;
  if (error instanceof BaseError) {
    const isUserRejection = error.walk(
      (e) => e instanceof UserRejectedRequestError
    );

    if (isUserRejection) {
      return <div className="text-red-500 text-xs mt-1">Rejected by user.</div>;
    }
  }

  return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
};

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { connect } = useConnect();
  const [baseSignedIn, setBaseSignedIn] = useState(false);

  const handleBaseSignIn = async () => {
    try {
      await baseAccountSDK.getProvider().request({ method: 'wallet_connect' });
      setBaseSignedIn(true);
    } catch (error) {
      console.error('Base sign in failed:', error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Button
          onClick={() =>
            isConnected
              ? disconnect()
              : connect({ connector: config.connectors[0] })
          }
          className="w-full"
        >
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </div>

      {/* Base Account Sign In Button */}
      <div className="mb-4">
        <SignInWithBaseButton 
          align="center"
          variant="solid"
          colorScheme="light"
          onClick={handleBaseSignIn}
        />
        {baseSignedIn && (
          <div className="mt-2 text-center text-sm text-green-600">
            ✅ Connected to Base Account
          </div>
        )}
      </div>

      {isConnected && address && chainId && (
        <div className="mt-4 p-4 bg-white border border-border rounded-xl">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-muted-foreground">Address:</span>
              <div className="font-mono text-foreground mt-1">{truncateAddress(address)}</div>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground">Chain:</span>
              <div className="font-mono text-foreground mt-1">{chainId}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SignMessage() {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const {
    signMessage,
    data: signature,
    error: signError,
    isError: isSignError,
    isPending: isSignPending,
  } = useSignMessage();

  const handleSignMessage = useCallback(async (): Promise<void> => {
    if (!isConnected) {
      await connectAsync({
        chainId: base.id,
        connector: config.connectors[0],
      });
    }

    signMessage({ message: "Hello from Frames v2!" });
  }, [connectAsync, isConnected, signMessage]);

  return (
    <>
      <Button
        onClick={handleSignMessage}
        disabled={isSignPending}
        isLoading={isSignPending}
      >
        Sign Message
      </Button>
      {isSignError && renderError(signError)}
      {signature && (
        <div className="mt-2 text-xs">
          <div>Signature: {signature}</div>
        </div>
      )}
    </>
  );
}

export function SendEth() {
  const { isConnected, chainId } = useAccount();
  const {
    sendTransaction,
    data,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const toAddr = useMemo((): `0x${string}` => {
    return chainId === base.id
      ? "0x32e3C7fD24e175701A35c224f2238d18439C7dBC"
      : "0xB3d8d7887693a9852734b4D25e9C0Bb35Ba8a830";
  }, [chainId]);

  const handleSend = useCallback((): void => {
    sendTransaction({
      to: toAddr,
      value: 1n,
    });
  }, [toAddr, sendTransaction]);

  return (
    <>
      <Button
        onClick={handleSend}
        disabled={!isConnected || isSendTxPending}
        isLoading={isSendTxPending}
      >
        Send Transaction (eth)
      </Button>
      {isSendTxError && renderError(sendTxError)}
      {data && (
        <div className="mt-2 text-xs">
          <div>Hash: {truncateAddress(data)}</div>
          <div>
            Status:{" "}
            {isConfirming
              ? "Confirming..."
              : isConfirmed
              ? "Confirmed!"
              : "Pending"}
          </div>
        </div>
      )}
    </>
  );
}

export function SignTypedData() {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const {
    signTypedData,
    error: signTypedError,
    isError: isSignTypedError,
    isPending: isSignTypedPending,
  } = useSignTypedData();

  const signTyped = useCallback((): void => {
    signTypedData({
      domain: {
        name: "Frames v2 Demo",
        version: "1",
        chainId,
      },
      types: {
        Message: [{ name: "content", type: "string" }],
      },
      message: {
        content: "Hello from Frames v2!",
      },
      primaryType: "Message",
    });
  }, [chainId, signTypedData]);

  return (
    <>
      <Button
        onClick={signTyped}
        disabled={!isConnected || isSignTypedPending}
        isLoading={isSignTypedPending}
      >
        Sign Typed Data
      </Button>
      {isSignTypedError && renderError(signTypedError)}
    </>
  );
}

export function SwitchChain() {
  const chainId = useChainId();
  const {
    switchChain,
    error: switchChainError,
    isError: isSwitchChainError,
    isPending: isSwitchChainPending,
  } = useSwitchChain();

  const handleSwitchChain = useCallback((): void => {
    switchChain({ chainId: chainId === base.id ? optimism.id : base.id });
  }, [switchChain, chainId]);

  return (
    <>
      <Button
        onClick={handleSwitchChain}
        disabled={isSwitchChainPending}
        isLoading={isSwitchChainPending}
      >
        Switch to {chainId === base.id ? "Optimism" : "Base"}
      </Button>
      {isSwitchChainError && renderError(switchChainError)}
    </>
  );
}

export function SendTransaction() {
  const { isConnected } = useAccount();
  const [txHash, setTxHash] = useState<string | null>(null);
  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  const sendTx = useCallback((): void => {
    sendTransaction(
      {
        to: RECIPIENT_ADDRESS as `0x${string}`,
        data: "0x9846cd9efc000023c0",
      },
      {
        onSuccess: (hash) => {
          setTxHash(hash);
        },
      }
    );
  }, [sendTransaction]);

  return (
    <>
      <Button
        onClick={sendTx}
        disabled={!isConnected || isSendTxPending}
        isLoading={isSendTxPending}
      >
        Send Transaction (contract)
      </Button>
      {isSendTxError && renderError(sendTxError)}
      {txHash && (
        <div className="mt-2 text-xs">
          <div>Hash: {truncateAddress(txHash)}</div>
          <div>
            Status:{" "}
            {isConfirming
              ? "Confirming..."
              : isConfirmed
              ? "Confirmed!"
              : "Pending"}
          </div>
        </div>
      )}
    </>
  );
}

export function GetEthereumProvider() {
  const [providerInfo, setProviderInfo] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetProvider = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const provider = await sdk.wallet.getEthereumProvider();
      
      if (!provider) {
        throw new Error('Provider not available');
      }
      
      // Type the provider properly
      const typedProvider = provider as {
        request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
        [key: string]: unknown;
      };
      
      // Extract provider info (avoiding circular references)
      const providerAny = provider as Record<string, unknown>;
      const info: Record<string, unknown> = {
        // Basic provider properties
        isConnected: typeof typedProvider.request === 'function',
        // Check for common provider properties
        isMetaMask: providerAny.isMetaMask || false,
        isWalletConnect: providerAny.isWalletConnect || false,
        isFarcaster: true, // Since it's from Farcaster SDK
      };
      
      // Get wallet address
      try {
        const accounts = await typedProvider.request({ method: 'eth_accounts' }) as string[];
        if (accounts && accounts.length > 0) {
          info.walletAddress = accounts[0];
          info.walletAddressTruncated = truncateAddress(accounts[0]);
        }
      } catch (err) {
        console.error('Failed to get wallet address:', err);
      }
      
      // Add state if it exists
      if (providerAny._state) {
        info.state = providerAny._state;
      }
      
      setProviderInfo(info);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Button
        onClick={handleGetProvider}
        disabled={loading}
        isLoading={loading}
      >
        Get Ethereum Provider
      </Button>
      {error && renderError(new Error(error))}
      {providerInfo && (
        <div className="mt-2 text-xs">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Provider Info
            </div>
            <pre className="whitespace-pre-wrap break-words text-emerald-500 dark:text-emerald-400">
              {JSON.stringify(providerInfo, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
} 
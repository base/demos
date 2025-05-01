"use client";

import { createCoinbaseWalletSDK, ProviderInterface } from "@coinbase/wallet-sdk";
import { useEffect, useState } from "react";
import { numberToHex } from "viem";
import { useAccount, useConnect, useDisconnect, useSendTransaction, useSignMessage } from "wagmi";

export default function Home() {
  const [provider, setProvider] = useState<ProviderInterface | undefined>(undefined);
  const [isEmailEnabled, setIsEmailEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    error?: string;
    email?: string;
  } | null>(null);

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  
  // Initialize the Coinbase Wallet SDK
  useEffect(() => {
    const fetchProvider = async () => {
      if (account.status === 'connected' && account.connector) {
        console.log("account", account);
        const provider = await account.connector.getProvider();
        console.log("provider", provider);
        setProvider(provider as ProviderInterface);
      }
    };
    
    fetchProvider();
  }, [account]);

  const getCallbackURL = () => {
    // Replace this with your ngrok URL when developing locally
    const ngrokUrl = "https://2be7-2a13-2540-2ed-8d00-00-7900.ngrok-free.app";
    
    // Use this in production
    const prodUrl = window.location.origin;
    
    // Choose which URL to use based on environment
    const baseUrl = process.env.NODE_ENV === "development" ? ngrokUrl : prodUrl;
    
    return `${baseUrl}/api/email-validation`;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setResult(null);

      // Check if email collection is enabled
      if (!isEmailEnabled) {
        setIsLoading(false);
        setResult({
          success: false,
          error: "Please enable email collection",
        });
        return;
      }

      // Make the request to Coinbase Wallet
      const response = await provider?.request({
        method: "wallet_sendCalls",
        params: [
          {
            version: "1.0",
            chainId: numberToHex(84532), // Base Sepolia testnet
            calls: [], // No blockchain calls needed for simple email collection
            capabilities: {
              dataCallback: {
                requests: [{ type: "email", optional: false }],
                callbackURL: getCallbackURL(),
              },
            },
          },
        ],
      });

      // Process the response
      if (response && typeof response === "object" && "capabilities" in response) {
        const dataCallback = response.capabilities.dataCallback;
        
        if ("email" in dataCallback && dataCallback.email) {
          setResult({
            success: true,
            email: dataCallback.email,
          });
        } else if (dataCallback.errors && dataCallback.errors.email) {
          setResult({
            success: false,
            error: dataCallback.errors.email,
          });
        } else {
          setResult({
            success: false,
            error: "No email received",
          });
        }
      } else {
        setResult({
          success: false,
          error: "Invalid response from wallet",
        });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setResult({
        success: false,
        error: (error as Error)?.message || "Transaction failed",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-screen min-h-screen p-4 bg-gray-900 text-gray-100">
      <div className="w-full max-w-4xl mt-8">
      <div>
          Status: {account.status}
          <br />
          Sub Account Address: {JSON.stringify(account.addresses)}
          <br />
          ChainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors
          .filter((connector) => connector.name === 'Coinbase Wallet')
          .map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              Sign in with Smart Wallet
            </button>
          ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        <h1 className="text-2xl font-bold mb-4">Email Collection Demo</h1>

        <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800">
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isEmailEnabled}
              onChange={(e) => setIsEmailEnabled(e.target.checked)}
            />
            Request Email (Required)
          </label>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center w-full cursor-pointer"
            onClick={handleSubmit}
            disabled={isLoading || !provider}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Request Email"
            )}
          </button>
        </div>

        {result && (
          <div className={`p-4 rounded-md mt-4 ${result.success ? 'bg-green-700' : 'bg-red-700'}`}>
            {result.success ? (
              <div>
                <h2 className="text-lg font-bold mb-2">Email Collection Successful</h2>
                <p><strong>Email:</strong> {result.email}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-bold mb-2">Error</h2>
                <p>{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
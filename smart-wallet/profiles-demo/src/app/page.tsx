"use client";

import { ProviderInterface } from "@coinbase/wallet-sdk";
import { useEffect, useState } from "react";
import { encodeFunctionData, numberToHex, parseUnits } from "viem";
import { useAccount, useConnect, useDisconnect} from "wagmi";
import { erc20Abi } from "viem";

export default function Home() {
  const [provider, setProvider] = useState<ProviderInterface | undefined>(undefined);
  const [isEmailEnabled, setIsEmailEnabled] = useState(true);
  const [isAddressEnabled, setIsAddressEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    error?: string;
    email?: string;
    physicalAddress?: string;
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
    const ngrokUrl = "https://a2db-86-58-220-2.ngrok-free.app";
    
    // Use this in production
    const prodUrl = window.location.origin;
    
    // Choose which URL to use based on environment
    const baseUrl = process.env.NODE_ENV === "development" ? ngrokUrl : prodUrl;
    
    return `${baseUrl}/api/data-validation`;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setResult(null);

      // Build the list of requested data types
      const requests = [];
      
      if (isEmailEnabled) {
        requests.push({ type: "email", optional: false });
      }
      
      if (isAddressEnabled) {
        requests.push({ type: "physicalAddress", optional: false });
      }
      
      // Check if at least one data type is requested
      if (requests.length === 0) {
        setIsLoading(false);
        setResult({
          success: false,
          error: "Please enable at least one data type collection",
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
            calls: [
              {
                to: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC contract address on Base Sepolia
                data: encodeFunctionData({
                  abi: erc20Abi,
                  functionName: "transfer",
                  args: [
                    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
                    parseUnits("0.01", 6),
                  ],
                }),
              },
            ], // Simple transfer of 0.01 ETH to the contract
            capabilities: {
              dataCallback: {
                requests: requests,
                callbackURL: getCallbackURL(),
              },
            },
          },
        ],
      });

      // Process the response
      if (response && typeof response === "object" && "capabilities" in response) {
        const dataCallback = response.capabilities.dataCallback;
        const processedResult: any = { success: true };
        
        // Extract email if available
        if ("email" in dataCallback && dataCallback.email) {
          processedResult.email = dataCallback.email;
        }
        
        // Extract physical address if available
        if ("physicalAddress" in dataCallback && dataCallback.physicalAddress) {
          const address = dataCallback.physicalAddress.physicalAddress;
          const addressParts = [
            address.name?.firstName && address.name?.familyName
              ? `${address.name.firstName} ${address.name.familyName}`
              : "",
            address.address1,
            address.address2,
            address.city,
            address.state,
            address.postalCode,
            address.countryCode,
          ].filter(Boolean);
          
          processedResult.physicalAddress = addressParts.join(", ");
        }
        
        setResult(processedResult);
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
          <button 
            type="button" 
            onClick={() => disconnect()}
            className="bg-red-600 text-white px-4 py-2 rounded-md mt-2"
          >
            Disconnect
          </button>
        )}
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>
        {connectors
          .filter((connector) => connector.name === 'Coinbase Wallet')
          .map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Sign in with Smart Wallet
            </button>
          ))}
        <div className="mt-2">{status}</div>
        <div className="text-red-500">{error?.message}</div>
        
        <h1 className="text-2xl font-bold my-6">User Checkout Demo</h1>

        <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800">
          <div className="mb-4">
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isEmailEnabled}
                onChange={(e) => setIsEmailEnabled(e.target.checked)}
              />
              Request Email (Required)
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAddressEnabled}
                onChange={(e) => setIsAddressEnabled(e.target.checked)}
              />
              Request Physical Address (Required)
            </label>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center w-full cursor-pointer"
            onClick={handleSubmit}
            disabled={isLoading || !provider || account.status !== 'connected'}
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
              "Request User Data"
            )}
          </button>
        </div>

        {result && (
          <div className={`p-4 rounded-md mt-4 ${result.success ? 'bg-green-700' : 'bg-red-700'}`}>
            {result.success ? (
              <div>
                <h2 className="text-lg font-bold mb-2">Checkout Successful</h2>
                {result.email && (
                  <p className="mb-2"><strong>Email:</strong> {result.email}</p>
                )}
                {result.physicalAddress && (
                  <p><strong>Address:</strong> {result.physicalAddress}</p>
                )}
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
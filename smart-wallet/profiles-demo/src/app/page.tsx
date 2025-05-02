"use client";

import { ProviderInterface } from "@coinbase/wallet-sdk";
import { useEffect, useState } from "react";
import { encodeFunctionData, erc20Abi, numberToHex, parseUnits } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
  const [provider, setProvider] = useState(undefined);
  const [dataToRequest, setDataToRequest] = useState({
    email: true,
    address: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  // Initialize provider when account connected
  useEffect(() => {
    async function getProvider() {
      if (account.status === 'connected' && account.connector) {
        const provider = await account.connector.getProvider();
        setProvider(provider);
      }
    }
    getProvider();
  }, [account]);

  // Function to get callback URL - replace in production
  function getCallbackURL() {
    return "https://your-ngrok-url.ngrok-free.app/api/data-validation";
  }

  // Handle form submission
  async function handleSubmit() {
    try {
      setIsLoading(true);
      setResult(null);

      // Build requests array based on checkboxes
      const requests = [];
      if (dataToRequest.email) requests.push({ type: "email", optional: false });
      if (dataToRequest.address) requests.push({ type: "physicalAddress", optional: false });

      if (requests.length === 0) {
        setResult({ success: false, error: "Select at least one data type" });
        setIsLoading(false);
        return;
      }

      // Request data from wallet
      const response = await provider?.request({
        method: "wallet_sendCalls",
        params: [{
          version: "1.0",
          chainId: numberToHex(84532), // Base Sepolia
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
        }],
      });

      // Process response
      if (response?.capabilities?.dataCallback) {
        const data = response.capabilities.dataCallback;
        const result = { success: true };

        // Extract email if provided
        if (data.email) result.email = data.email;

        // Extract address if provided
        if (data.physicalAddress) {
          const addr = data.physicalAddress.physicalAddress;
          result.address = [
            addr.address1,
            addr.address2,
            addr.city,
            addr.state,
            addr.postalCode,
            addr.countryCode
          ].filter(Boolean).join(", ");
        }

        setResult(result);
      } else {
        setResult({ success: false, error: "Invalid response" });
      }
    } catch (error) {
      setResult({ success: false, error: error.message || "Transaction failed" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Profiles Demo</h1>

      {/* Wallet Status */}
      <div style={{ marginBottom: "20px" }}>
        <p>Status: {account.status}</p>
        {account.status === 'connected' ? (
          <button onClick={disconnect}>Disconnect</button>
        ) : (
          connectors
            .filter(c => c.name === 'Coinbase Wallet')
            .map(connector => (
              <button key={connector.uid} onClick={() => connect({ connector })}>
                Connect Smart Wallet
              </button>
            ))
        )}
      </div>

      {/* Data Request Form */}
      {account.status === 'connected' && (
        <div style={{ marginTop: "20px" }}>
          <h2>Checkout</h2>

          <div>
            <label>
              <input
                type="checkbox"
                checked={dataToRequest.email}
                onChange={() => setDataToRequest(prev => ({ ...prev, email: !prev.email }))}
              />
              Email Address
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={dataToRequest.address}
                onChange={() => setDataToRequest(prev => ({ ...prev, address: !prev.address }))}
              />
              Physical Address
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !provider}
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: result.success ? "#d4edda" : "#f8d7da",
          borderRadius: "5px"
        }}>
          {result.success ? (
            <>
              <h3>Data Received</h3>
              {result.email && <p><strong>Email:</strong> {result.email}</p>}
              {result.address && <p><strong>Address:</strong> {result.address}</p>}
            </>
          ) : (
            <>
              <h3>Error</h3>
              <p>{result.error}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
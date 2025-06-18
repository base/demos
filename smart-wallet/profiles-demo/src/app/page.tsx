"use client";

import { useEffect, useState } from "react";
import { encodeFunctionData, erc20Abi, numberToHex, parseUnits } from "viem";
import { useConnect, useSendCalls } from "wagmi";

interface DataRequest {
  email: boolean;
  address: boolean;
}

interface ProfileResult {
  success: boolean;
  email?: string;
  address?: string;
  error?: string;
}

export default function Home() {
  const [dataToRequest, setDataToRequest] = useState<DataRequest>({
    email: true,
    address: true
  });
  const [result, setResult] = useState<ProfileResult | null>(null);

  const { sendCalls, data, error, isPending } = useSendCalls();
  const { connect, connectors } = useConnect()


  // Function to get callback URL - replace in production
  function getCallbackURL() {
    return "https://your-ngrok-url.ngrok-free.app/api/data-validation";
  }

  // Handle response data when sendCalls completes
  useEffect(() => {
    if (data?.capabilities?.dataCallback) {
      const callbackData = data.capabilities.dataCallback;
      const newResult: ProfileResult = { success: true };

      // Extract email if provided
      if (callbackData.email) newResult.email = callbackData.email;

      // Extract address if provided
      if (callbackData.physicalAddress) {
        const addr = callbackData.physicalAddress;
        newResult.address = [
          addr.address1,
          addr.address2,
          addr.city,
          addr.state,
          addr.postalCode,
          addr.countryCode
        ].filter(Boolean).join(", ");
      }

      setResult(newResult);
    } else if (data && !data.capabilities?.dataCallback) {
      setResult({ success: false, error: "Invalid response - no data callback" });
    }
  }, [data]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setResult({ 
        success: false, 
        error: error.message || "Transaction failed" 
      });
    }
  }, [error]);

  // Handle form submission
  async function handleSubmit() {
    try {
      setResult(null);

      // Build requests array based on checkboxes
      const requests = [];
      if (dataToRequest.email) requests.push({ type: "email", optional: false });
      if (dataToRequest.address) requests.push({ type: "physicalAddress", optional: false });

      if (requests.length === 0) {
        setResult({ success: false, error: "Select at least one data type" });
        return;
      }

      // Send calls using wagmi hook
      sendCalls({
        connector: connectors[0],
        account: null,
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
        ],
        chainId: 84532, // Base Sepolia
        capabilities: {
          dataCallback: {
            requests: requests,
            callbackURL: getCallbackURL(),
          },
        },
      });
    } catch (err) {
      setResult({ 
        success: false, 
        error: err instanceof Error ? err.message : "Unknown error occurred" 
      });
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Profiles Demo</h1>

      {/* Data Request Form */}
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
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Checkout"}
        </button>
      </div>

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
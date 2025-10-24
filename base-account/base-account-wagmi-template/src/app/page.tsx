"use client";

import { Connector, http, useAccount, useConnect, useDisconnect } from "wagmi";
import { SignInWithBaseButton } from "@base-org/account-ui/react";
import { useState } from "react";
import { base } from "viem/chains";
import { createPublicClient } from "viem";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [verificationResult, setVerificationResult] = useState<string>("");

  async function handleBaseAccountConnect(connector: Connector) {
    const provider = await connector.getProvider();
    if (provider) {
      try {
        // Generate a fresh nonce (this will be overwritten with the backend nonce)
        const clientNonce = Math.random().toString(36).substring(2, 15) + 
                           Math.random().toString(36).substring(2, 15);
        console.log("clientNonce", clientNonce);
        // Connect with SIWE to get signature, message, and address
        const accounts = await (provider as any).request({
          method: "wallet_connect",
          params: [
            {
              version: "1",
              capabilities: {
                signInWithEthereum: {
                  nonce: clientNonce,
                  chainId: "0x2105", // Base Mainnet - 8453
                },
              },
            },
          ],
        });

        const walletAddress = accounts.accounts[0].address;
        console.log("walletAddress", walletAddress);
        const signature = accounts.accounts[0].capabilities.signInWithEthereum.signature;
        const message = accounts.accounts[0].capabilities.signInWithEthereum.message;
        console.log("message", message);
        console.log("signature", signature);

        const publicClient = createPublicClient({
          chain: base,
          transport: http(),
        });

        const isValid = await publicClient.verifyMessage({
          address: walletAddress as `0x${string}`,
          message,
          signature: signature as `0x${string}`,
        });
        console.log("isValid", isValid);
        // Verify the signature on the backend
        const verifyResponse = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: walletAddress,
            message,
            signature,
          }),
        });

        const result = await verifyResponse.json();
        
        if (result.success) {
          setVerificationResult(`Verified! Address: ${result.address}`);
        } else {
          setVerificationResult(`Verification failed: ${result.error}`);
        }
      } catch (err) {
        console.error("Error:", err);
        setVerificationResult(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    } else {
      console.error("No provider");
    }
  }

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => {
          if (connector.name === "Base Account") {
            return (
              <div style={{ width: "300px" }}>
                <SignInWithBaseButton
                  key={connector.uid}
                  onClick={() => handleBaseAccountConnect(connector)}
                  variant="solid"
                  colorScheme="system"
                  align="center"
                />
              </div>
            );
          } else {
            return (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
              >
                {connector.name}
              </button>
            );
          }
        })}
        <div>{status}</div>
        <div>{error?.message}</div>
        {verificationResult && <div>{verificationResult}</div>}
      </div>
    </>
  );
}

export default App;

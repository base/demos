"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SignInWithBase } from "../components/SignInWithBase";
import { BatchTransactions } from "../components/BatchTransactions";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

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
              <SignInWithBase key={connector.uid} connector={connector} />
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
      </div>

      {account.status === "connected" && <BatchTransactions />}
    </>
  );
}

export default App;

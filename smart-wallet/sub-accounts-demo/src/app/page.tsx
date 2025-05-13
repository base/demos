'use client'
 
import { parseEther } from 'viem'
import { useAccount, useConnect, useWriteContract, useDisconnect, useSendTransaction, useSignMessage } from 'wagmi'
import { WETH_ADDRESS, WETH_ABI } from '../weth'
import { useState } from 'react'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransactionAsync, data } = useSendTransaction()

  // weth data and functions
  const [wrapAmount, setWrapAmount] = useState<string>('0')
  const [txHash, setTxHash] = useState<string>('')
  const { writeContractAsync: wrap, isPending: isWrapping, 
    isSuccess: isWrapped, isError: isErrorWrapping, error: errorWrapping } = useWriteContract()
  const { writeContractAsync: unwrap, isPending: isUnwrapping, isSuccess: isUnwrapped, 
    isError: isErrorUnwrapping, error: errorUnwrapping } = useWriteContract()

  const handleWrap = async () => {
    if (!wrapAmount || account.status !== 'connected') return
    
    try {
      const tx = await wrap({
        address: WETH_ADDRESS as `0x${string}`,
        abi: WETH_ABI,
        functionName: 'deposit',
        value: parseEther(wrapAmount)
      })
      setTxHash(tx)
    } catch (error) {
      console.error('Error wrapping ETH:', error)
    }
  }

  const handleUnwrap = async () => {
    if (!wrapAmount || account.status !== 'connected') return
    
    try {
      const tx = await unwrap({
        address: WETH_ADDRESS as `0x${string}`,
        abi: WETH_ABI,
        functionName: 'withdraw',
        args: [parseEther(wrapAmount)]
      })
      setTxHash(tx)
    } catch (error) {
      console.error('Error unwrapping WETH:', error)
    }
  }
  // end weth data and functions

  return (
    <>
      <div>
        <h2>Account</h2>
 
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
        <div>Send Transaction</div>
        <button type="button" onClick={async () => sendTransactionAsync({
          to: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
          value: parseEther('0.001'),
        })}>
          Send Transaction
        </button>
        <div>{data && "Transaction sent successfully! 🎉"}</div>
        <div>{data}</div>
      </div>

      <div>
        <h2>Wrap ETH to WETH and Unwrap WETH to ETH</h2>
        <input type="number" value={wrapAmount} onChange={(e) => setWrapAmount(e.target.value)} />
        <button 
          type="button" 
          onClick={handleWrap}
          disabled={!wrapAmount || account.status !== 'connected' || isWrapping}
        >
          {isWrapping ? 'Wrapping...' : 'Wrap'}
        </button>
        <button 
          type="button" 
          onClick={handleUnwrap}
          disabled={!wrapAmount || account.status !== 'connected' || isUnwrapping}
        >
          {isUnwrapping ? 'Unwrapping...' : 'Unwrap'}
        </button>
        <div>{txHash && "Tx Hash: " + txHash}</div>
        <div>{isWrapping && "Wrapping..."}</div>
        <div>{isWrapped && "Wrapped! 🎉"}</div>
        <div>{isErrorWrapping && "Error wrapping: " + errorWrapping?.message}</div>
        <div>{isUnwrapping && "Unwrapping..."}</div>
        <div>{isUnwrapped && "Unwrapped! 🎉"}</div>
        <div>{isErrorUnwrapping && "Error unwrapping: " + errorUnwrapping?.message}</div>
      </div>
    </>
  )
}
 
export default App
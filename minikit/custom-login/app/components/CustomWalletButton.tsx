import React, { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { CustomLogin } from './customLogin'

/**
 * A button that allows users to connect their wallet
 * Shows the connected address when a wallet is connected,
 * and lets them disconnect by clicking the button.
 */
export function CustomWalletButton() {
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const [isModalOpen, setModalOpen] = useState(false)

  // Shorten the address to `0x1234…abcd`
  const shortAddress = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : ''

  // If connected, show a “disconnect” button
  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
        title="Click to disconnect"
      >
        {`Disconnect: ${shortAddress}`}
      </button>
    )
  }

  // Otherwise, show the “Connect Wallet” button + modal
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
      >
        Connect Wallet
      </button>

      <CustomLogin
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

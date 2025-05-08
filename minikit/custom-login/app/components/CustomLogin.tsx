import React from 'react'
import { useConnect, useAccount, Connector } from 'wagmi'

/** A simple, full-screen modal overlay for wallet connection */
export function CustomLogin({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { connectors, connect, isPending } = useConnect()
  const { isConnected } = useAccount()

  if (!isOpen) return null
  if (isConnected) {
    // auto-close when already connected
    onClose()
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Connect Your Wallet</h2>
        <ul>
          {connectors.map((c: Connector) => {
            const busy = isPending
            return (
              <li key={c.id} className="mb-2">
                <button
                  className={`w-full px-4 py-2 rounded ${
                    !c.ready
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : busy
                      ? 'bg-blue-200 dark:bg-blue-800'
                      : 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500'
                  }`}
                  disabled={!c.ready || busy}
                  onClick={() => connect({ connector: c })}
                >
                  {c.name}
                  {busy && '…'}
                  {!c.ready && ' (not available)'}
                </button>
              </li>
            )
          })}
        </ul>
        <button
          className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

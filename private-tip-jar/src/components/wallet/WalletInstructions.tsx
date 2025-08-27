'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useState } from 'react'

export function WalletInstructions() {
  const { connected, wallets } = useWallet()
  const [showInstructions, setShowInstructions] = useState(false)

  if (connected) {
    return null
  }

  const leoWallet = wallets.find(w => w.adapter.name === 'Leo Wallet')
  const isLeoInstalled = leoWallet?.readyState === 'Installed'

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Wallet Setup</h3>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="text-sm text-white/60 hover:text-white"
        >
          {showInstructions ? 'Hide' : 'Show'} Instructions
        </button>
      </div>
      
      {!isLeoInstalled && (
        <div className="text-sm text-white/70 mb-3">
          <p>Leo Wallet extension is not installed.</p>
          <a 
            href="https://www.leo.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Install Leo Wallet →
          </a>
        </div>
      )}

      {showInstructions && (
        <div className="text-sm text-white/70 space-y-2">
          <div>
            <strong>1. Install Leo Wallet</strong>
            <p>Download and install the Leo Wallet browser extension from <a href="https://www.leo.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">leo.app</a></p>
          </div>
          <div>
            <strong>2. Create or Import Wallet</strong>
            <p>Set up your wallet in the Leo extension</p>
          </div>
          <div>
            <strong>3. Enable Testnet Network</strong>
            <p>In Leo Wallet settings, make sure "Testnet" network is enabled</p>
          </div>
          <div>
            <strong>4. Connect</strong>
            <p>Click "Connect Wallet" button above</p>
          </div>
        </div>
      )}
    </div>
  )
}
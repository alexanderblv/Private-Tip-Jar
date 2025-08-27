'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useState } from 'react'

export function SetupInstructions() {
  const { connected } = useWallet()
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (connected) {
    return null
  }
  
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-blue-400">Setup Required</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          {isExpanded ? 'Hide' : 'Show'} Instructions
        </button>
      </div>
      
      <p className="text-blue-300/80 mb-3">
        To use this app, you need to install and configure Leo Wallet for Aleo Testnet Beta.
      </p>
      
      {isExpanded && (
        <div className="space-y-3 text-sm text-blue-300/70">
          <div>
            <h4 className="font-medium text-blue-300 mb-1">1. Install Leo Wallet</h4>
            <p>Download from <a href="https://www.leo.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">leo.app</a></p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-300 mb-1">2. Network Configuration</h4>
            <p>The app will automatically configure Leo Wallet for Aleo Testnet Beta when you connect.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-300 mb-1">3. Get Test Tokens</h4>
            <p>Visit <a href="https://faucet.aleo.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">faucet.aleo.org</a> to get test tokens.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-300 mb-1">4. Connect Wallet</h4>
            <p>Click "Connect Wallet" button above to start using the app.</p>
          </div>
        </div>
      )}
    </div>
  )
}
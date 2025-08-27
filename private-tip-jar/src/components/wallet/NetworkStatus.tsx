'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { ALEO_CONFIG } from '@/lib/aleo'

export function NetworkStatus() {
  const { connected, publicKey } = useWallet()
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-white/70">
          {connected ? 'Connected to Aleo Testnet Beta' : 'Not Connected'}
        </span>
      </div>
      
      {connected && publicKey && (
        <div className="flex items-center gap-2">
          <span className="text-white/50">|</span>
          <span className="font-mono text-xs">
            {publicKey.slice(0, 6)}...{publicKey.slice(-4)}
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <span className="text-white/50">|</span>
        <span className="text-green-400 font-medium">
          {ALEO_CONFIG.networkId}
        </span>
      </div>
    </div>
  )
}
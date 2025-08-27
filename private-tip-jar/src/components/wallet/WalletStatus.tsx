'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'

export function WalletStatus() {
  const { connected, publicKey, wallet } = useWallet()
  
  const network = (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
  
  if (!connected || !publicKey) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-xs text-white/60">
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
      <span>Connected to {network}</span>
      <span>•</span>
      <span>{publicKey.slice(0, 6)}...{publicKey.slice(-4)}</span>
    </div>
  )
}
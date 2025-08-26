'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'

export function WalletConnectButton() {
  const { connected, connect, disconnect, publicKey } = useWallet()

  if (!connected) {
    return (
      <button onClick={() => connect()} className="px-3 py-1.5 rounded border border-white/20 text-sm">Connect Wallet</button>
    )
  }
  return (
    <button onClick={() => disconnect()} className="px-3 py-1.5 rounded bg-white/10 text-sm">
      {publicKey?.slice(0,6)}...{publicKey?.slice(-4)}
    </button>
  )
}
'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'

export function WalletConnectButton() {
  const { connected, connect, disconnect, publicKey, select, wallets } = useWallet()

  const doConnect = async () => {
    try {
      // Сначала выбираем кошелек Leo
      await select(LeoWalletName)
      
      // Затем подключаемся
      await connect(
        DecryptPermission.NoDecrypt,
        (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
      )
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  if (!connected) {
    return (
      <button onClick={doConnect} className="px-3 py-1.5 rounded border border-white/20 text-sm">Connect Wallet</button>
    )
  }
  return (
    <button onClick={() => disconnect()} className="px-3 py-1.5 rounded bg-white/10 text-sm">
      {publicKey?.slice(0,6)}...{publicKey?.slice(-4)}
    </button>
  )
}
'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useWalletModal } from '@demox-labs/aleo-wallet-adapter-reactui'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'
import { useEffect, useState } from 'react'

export function WalletConnectButton() {
  const { connected, connect, disconnect, publicKey, select, wallets, wallet } = useWallet()
  const { setVisible } = useWalletModal()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      
      // Проверяем доступные кошельки
      console.log('Available wallets:', wallets)
      
      // Находим Leo кошелек
      const leoWallet = wallets.find(w => w.adapter.name === LeoWalletName)
      if (!leoWallet) {
        console.error('Leo Wallet not found in available wallets')
        alert('Leo Wallet extension not installed or not detected. Please install it from https://www.leo.app/')
        setIsConnecting(false)
        return
      }
      
      // Проверяем готовность кошелька
      console.log('Leo wallet ready state:', leoWallet.readyState)
      
      // Если кошелек уже выбран, подключаемся напрямую
      if (wallet && wallet.adapter.name === LeoWalletName) {
        await connect(
          DecryptPermission.UponRequest,
          (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
        )
      } else {
        // Выбираем кошелек и подключаемся
        console.log('Selecting Leo Wallet...')
        select(LeoWalletName)
        
        // Небольшая задержка для выбора кошелька
        setTimeout(async () => {
          try {
            await connect(
              DecryptPermission.UponRequest,
              (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
            )
          } catch (error) {
            console.error('Error during connection:', error)
            if (error instanceof Error) {
              if (error.message.includes('NETWORK_NOT_GRANTED')) {
                alert('Please grant network permission in your Leo Wallet')
              } else {
                alert(`Connection error: ${error.message}`)
              }
            }
          }
        }, 100)
      }
    } catch (error) {
      console.error('Error in handleConnect:', error)
      if (error instanceof Error) {
        alert(`Connection error: ${error.message}`)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    try {
      disconnect()
    } catch (error) {
      console.error('Error disconnecting:', error)
    }
  }

  if (!connected) {
    return (
      <div className="flex gap-2">
        <button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="px-3 py-1.5 rounded border border-white/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
        <button 
          onClick={() => setVisible(true)}
          className="px-3 py-1.5 rounded bg-blue-600 text-sm hover:bg-blue-700 transition-colors"
        >
          Wallet Modal
        </button>
      </div>
    )
  }
  
  return (
    <button 
      onClick={handleDisconnect} 
      className="px-3 py-1.5 rounded bg-white/10 text-sm hover:bg-white/20 transition-colors"
    >
      {publicKey?.slice(0,6)}...{publicKey?.slice(-4)}
    </button>
  )
}
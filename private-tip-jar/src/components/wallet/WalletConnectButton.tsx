'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'
import { useEffect, useState } from 'react'

export function WalletConnectButton() {
  const { connected, connect, disconnect, publicKey, select, wallets, wallet } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [shouldConnect, setShouldConnect] = useState(false)

  // Эффект для подключения после выбора кошелька
  useEffect(() => {
    if (shouldConnect && wallet && wallet.adapter.name === LeoWalletName) {
      const performConnect = async () => {
        try {
          console.log('Connecting to selected wallet:', wallet.adapter.name)
          await connect(
            DecryptPermission.NoDecrypt,
            (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
          )
          console.log('Successfully connected!')
        } catch (error) {
          console.error('Error during connection:', error)
          if (error instanceof Error) {
            if (error.message.includes('NETWORK_NOT_GRANTED') || error.message.includes('NETWORK_NOT_GRANTED')) {
              alert('🔗 Network Permission Required\n\nPlease follow these steps:\n1. Open your Leo Wallet extension\n2. Go to Settings → Networks\n3. Make sure "Testnet" is enabled\n4. Try connecting again')
            } else if (error.message.includes('User rejected')) {
              alert('Connection was cancelled by user')
            } else {
              alert(`Connection error: ${error.message}`)
            }
          }
        } finally {
          setIsConnecting(false)
          setShouldConnect(false)
        }
      }
      performConnect()
    }
  }, [wallet, shouldConnect, connect])

  const doConnect = async () => {
    try {
      setIsConnecting(true)
      
      // Проверяем доступные кошельки
      console.log('Available wallets:', wallets)
      console.log('Current wallet:', wallet)
      
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
        try {
          await connect(
            DecryptPermission.NoDecrypt,
            (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
          )
        } catch (error) {
          console.error('Error in direct connect:', error)
          if (error instanceof Error) {
            if (error.message.includes('NETWORK_NOT_GRANTED') || error.message.includes('NETWORK_NOT_GRANTED')) {
              alert('🔗 Network Permission Required\n\nPlease follow these steps:\n1. Open your Leo Wallet extension\n2. Go to Settings → Networks\n3. Make sure "Testnet" is enabled\n4. Try connecting again')
            } else if (error.message.includes('User rejected')) {
              alert('Connection was cancelled by user')
            } else {
              alert(`Connection error: ${error.message}`)
            }
          }
        }
        setIsConnecting(false)
      } else {
        // Выбираем кошелек и устанавливаем флаг для подключения
        console.log('Selecting Leo Wallet...')
        select(LeoWalletName)
        setShouldConnect(true)
      }
    } catch (error) {
      console.error('Error in doConnect:', error)
      setIsConnecting(false)
      if (error instanceof Error) {
        alert(`Unexpected error: ${error.message}`)
      }
    }
  }

  if (!connected) {
    return (
      <button 
        onClick={doConnect} 
        disabled={isConnecting}
        className="px-3 py-1.5 rounded border border-white/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    )
  }
  return (
    <button onClick={() => disconnect()} className="px-3 py-1.5 rounded bg-white/10 text-sm">
      {publicKey?.slice(0,6)}...{publicKey?.slice(-4)}
    </button>
  )
}
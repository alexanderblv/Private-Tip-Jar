'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'
import { useEffect, useState } from 'react'
import { WalletTroubleshooting } from './WalletTroubleshooting'

export function WalletConnectButton() {
  const { connected, connect, disconnect, publicKey, select, wallets, wallet } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [shouldConnect, setShouldConnect] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Эффект для подключения после выбора кошелька
  useEffect(() => {
    if (shouldConnect && wallet && wallet.adapter.name === LeoWalletName) {
      const performConnect = async () => {
        try {
          setError(null)
          console.log('Connecting to selected wallet:', wallet.adapter.name)
          
          // Get the network from environment or default to testnet
          const network = (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
          console.log('Using network:', network)
          
          await connect(DecryptPermission.NoDecrypt, network)
          console.log('Successfully connected!')
        } catch (error) {
          console.error('Error during connection:', error)
          if (error instanceof Error) {
            if (error.message.includes('NETWORK_NOT_GRANTED')) {
              setError('Network permission not granted. Please check your Leo Wallet settings and ensure it has permission to access this site.')
            } else if (error.message.includes('User rejected')) {
              setError('Connection was rejected by the user.')
            } else if (error.message.includes('Wallet not found')) {
              setError('Leo Wallet not found. Please make sure the extension is installed and enabled.')
            } else {
              setError(`Connection error: ${error.message}`)
            }
          } else {
            setError('An unknown error occurred. Please try again.')
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
      setError(null)
      
      // Проверяем доступные кошельки
      console.log('Available wallets:', wallets)
      console.log('Current wallet:', wallet)
      
      // Находим Leo кошелек
      const leoWallet = wallets.find(w => w.adapter.name === LeoWalletName)
      if (!leoWallet) {
        console.error('Leo Wallet not found in available wallets')
        setError('Leo Wallet extension not installed or not detected. Please install it from https://www.leo.app/')
        setIsConnecting(false)
        return
      }
      
      // Проверяем готовность кошелька
      console.log('Leo wallet ready state:', leoWallet.readyState)
      
      if (leoWallet.readyState !== 'Installed') {
        setError('Leo Wallet is not ready. Please make sure the extension is properly installed and enabled.')
        setIsConnecting(false)
        return
      }
      
      // Если кошелек уже выбран, подключаемся напрямую
      if (wallet && wallet.adapter.name === LeoWalletName) {
        const network = (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
        await connect(DecryptPermission.NoDecrypt, network)
        setIsConnecting(false)
      } else {
        // Выбираем кошелек и устанавливаем флаг для подключения
        console.log('Selecting Leo Wallet...')
        select(LeoWalletName)
        setShouldConnect(true)
      }
    } catch (error) {
      console.error('Error in doConnect:', error)
      setError('Failed to connect to wallet. Please try again.')
      setIsConnecting(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  if (!connected) {
    return (
      <div className="flex flex-col gap-2">
        <button 
          onClick={doConnect} 
          disabled={isConnecting}
          className="px-3 py-1.5 rounded border border-white/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
        {error && (
          <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded border border-red-500/20">
            <div className="flex justify-between items-start">
              <span>{error}</span>
              <button onClick={clearError} className="text-red-300 hover:text-red-100 ml-2">×</button>
            </div>
            <WalletTroubleshooting />
          </div>
        )}
      </div>
    )
  }
  return (
    <button onClick={() => disconnect()} className="px-3 py-1.5 rounded bg-white/10 text-sm hover:bg-white/20">
      {publicKey?.slice(0,6)}...{publicKey?.slice(-4)}
    </button>
  )
}
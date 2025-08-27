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
          console.log('Using network: Testnet')
          // Add a small delay to ensure wallet is ready
          await new Promise(resolve => setTimeout(resolve, 100))
          await connect(DecryptPermission.NoDecrypt, WalletAdapterNetwork.Testnet)
          console.log('Successfully connected!')
        } catch (error) {
          console.error('Error during connection:', error)
          console.error('Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
          })
          console.error('Wallet adapter state:', {
            name: wallet?.adapter.name,
            readyState: wallet?.adapter.readyState,
            connected: wallet?.adapter.connected,
            connecting: wallet?.adapter.connecting
          })
          if (error instanceof Error) {
            console.error('Full error object:', error)
            if (error.message.includes('NETWORK_NOT_GRANTED')) {
              alert('Network permission denied. Please:\n1. Open Leo Wallet\n2. Go to Settings > Network\n3. Select "Testnet"\n4. Grant network permission when prompted')
            } else if (error.message.includes('NETWORK')) {
              alert('Network configuration error. Please ensure Leo Wallet is configured for Testnet network.')
            } else if (error.message.includes('unknown error')) {
              alert('Connection failed. Please try:\n1. Refreshing the page\n2. Ensuring Leo Wallet is unlocked\n3. Checking if Leo Wallet is properly installed')
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
      console.log('Environment network setting:', process.env.NEXT_PUBLIC_ALEO_NETWORK)
      console.log('Available WalletAdapterNetwork values:', Object.values(WalletAdapterNetwork))
      console.log('Connect function:', connect)
      console.log('Wallet adapter:', wallet?.adapter)
      
      // Находим Leo кошелек
      const leoWallet = wallets.find(w => w.adapter.name === LeoWalletName)
      if (!leoWallet) {
        console.error('Leo Wallet not found in available wallets')
        alert('Leo Wallet extension not installed or not detected. Please install it from https://www.leo.app/')
        setIsConnecting(false)
        return
      }
      
      // Проверяем, что кошелек готов к подключению
      if (leoWallet.readyState !== 'Installed') {
        console.error('Leo Wallet not ready:', leoWallet.readyState)
        alert('Leo Wallet is not ready. Please make sure it is properly installed and unlocked.')
        setIsConnecting(false)
        return
      }
      
            // Проверяем готовность кошелька
      console.log('Leo wallet ready state:', leoWallet.readyState)
      console.log('Leo wallet adapter:', leoWallet.adapter)
      
      // Additional checks before connecting
      if (!leoWallet.adapter) {
        console.error('Leo Wallet adapter not available')
        alert('Leo Wallet adapter not available. Please refresh the page and try again.')
        setIsConnecting(false)
        return
      }
      
      // Try to connect directly
      console.log('Attempting direct connection...')
      try {
        // Try connection with network parameter
        await connect(DecryptPermission.NoDecrypt, WalletAdapterNetwork.Testnet)
        console.log('Direct connection successful!')
      } catch (directError) {
        console.log('Direct connection failed, trying selection method...')
        // If direct connection fails, try the selection method
        if (wallet && wallet.adapter.name === LeoWalletName) {
          console.log('Wallet already selected, retrying connection...')
          await connect(DecryptPermission.NoDecrypt, WalletAdapterNetwork.Testnet)
        } else {
          // Выбираем кошелек и устанавливаем флаг для подключения
          console.log('Selecting Leo Wallet...')
          select(LeoWalletName)
          setShouldConnect(true)
        }
      }
      setIsConnecting(false)
    } catch (error) {
      console.error('Error in doConnect:', error)
      setIsConnecting(false)
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
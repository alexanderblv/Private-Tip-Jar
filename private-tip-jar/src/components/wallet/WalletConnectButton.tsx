'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'
import { useEffect, useState } from 'react'
import { WalletTroubleshooting } from './WalletTroubleshooting'
import { WalletDiagnostics } from './WalletDiagnostics'
import { WALLET_CONFIG } from '@/lib/wallet-config'
import { 
  detectLeoWallet, 
  tryOpenLeoWallet, 
  waitForLeoWallet, 
  createLeoWalletConnectionPrompt 
} from '@/lib/leo-wallet-helper'

export function WalletConnectButton() {
  const { connected, connect, disconnect, publicKey, select, wallets, wallet } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [shouldConnect, setShouldConnect] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [connectionStrategy, setConnectionStrategy] = useState<'normal' | 'delayed' | 'manual'>('normal')
  const [leoWalletStatus, setLeoWalletStatus] = useState(detectLeoWallet())

  // Update Leo Wallet status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setLeoWalletStatus(detectLeoWallet())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Эффект для подключения после выбора кошелька
  useEffect(() => {
    if (shouldConnect && wallet && wallet.adapter.name === LeoWalletName) {
      const performConnect = async () => {
        try {
          setError(null)
          console.log('Connecting to selected wallet:', wallet.adapter.name)
          
          // Use the configured network
          const network = WALLET_CONFIG.network
          console.log('Using network:', network)
          
          // Try different connection strategies
          if (connectionStrategy === 'delayed') {
            // Wait a bit before connecting to allow wallet to initialize
            console.log('Using delayed connection strategy...')
            await new Promise(resolve => setTimeout(resolve, 2000))
          } else if (connectionStrategy === 'manual') {
            // For manual strategy, show instructions and wait
            console.log('Using manual connection strategy...')
            createLeoWalletConnectionPrompt()
            await new Promise(resolve => setTimeout(resolve, 5000))
          }
          
          await connect(DecryptPermission.NoDecrypt, network)
          console.log('Successfully connected!')
          setRetryCount(0) // Reset retry count on success
          setConnectionStrategy('normal') // Reset strategy
        } catch (error) {
          console.error('Error during connection:', error)
          if (error instanceof Error) {
            if (error.message.includes('NETWORK_NOT_GRANTED')) {
              setError('Network permission not granted. Please open your Leo Wallet extension and ensure it has permission to access this site. You may need to approve the connection in the wallet popup.')
            } else if (error.message.includes('User rejected')) {
              setError('Connection was rejected by the user.')
            } else if (error.message.includes('Wallet not found')) {
              setError('Leo Wallet not found. Please make sure the extension is installed and enabled.')
            } else if (error.message.includes('unknown error')) {
              // This is likely the NETWORK_NOT_GRANTED error wrapped in a generic message
              setError('Network permission issue detected. Please check your Leo Wallet extension settings and try again.')
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
  }, [wallet, shouldConnect, connect, connectionStrategy])

  const doConnect = async () => {
    try {
      setIsConnecting(true)
      setError(null)
      
      // Check Leo Wallet status first
      const status = detectLeoWallet()
      if (!status.isInstalled) {
        setError('Leo Wallet extension not installed or not detected. Please install it from https://www.leo.app/')
        setIsConnecting(false)
        return
      }

      if (!status.isReady) {
        setError('Leo Wallet is not ready. Please make sure the extension is properly installed and enabled.')
        setIsConnecting(false)
        return
      }
      
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
        await connect(DecryptPermission.NoDecrypt, WALLET_CONFIG.network)
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

  const retryConnection = () => {
    setRetryCount(prev => prev + 1)
    setError(null)
    
    // Try different strategies based on retry count
    if (retryCount >= 2) {
      setConnectionStrategy('delayed')
    } else if (retryCount >= 4) {
      setConnectionStrategy('manual')
    }
    
    doConnect()
  }

  const clearError = () => {
    setError(null)
    setRetryCount(0)
    setConnectionStrategy('normal')
  }

  const openLeoWallet = () => {
    const success = tryOpenLeoWallet()
    if (!success) {
      // If we can't open it programmatically, show the manual prompt
      createLeoWalletConnectionPrompt()
    }
  }

  const forceManualConnection = () => {
    setConnectionStrategy('manual')
    createLeoWalletConnectionPrompt()
    setError('Please manually open your Leo Wallet extension and approve the connection. Then click "Retry Connection" below.')
  }

  const showConnectionGuide = () => {
    createLeoWalletConnectionPrompt()
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
            
            {/* Special handling for network permission errors */}
            {error.includes('Network permission') && (
              <div className="mt-2 p-2 bg-blue-900/20 border border-blue-500/20 rounded">
                <div className="text-xs text-blue-300 mb-2">
                  <strong>Quick Fix:</strong>
                </div>
                <div className="space-y-1">
                  <button 
                    onClick={openLeoWallet}
                    className="text-xs text-blue-400 hover:text-blue-300 underline block"
                  >
                    → Open Leo Wallet Extension
                  </button>
                  <button 
                    onClick={retryConnection}
                    className="text-xs text-blue-400 hover:text-blue-300 underline block"
                  >
                    → Retry Connection (Attempt {retryCount + 1})
                  </button>
                  <button 
                    onClick={showConnectionGuide}
                    className="text-xs text-green-400 hover:text-green-300 underline block"
                  >
                    → Show Connection Guide
                  </button>
                  {retryCount >= 2 && (
                    <button 
                      onClick={forceManualConnection}
                      className="text-xs text-yellow-400 hover:text-yellow-300 underline block"
                    >
                      → Force Manual Connection
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <WalletTroubleshooting />
            <WalletDiagnostics />
          </div>
        )}
        {!error && <WalletDiagnostics />}
      </div>
    )
  }
  return (
    <button onClick={() => disconnect()} className="px-3 py-1.5 rounded bg-white/10 text-sm hover:bg-white/20">
      {publicKey?.slice(0,6)}...{publicKey?.slice(-4)}
    </button>
  )
}
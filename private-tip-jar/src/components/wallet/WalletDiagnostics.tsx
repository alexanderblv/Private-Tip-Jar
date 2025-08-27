'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'
import { useState } from 'react'

export function WalletDiagnostics() {
  const { wallets, wallet, connected } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  const leoWallet = wallets.find(w => w.adapter.name === LeoWalletName)
  
  const diagnostics = {
    browser: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server-side',
    protocol: typeof window !== 'undefined' ? window.location.protocol : 'Unknown',
    origin: typeof window !== 'undefined' ? window.location.origin : 'Unknown',
    leoWalletInstalled: !!leoWallet,
    leoWalletReady: leoWallet?.readyState === 'Installed',
    walletConnected: connected,
    selectedWallet: wallet?.adapter.name || 'None',
    availableWallets: wallets.map(w => w.adapter.name),
  }

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-gray-400 hover:text-gray-300 underline"
      >
        {isOpen ? 'Hide' : 'Show'} Connection Diagnostics
      </button>
      
      {isOpen && (
        <div className="mt-2 p-3 bg-gray-800/30 rounded border border-gray-600 text-xs">
          <div className="space-y-1">
            <div><strong>Browser:</strong> {diagnostics.browser.split(' ')[0]}</div>
            <div><strong>Protocol:</strong> {diagnostics.protocol}</div>
            <div><strong>Origin:</strong> {diagnostics.origin}</div>
            <div><strong>Leo Wallet Installed:</strong> {diagnostics.leoWalletInstalled ? '✅ Yes' : '❌ No'}</div>
            <div><strong>Leo Wallet Ready:</strong> {diagnostics.leoWalletReady ? '✅ Yes' : '❌ No'}</div>
            <div><strong>Wallet Connected:</strong> {diagnostics.walletConnected ? '✅ Yes' : '❌ No'}</div>
            <div><strong>Selected Wallet:</strong> {diagnostics.selectedWallet}</div>
            <div><strong>Available Wallets:</strong> {diagnostics.availableWallets.join(', ') || 'None'}</div>
          </div>
          
          {!diagnostics.leoWalletInstalled && (
            <div className="mt-2 p-2 bg-red-900/20 border border-red-500/20 rounded">
              <div className="text-red-300">
                <strong>Issue:</strong> Leo Wallet extension not detected. Please install it from{' '}
                <a href="https://www.leo.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  https://www.leo.app/
                </a>
              </div>
            </div>
          )}
          
          {diagnostics.leoWalletInstalled && !diagnostics.leoWalletReady && (
            <div className="mt-2 p-2 bg-yellow-900/20 border border-yellow-500/20 rounded">
              <div className="text-yellow-300">
                <strong>Issue:</strong> Leo Wallet is installed but not ready. Try refreshing the page or restarting the extension.
              </div>
            </div>
          )}
          
          {diagnostics.protocol !== 'https:' && (
            <div className="mt-2 p-2 bg-yellow-900/20 border border-yellow-500/20 rounded">
              <div className="text-yellow-300">
                <strong>Note:</strong> Using HTTP instead of HTTPS. Some wallet features may be limited.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'

export function WalletTroubleshooting() {
  const [isOpen, setIsOpen] = useState(false)

  const troubleshootingSteps = [
    {
      title: '1. Install Leo Wallet Extension',
      description: 'Make sure you have the Leo Wallet browser extension installed from https://www.leo.app/',
      action: 'Visit Leo Wallet'
    },
    {
      title: '2. Enable the Extension',
      description: 'Ensure the Leo Wallet extension is enabled in your browser extensions menu',
      action: 'Check Extensions'
    },
    {
      title: '3. Grant Site Permissions',
      description: 'Allow Leo Wallet to access this website in your browser settings',
      action: 'Check Permissions'
    },
    {
      title: '4. Check Network Settings',
      description: 'Make sure your Leo Wallet is configured for the correct network (Testnet/Mainnet)',
      action: 'Open Leo Wallet'
    },
    {
      title: '5. Clear Browser Cache',
      description: 'Try clearing your browser cache and cookies, then refresh the page',
      action: 'Clear Cache'
    },
    {
      title: '6. Try Different Browser',
      description: 'If issues persist, try using a different browser or incognito mode',
      action: 'Try Incognito'
    }
  ]

  const handleAction = (action: string) => {
    switch (action) {
      case 'Visit Leo Wallet':
        window.open('https://www.leo.app/', '_blank')
        break
      case 'Check Extensions':
        // This will open browser extensions page (works in most browsers)
        window.open('chrome://extensions/', '_blank')
        break
      case 'Check Permissions':
        // This will open site settings (works in most browsers)
        window.open('chrome://settings/content', '_blank')
        break
      case 'Open Leo Wallet':
        // Try to open Leo Wallet extension
        if (typeof window !== 'undefined' && (window as any).leoWallet) {
          (window as any).leoWallet.open()
        }
        break
      case 'Clear Cache':
        // Show instructions for clearing cache
        alert('To clear cache:\n1. Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)\n2. Select "Cached images and files"\n3. Click "Clear data"\n4. Refresh this page')
        break
      case 'Try Incognito':
        window.open(window.location.href, '_blank')
        break
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-blue-400 hover:text-blue-300 underline"
      >
        {isOpen ? 'Hide' : 'Show'} Troubleshooting Guide
      </button>
      
      {isOpen && (
        <div className="mt-3 p-4 bg-gray-800/50 rounded border border-gray-700">
          <h4 className="text-sm font-medium mb-3 text-gray-200">Troubleshooting Steps:</h4>
          <div className="space-y-3">
            {troubleshootingSteps.map((step, index) => (
              <div key={index} className="text-xs">
                <div className="font-medium text-gray-200">{step.title}</div>
                <div className="text-gray-400 mt-1">{step.description}</div>
                <button
                  onClick={() => handleAction(step.action)}
                  className="text-blue-400 hover:text-blue-300 underline mt-1"
                >
                  {step.action}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/20 rounded">
            <div className="text-xs text-yellow-300">
              <strong>Note:</strong> If you're still experiencing issues, try refreshing the page or restarting your browser. 
              The NETWORK_NOT_GRANTED error usually indicates that the wallet extension needs permission to access this site.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
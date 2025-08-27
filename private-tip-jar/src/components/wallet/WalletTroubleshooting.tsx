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
      description: 'Make sure your Leo Wallet is configured for Testnet 3 network',
      action: 'Open Leo Wallet'
    },
    {
      title: '5. Approve Connection',
      description: 'Look for a Leo Wallet popup and approve the connection request',
      action: 'Check for Popup'
    },
    {
      title: '6. Clear Browser Cache',
      description: 'Try clearing your browser cache and cookies, then refresh the page',
      action: 'Clear Cache'
    },
    {
      title: '7. Try Different Browser',
      description: 'If issues persist, try using a different browser or incognito mode',
      action: 'Try Incognito'
    }
  ]

  const networkPermissionSteps = [
    {
      title: '1. Open Leo Wallet Extension',
      description: 'Click on the Leo Wallet icon in your browser toolbar',
      action: 'Open Extension'
    },
    {
      title: '2. Check Network Settings',
      description: 'In Leo Wallet, go to Settings → Network and ensure Testnet 3 is selected',
      action: 'Check Network'
    },
    {
      title: '3. Approve Site Access',
      description: 'In Leo Wallet settings, make sure this site is allowed to connect',
      action: 'Check Site Access'
    },
    {
      title: '4. Restart Extension',
      description: 'Try disabling and re-enabling the Leo Wallet extension',
      action: 'Restart Extension'
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
      case 'Open Extension':
        // Try to open Leo Wallet extension
        if (typeof window !== 'undefined' && (window as any).leoWallet) {
          (window as any).leoWallet.open()
        }
        break
      case 'Check for Popup':
        alert('Look for a Leo Wallet popup window. If you don\'t see one, try clicking the Leo Wallet extension icon in your browser toolbar.')
        break
      case 'Clear Cache':
        // Show instructions for clearing cache
        alert('To clear cache:\n1. Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)\n2. Select "Cached images and files"\n3. Click "Clear data"\n4. Refresh this page')
        break
      case 'Try Incognito':
        window.open(window.location.href, '_blank')
        break
      case 'Check Network':
        alert('In Leo Wallet:\n1. Open the extension\n2. Go to Settings\n3. Select "Network"\n4. Choose "Testnet 3"\n5. Try connecting again')
        break
      case 'Check Site Access':
        alert('In Leo Wallet:\n1. Open the extension\n2. Go to Settings\n3. Look for "Connected Sites" or "Permissions"\n4. Make sure this site is allowed')
        break
      case 'Restart Extension':
        alert('To restart Leo Wallet:\n1. Go to chrome://extensions/\n2. Find Leo Wallet\n3. Toggle it off and on\n4. Refresh this page and try again')
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
          
          {/* Network Permission Specific Section */}
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/20 rounded">
            <div className="text-xs text-yellow-300 mb-2">
              <strong>🔧 For NETWORK_NOT_GRANTED Error:</strong>
            </div>
            <div className="space-y-2">
              {networkPermissionSteps.map((step, index) => (
                <div key={`network-${index}`} className="text-xs">
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
          </div>

          {/* General Troubleshooting */}
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
          
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/20 rounded">
            <div className="text-xs text-blue-300">
              <strong>💡 Pro Tips:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Make sure you're using Testnet 3 in Leo Wallet</li>
                <li>• Try refreshing the page after making changes</li>
                <li>• Check if your browser is blocking popups</li>
                <li>• Ensure you have a stable internet connection</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
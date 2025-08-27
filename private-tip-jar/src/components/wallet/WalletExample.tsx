'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useWalletModal } from '@demox-labs/aleo-wallet-adapter-reactui'
import { WalletConnectButton } from './WalletConnectButton'

export function WalletExample() {
  const { connected, publicKey, signMessage } = useWallet()
  const { setVisible } = useWalletModal()

  const handleSignMessage = async () => {
    if (!connected) {
      alert('Please connect your wallet first')
      return
    }

    if (!signMessage) {
      alert('Sign message function not available')
      return
    }

    try {
      const message = 'Hello from Private Tip Jar!'
      const messageBytes = new TextEncoder().encode(message)
      const signature = await signMessage(messageBytes)
      console.log('Message signed:', signature)
      alert('Message signed successfully!')
    } catch (error) {
      console.error('Error signing message:', error)
      alert('Failed to sign message')
    }
  }

  return (
    <div className="space-y-6 p-6 bg-white/5 rounded-lg">
      <h2 className="text-xl font-semibold">Wallet Integration Example</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Connection Status</h3>
          <div className="flex items-center gap-4">
            <WalletConnectButton />
            <span className={`px-2 py-1 rounded text-sm ${
              connected ? 'bg-green-600' : 'bg-red-600'
            }`}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {connected && publicKey && (
          <div>
            <h3 className="text-lg font-medium mb-2">Wallet Info</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Public Key:</strong> {publicKey}</p>
              <p><strong>Short Address:</strong> {publicKey.slice(0, 6)}...{publicKey.slice(-4)}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium mb-2">Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-1.5 rounded bg-blue-600 text-sm hover:bg-blue-700 transition-colors"
            >
              Open Wallet Modal
            </button>
            
            {connected && (
              <button
                onClick={handleSignMessage}
                className="px-3 py-1.5 rounded bg-green-600 text-sm hover:bg-green-700 transition-colors"
              >
                Sign Message
              </button>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Usage Instructions</h3>
          <div className="text-sm space-y-2 text-white/80">
            <p>1. Click "Connect Wallet" to connect directly to Leo Wallet</p>
            <p>2. Click "Wallet Modal" to open the wallet selection modal</p>
            <p>3. Once connected, you can sign messages</p>
            <p>4. Check the browser console for detailed logs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
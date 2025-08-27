'use client'

import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { useEffect, useState } from 'react'
import { detectLeoWallet, tryOpenLeoWallet, createLeoWalletConnectionPrompt } from '@/lib/leo-wallet-helper'
import { WALLET_CONFIG } from '@/lib/wallet-config'

export default function WalletTestPage() {
  const { wallets, wallet, connected, connect, disconnect } = useWallet()
  const [leoStatus, setLeoStatus] = useState(detectLeoWallet())
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setLeoStatus(detectLeoWallet())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const runTests = () => {
    const results: string[] = []
    
    // Test 1: Check if Leo Wallet is detected
    if (leoStatus.isInstalled) {
      results.push('✅ Leo Wallet extension detected')
    } else {
      results.push('❌ Leo Wallet extension not detected')
    }

    // Test 2: Check if Leo Wallet is ready
    if (leoStatus.isReady) {
      results.push('✅ Leo Wallet is ready')
    } else {
      results.push('❌ Leo Wallet is not ready')
    }

    // Test 3: Check if wallet adapter found Leo Wallet
    const leoWallet = wallets.find(w => w.adapter.name === LeoWalletName)
    if (leoWallet) {
      results.push('✅ Wallet adapter found Leo Wallet')
    } else {
      results.push('❌ Wallet adapter did not find Leo Wallet')
    }

    // Test 4: Check wallet ready state
    if (leoWallet?.readyState === 'Installed') {
      results.push('✅ Leo Wallet ready state: Installed')
    } else {
      results.push(`❌ Leo Wallet ready state: ${leoWallet?.readyState || 'Unknown'}`)
    }

    // Test 5: Check connection status
    if (connected) {
      results.push('✅ Wallet is connected')
    } else {
      results.push('❌ Wallet is not connected')
    }

    // Test 6: Check browser environment
    if (typeof window !== 'undefined') {
      results.push('✅ Running in browser environment')
    } else {
      results.push('❌ Not running in browser environment')
    }

    // Test 7: Check protocol
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      results.push('✅ Using HTTPS protocol')
    } else if (typeof window !== 'undefined' && window.location.protocol === 'http:') {
      results.push('⚠️ Using HTTP protocol (may cause issues)')
    } else {
      results.push('❌ Protocol check failed')
    }

    setTestResults(results)
  }

  const testConnection = async () => {
    try {
      const leoWallet = wallets.find(w => w.adapter.name === LeoWalletName)
      if (leoWallet) {
        await connect(DecryptPermission.NoDecrypt, WALLET_CONFIG.network)
        setTestResults(prev => [...prev, '✅ Connection test successful'])
      } else {
        setTestResults(prev => [...prev, '❌ No Leo Wallet found for connection test'])
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Connection test failed: ${error}`])
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Leo Wallet Connection Test</h1>
      
      <div className="space-y-6">
        {/* Current Status */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Current Status</h2>
          <div className="space-y-2 text-sm">
            <div>Leo Wallet Installed: {leoStatus.isInstalled ? '✅ Yes' : '❌ No'}</div>
            <div>Leo Wallet Ready: {leoStatus.isReady ? '✅ Yes' : '❌ No'}</div>
            <div>Wallet Connected: {connected ? '✅ Yes' : '❌ No'}</div>
            <div>Available Wallets: {wallets.length}</div>
            <div>Selected Wallet: {wallet?.adapter.name || 'None'}</div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Tests</h2>
          <div className="space-x-2">
            <button 
              onClick={runTests}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Run Diagnostic Tests
            </button>
            <button 
              onClick={testConnection}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Test Connection
            </button>
            <button 
              onClick={() => tryOpenLeoWallet()}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Try Open Leo Wallet
            </button>
            <button 
              onClick={() => createLeoWalletConnectionPrompt()}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Show Connection Guide
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3">Test Results</h2>
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm">{result}</div>
              ))}
            </div>
          </div>
        )}

        {/* Troubleshooting */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Troubleshooting</h2>
          <div className="text-sm space-y-2">
            <p>If you're seeing the NETWORK_NOT_GRANTED error:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Make sure Leo Wallet extension is installed and enabled</li>
              <li>Click the Leo Wallet icon in your browser toolbar</li>
              <li>Ensure you're on Testnet 3 network</li>
              <li>Approve the connection when prompted</li>
              <li>Try refreshing the page and connecting again</li>
            </ol>
          </div>
        </div>

        {/* Connection Status */}
        {connected && (
          <div className="bg-green-900/20 border border-green-500/20 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3 text-green-300">✅ Connected Successfully!</h2>
            <p className="text-sm text-green-200">
              Your Leo Wallet is connected and ready to use.
            </p>
            <button 
              onClick={() => disconnect()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
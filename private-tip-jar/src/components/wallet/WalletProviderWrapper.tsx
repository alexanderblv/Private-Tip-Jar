'use client'

import { ReactNode, useMemo, useEffect } from 'react'
import {
  WalletProvider,
} from '@demox-labs/aleo-wallet-adapter-react'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { WALLET_CONFIG } from '@/lib/wallet-config'
import { logEnvironmentInfo } from '@/lib/env-validation'

export function WalletProviderWrapper({ children }: { children: ReactNode }) {
  const adapters = useMemo(() => [
    new LeoWalletAdapter({
      appName: WALLET_CONFIG.appName,
      appUrl: WALLET_CONFIG.appUrl,
      network: WALLET_CONFIG.network
    }),
  ], [])

  useEffect(() => {
    logEnvironmentInfo()
  }, [])

  return (
    <WalletProvider 
      wallets={adapters} 
      autoConnect={WALLET_CONFIG.autoConnect}
      onError={(error) => {
        console.error('Wallet provider error:', error)
      }}
    >
      {children}
    </WalletProvider>
  )
}
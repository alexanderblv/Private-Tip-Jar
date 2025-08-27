'use client'

import { ReactNode, useMemo, useEffect } from 'react'
import {
  WalletProvider,
} from '@demox-labs/aleo-wallet-adapter-react'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { logEnvironmentInfo } from '@/lib/env-validation'
import { WALLET_CONFIG } from '@/lib/wallet-config'

export function WalletProviderWrapper({ children }: { children: ReactNode }) {
  const adapters = useMemo(() => [
    new LeoWalletAdapter({
      appName: WALLET_CONFIG.appName
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
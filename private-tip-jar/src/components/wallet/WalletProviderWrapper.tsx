'use client'

import { ReactNode, useMemo } from 'react'
import {
  WalletProvider,
} from '@demox-labs/aleo-wallet-adapter-react'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'

export function WalletProviderWrapper({ children }: { children: ReactNode }) {
  const adapters = useMemo(() => [
    new LeoWalletAdapter({
      appName: 'Private Tip Jar'
    }),
  ], [])

  return (
    <WalletProvider 
      wallets={adapters} 
      autoConnect={false}
    >
      {children}
    </WalletProvider>
  )
}
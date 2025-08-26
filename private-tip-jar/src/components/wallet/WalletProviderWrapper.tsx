'use client'

import { ReactNode, useMemo } from 'react'
import {
  WalletProvider,
} from '@demox-labs/aleo-wallet-adapter-react'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'

export function WalletProviderWrapper({ children }: { children: ReactNode }) {
  const adapters = useMemo(() => [
    new LeoWalletAdapter(),
  ], [])

  return (
    <WalletProvider wallets={adapters} autoConnect>
      {children}
    </WalletProvider>
  )
}
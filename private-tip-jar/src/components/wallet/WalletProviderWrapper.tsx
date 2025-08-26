'use client'

import { ReactNode, useMemo } from 'react'
import {
  WalletProvider,
} from '@demox-labs/aleo-wallet-adapter-react'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { WalletConnectWalletAdapter } from '@demox-labs/aleo-wallet-adapter-walletconnect'

export function WalletProviderWrapper({ children }: { children: ReactNode }) {
  const adapters = useMemo(() => [
    new LeoWalletAdapter(),
    new WalletConnectWalletAdapter({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '' })
  ], [])

  return (
    <WalletProvider wallets={adapters} autoConnect>
      {children}
    </WalletProvider>
  )
}
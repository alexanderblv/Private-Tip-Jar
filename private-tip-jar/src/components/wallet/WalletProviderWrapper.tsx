'use client'

import { ReactNode } from 'react'
import { Wallet } from './Wallet'

export function WalletProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <Wallet>
      {children}
    </Wallet>
  )
}
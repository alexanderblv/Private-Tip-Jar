import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { WalletProviderWrapper } from '@/components/wallet/WalletProviderWrapper'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'
import { WalletStatus } from '@/components/wallet/WalletStatus'

export const metadata: Metadata = {
  title: 'Private Tip Jar',
  description: 'Private tipping on Aleo',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <WalletProviderWrapper>
          <header className="border-b border-white/10">
            <nav className="container h-14 flex items-center justify-between">
              <Link href="/" className="font-semibold">Private Tip Jar</Link>
              <div className="flex items-center gap-4">
                <Link href="/workers" className="text-sm">Workers</Link>
                <Link href="/profile" className="text-sm">My Profile</Link>
                <WalletStatus />
                <WalletConnectButton />
              </div>
            </nav>
          </header>
          <main className="container py-8">
            {children}
          </main>
          <footer className="container py-8 text-xs text-white/60">
            Built for Aleo CodeSprint v4.0
          </footer>
        </WalletProviderWrapper>
      </body>
    </html>
  )
}
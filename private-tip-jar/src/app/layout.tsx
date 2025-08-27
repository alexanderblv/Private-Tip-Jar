import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { WalletProviderWrapper } from '@/components/wallet/WalletProviderWrapper'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'

export const metadata: Metadata = {
  title: 'Private Tip Jar - Anonymous Tipping on Aleo Blockchain',
  description: 'Send and receive tips completely anonymously using Aleo blockchain technology',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <WalletProviderWrapper>
          <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
            <nav className="container mx-auto h-16 flex items-center justify-between px-4">
              <Link href="/" className="font-bold text-xl flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Private Tip Jar
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link>
                <Link href="/how-it-works" className="text-sm hover:text-blue-400 transition-colors">How It Works</Link>
                <Link href="/about" className="text-sm hover:text-blue-400 transition-colors">About</Link>
                <Link href="/faq" className="text-sm hover:text-blue-400 transition-colors">FAQ</Link>
                <Link href="/waiters" className="text-sm hover:text-blue-400 transition-colors">Find Workers</Link>
                <Link href="/register" className="text-sm hover:text-blue-400 transition-colors">Register</Link>
              </div>
              <div className="flex items-center gap-4">
                <WalletConnectButton />
              </div>
            </nav>
          </header>
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-black/20 border-t border-white/10 py-8">
            <div className="container mx-auto px-4 text-center text-sm text-white/60">
              <p>Built for Aleo CodeSprint v4.0 - Private tipping on Aleo blockchain</p>
              <div className="flex justify-center gap-6 mt-4">
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
          </footer>
        </WalletProviderWrapper>
      </body>
    </html>
  )
}
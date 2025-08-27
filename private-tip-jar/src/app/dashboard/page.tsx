'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Wallet, 
  Search, 
  QrCode, 
  TrendingUp, 
  History, 
  Copy, 
  Share2, 
  Edit,
  Download,
  Star,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react'

export default function DashboardPage() {
  // Mock user data - in real app this would come from authentication
  const [userRole] = useState<'tipper' | 'worker'>('worker') // Change to 'tipper' to see different view
  const [userData] = useState({
    name: 'John Smith',
    balance: '125.50',
    totalSent: '89.25',
    totalReceived: '156.75',
    transactions: 12,
    tipJarAddress: 'aleo1abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
    todayReceived: '23.50',
    averageTip: '13.06',
    rating: 4.8,
    reviews: 23
  })

  const mockTransactions = [
    { id: 1, amount: '15.00', date: '2024-01-15', status: 'completed', type: 'sent' },
    { id: 2, amount: '8.50', date: '2024-01-14', status: 'completed', type: 'received' },
    { id: 3, amount: '25.00', date: '2024-01-13', status: 'completed', type: 'sent' },
    { id: 4, amount: '12.75', date: '2024-01-12', status: 'completed', type: 'received' },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Show toast notification
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-white/70">
            {userRole === 'tipper' 
              ? 'Ready to show appreciation to great service workers?' 
              : 'Your tip jar is ready to receive anonymous tips'
            }
          </p>
        </div>

        {userRole === 'tipper' ? (
          // Tipper Dashboard
          <div className="grid gap-6">
            {/* Balance and Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Wallet Balance</p>
                    <p className="text-2xl font-bold">{userData.balance} ALEO</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Total Sent</p>
                    <p className="text-2xl font-bold">{userData.totalSent} ALEO</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <History className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Transactions</p>
                    <p className="text-2xl font-bold">{userData.transactions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/waiters"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Find Workers</h3>
                    <p className="text-white/70">Browse service workers to tip</p>
                  </div>
                </div>
              </Link>

              <Link 
                href="/scan"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400 hover:bg-green-500/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
                    <p className="text-white/70">Quick tip via QR code</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Transaction History */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'sent' ? 'bg-red-500/20' : 'bg-green-500/20'
                      }`}>
                        {tx.type === 'sent' ? (
                          <span className="text-red-400">-</span>
                        ) : (
                          <span className="text-green-400">+</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {tx.type === 'sent' ? 'Tip Sent' : 'Tip Received'}
                        </p>
                        <p className="text-sm text-white/60">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{tx.amount} ALEO</p>
                      <p className="text-sm text-green-400">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Worker Dashboard
          <div className="grid gap-6">
            {/* Balance and Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Tip Jar Balance</p>
                    <p className="text-2xl font-bold">{userData.totalReceived} ALEO</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Today Received</p>
                    <p className="text-2xl font-bold">{userData.todayReceived} ALEO</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Average Tip</p>
                    <p className="text-2xl font-bold">{userData.averageTip} ALEO</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Rating</p>
                    <p className="text-2xl font-bold">{userData.rating}/5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip Jar Address */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Your Tip Jar Address</h3>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="flex-1 font-mono text-sm break-all">
                  {userData.tipJarAddress}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(userData.tipJarAddress)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Share profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Show QR code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Link 
                  href="/profile"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Withdraw Funds
                </button>
              </div>
            </div>

            {/* Recent Tips */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">Recent Tips Received</h3>
              <div className="space-y-4">
                {mockTransactions.filter(tx => tx.type === 'received').map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <span className="text-green-400">+</span>
                      </div>
                      <div>
                        <p className="font-medium">Anonymous Tip</p>
                        <p className="text-sm text-white/60">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{tx.amount} ALEO</p>
                      <p className="text-sm text-green-400">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
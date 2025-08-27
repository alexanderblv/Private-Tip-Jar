'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  DollarSign, 
  MessageCircle, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Wallet
} from 'lucide-react'

export default function TipPage() {
  const params = useParams()
  const router = useRouter()
  const workerId = params.id as string
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount')

  // Mock worker data - in real app this would be fetched based on workerId
  const worker = {
    id: workerId,
    name: 'Ivan Petrov',
    position: 'Waiter',
    workplace: 'Restaurant "Vkusno"',
    photo: '/api/placeholder/100/100'
  }

  const quickAmounts = [5, 10, 25, 50, 100]

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString())
  }

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleContinue = () => {
    if (parseFloat(amount) > 0) {
      setStep('confirm')
    }
  }

  const handleConfirmTip = () => {
    // In real app, this would trigger the Aleo transaction
    console.log('Sending tip:', {
      workerId,
      amount: parseFloat(amount),
      message
    })
    setStep('success')
  }

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('amount')
    } else if (step === 'success') {
      router.push('/dashboard')
    }
  }

  const formatAmount = (value: string) => {
    const num = parseFloat(value)
    return isNaN(num) ? '0.00' : num.toFixed(2)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link 
            href={`/waiter/${workerId}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            {step === 'amount' && (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-4">Send Tip to {worker.name}</h1>
                  <div className="flex items-center justify-center gap-2 text-white/70 mb-4">
                    <span>{worker.position}</span>
                    <span>•</span>
                    <span>{worker.workplace}</span>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-4">Tip Amount (ALEO)</label>
                  
                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-5 gap-3 mb-6">
                    {quickAmounts.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAmountSelect(value)}
                        className={`py-3 px-4 rounded-lg border transition-all duration-200 ${
                          amount === value.toString()
                            ? 'bg-blue-500 border-blue-400 text-white'
                            : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={amount}
                      onChange={handleCustomAmount}
                      placeholder="Enter custom amount"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-4">Message (Optional)</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave a message for the worker..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400 mb-1">Your Privacy is Protected</h4>
                      <p className="text-sm text-white/70">
                        Your tip amount and message are completely private. Only the recipient can see the details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-200"
                >
                  Continue to Confirm
                </button>
              </>
            )}

            {step === 'confirm' && (
              <>
                {/* Confirmation Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-4">Confirm Your Tip</h1>
                  <p className="text-white/70">Please review your tip details before sending</p>
                </div>

                {/* Tip Details */}
                <div className="bg-white/5 rounded-lg p-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Recipient:</span>
                      <span className="font-medium">{worker.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Amount:</span>
                      <span className="text-2xl font-bold text-green-400">{formatAmount(amount)} ALEO</span>
                    </div>
                    {message && (
                      <div className="flex justify-between items-start">
                        <span className="text-white/70">Message:</span>
                        <span className="font-medium text-right max-w-xs">{message}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-400 mb-1">Transaction Notice</h4>
                      <p className="text-sm text-white/70">
                        This transaction cannot be reversed once confirmed. Please ensure all details are correct.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmTip}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-lg font-semibold transition-all duration-200"
                  >
                    Confirm & Send Tip
                  </button>
                </div>
              </>
            )}

            {step === 'success' && (
              <>
                {/* Success Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h1 className="text-3xl font-bold mb-4">Tip Sent Successfully!</h1>
                  <p className="text-white/70">
                    Your tip of {formatAmount(amount)} ALEO has been sent to {worker.name}
                  </p>
                </div>

                {/* Transaction Details */}
                <div className="bg-white/5 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold mb-4">Transaction Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Transaction ID:</span>
                      <span className="font-mono text-sm">0x1234...5678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Amount:</span>
                      <span className="font-medium">{formatAmount(amount)} ALEO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Network Fee:</span>
                      <span className="font-medium">0.001 ALEO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Status:</span>
                      <span className="text-green-400 font-medium">Confirmed</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-medium transition-colors"
                  >
                    Back to Dashboard
                  </button>
                  <Link
                    href={`/waiter/${workerId}`}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-center transition-all duration-200"
                  >
                    View Profile
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
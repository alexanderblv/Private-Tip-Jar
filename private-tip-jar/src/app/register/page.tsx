'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, Utensils, Wallet, Building, Camera, FileText } from 'lucide-react'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const initialRole = searchParams.get('role') || ''
  const [selectedRole, setSelectedRole] = useState<'tipper' | 'worker' | ''>(initialRole as any || '')
  const [formData, setFormData] = useState({
    name: '',
    workplace: '',
    position: '',
    description: '',
    photo: null as File | null
  })

  const handleRoleSelect = (role: 'tipper' | 'worker') => {
    setSelectedRole(role)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log('Registration data:', { role: selectedRole, ...formData })
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h1 className="text-3xl font-bold mb-8 text-center">Join Private Tip Jar</h1>

            {!selectedRole ? (
              // Role Selection
              <div className="space-y-6">
                <p className="text-center text-white/80 mb-8">
                  Choose your role to get started with Private Tip Jar
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleRoleSelect('tipper')}
                    className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">I'm a Customer</h3>
                        <p className="text-white/70">Want to give tips</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60">
                      Quick setup with Aleo wallet. Start tipping workers anonymously in minutes.
                    </p>
                  </button>

                  <button
                    onClick={() => handleRoleSelect('worker')}
                    className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-green-400 hover:bg-green-500/10 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">I'm a Service Worker</h3>
                        <p className="text-white/70">Want to receive tips</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60">
                      Create your profile and tip jar address. Start receiving anonymous tips.
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              // Registration Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('')}
                    className="text-white/70 hover:text-white"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {selectedRole === 'tipper' ? 'Customer Registration' : 'Worker Registration'}
                    </h2>
                    <p className="text-white/70">
                      {selectedRole === 'tipper' 
                        ? 'Quick setup to start tipping' 
                        : 'Create your profile to receive tips'
                      }
                    </p>
                  </div>
                </div>

                {selectedRole === 'tipper' ? (
                  // Tipper Registration
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name/Nickname (Optional)</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="Enter your name or nickname"
                      />
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Wallet className="w-5 h-5 text-blue-400" />
                        <span className="font-medium">Connect Aleo Wallet</span>
                      </div>
                      <p className="text-sm text-white/70">
                        You'll need to connect your Aleo wallet to send tips. This is required for all transactions.
                      </p>
                      <button
                        type="button"
                        className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                ) : (
                  // Worker Registration
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-green-400 focus:outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Workplace *</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input
                            type="text"
                            required
                            value={formData.workplace}
                            onChange={(e) => handleInputChange('workplace', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-green-400 focus:outline-none"
                            placeholder="Restaurant, Cafe, etc."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Position *</label>
                        <input
                          type="text"
                          required
                          value={formData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-green-400 focus:outline-none"
                          placeholder="Waiter, Courier, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Photo (Optional)</label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                        <Camera className="w-8 h-8 mx-auto mb-2 text-white/50" />
                        <p className="text-sm text-white/70 mb-2">Click to upload or drag and drop</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors">
                          Choose File
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">About You (Optional)</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={4}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-green-400 focus:outline-none resize-none"
                          placeholder="Tell customers about yourself and your service..."
                        />
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Wallet className="w-5 h-5 text-green-400" />
                        <span className="font-medium">Connect Aleo Wallet</span>
                      </div>
                      <p className="text-sm text-white/70">
                        Connect your Aleo wallet to create your tip jar address and receive tips.
                      </p>
                      <button
                        type="button"
                        className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200"
                >
                  {selectedRole === 'tipper' ? 'Complete Registration' : 'Create Tip Jar Profile'}
                </button>

                <p className="text-center text-sm text-white/60">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-400 hover:text-blue-300">
                    Sign in here
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  User, 
  Building, 
  Camera, 
  FileText, 
  Save,
  Eye,
  EyeOff,
  Copy,
  QrCode,
  Share2
} from 'lucide-react'

export default function ProfilePage() {
  const [showQR, setShowQR] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Smith',
    workplace: 'Restaurant "Vkusno"',
    position: 'Waiter',
    description: 'I have been working as a waiter for 3 years. I always strive to provide excellent service and make every guest feel welcome.',
    phone: '+7 (999) 123-45-67',
    email: 'john.smith@example.com',
    photo: null as File | null
  })

  const tipJarAddress = 'aleo1abc123def456ghi789jkl012mno345pqr678stu901vwx234yz'

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }))
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle save logic here
    console.log('Saving profile:', formData)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Show toast notification
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

                <form onSubmit={handleSave} className="space-y-6">
                  {/* Profile Photo */}
                  <div>
                    <label className="block text-sm font-medium mb-4">Profile Photo</label>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {formData.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-4 hover:border-white/40 transition-colors">
                          <Camera className="w-8 h-8 mx-auto mb-2 text-white/50" />
                          <p className="text-sm text-white/70 mb-2 text-center">Click to upload or drag and drop</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors block text-center">
                            Choose File
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
                          placeholder="Enter your full name"
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
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="Waiter, Courier, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Workplace *</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        required
                        value={formData.workplace}
                        onChange={(e) => handleInputChange('workplace', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="Restaurant, Cafe, etc."
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium mb-2">About You</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
                        placeholder="Tell customers about yourself and your service..."
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tip Jar Address */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Your Tip Jar Address</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="font-mono text-sm break-all text-white/80">
                      {tipJarAddress}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(tipJarAddress)}
                      className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      QR
                    </button>
                  </div>
                  {showQR && (
                    <div className="p-4 bg-white/5 rounded-lg text-center">
                      <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">QR Code</span>
                      </div>
                      <p className="text-sm text-white/60">Scan to get tip jar address</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Profile
                  </button>
                  <Link
                    href="/dashboard"
                    className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    View Dashboard
                  </Link>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Profile Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Profile Views:</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Tips:</span>
                    <span className="font-medium">156.75 ALEO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Rating:</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Member Since:</span>
                    <span className="font-medium">Jan 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
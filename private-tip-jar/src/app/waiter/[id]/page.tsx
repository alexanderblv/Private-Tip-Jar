'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Utensils, 
  Phone, 
  Share2, 
  Heart,
  MessageCircle,
  Calendar,
  DollarSign
} from 'lucide-react'

export default function WaiterProfilePage() {
  const params = useParams()
  const workerId = params.id as string
  const [isLiked, setIsLiked] = useState(false)

  // Mock worker data - in real app this would be fetched based on workerId
  const worker = {
    id: workerId,
    name: 'Ivan Petrov',
    position: 'Waiter',
    workplace: 'Restaurant "Vkusno"',
    rating: 4.8,
    reviews: 23,
    phone: '+7 (999) 123-45-67',
    description: 'I have been working as a waiter for 3 years. I always strive to provide excellent service and make every guest feel welcome. I love what I do and it shows in my work!',
    photo: '/api/placeholder/200/200',
    totalTips: '1,234.56',
    averageTip: '15.75',
    memberSince: '2023-01-15',
    tipJarAddress: 'aleo1abc123def456ghi789jkl012mno345pqr678stu901vwx234yz'
  }

  const mockReviews = [
    {
      id: 1,
      rating: 5,
      comment: 'Excellent service! Very attentive and friendly.',
      date: '2024-01-10',
      anonymous: true
    },
    {
      id: 2,
      rating: 4,
      comment: 'Great experience, highly recommended.',
      date: '2024-01-08',
      anonymous: true
    },
    {
      id: 3,
      rating: 5,
      comment: 'Amazing service, will definitely come back!',
      date: '2024-01-05',
      anonymous: true
    }
  ]

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${worker.name} - ${worker.position}`,
        text: `Check out ${worker.name}'s profile on Private Tip Jar!`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Show toast notification
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400' 
              : 'text-gray-400'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/waiters" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workers
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                  {worker.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{worker.name}</h1>
                    <div className="flex items-center gap-4 text-white/70 mb-4">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-5 h-5" />
                        <span>{worker.position}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{worker.workplace}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-lg transition-colors ${
                        isLiked 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    {renderStars(worker.rating)}
                    <span className="font-semibold">{worker.rating}</span>
                  </div>
                  <span className="text-white/60">({worker.reviews} reviews)</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{worker.totalTips}</div>
                    <div className="text-sm text-white/60">Total Tips</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{worker.averageTip}</div>
                    <div className="text-sm text-white/60">Avg Tip</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {new Date(worker.memberSince).getFullYear()}
                    </div>
                    <div className="text-sm text-white/60">Member Since</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/tip/${worker.id}`}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-center transition-all duration-200"
                  >
                    💰 Give Tip
                  </Link>
                  <button className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
            <h2 className="text-xl font-semibold mb-4">About {worker.name}</h2>
            <p className="text-white/80 leading-relaxed">{worker.description}</p>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/50" />
                <span>{worker.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/50" />
                <span>{worker.workplace}</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-6">Recent Reviews</h2>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-white/60">
                        {review.anonymous ? 'Anonymous' : 'Customer'}
                      </span>
                    </div>
                    <span className="text-sm text-white/50">{review.date}</span>
                  </div>
                  <p className="text-white/80">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
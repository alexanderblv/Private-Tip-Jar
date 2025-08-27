'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, MapPin, Utensils } from 'lucide-react'

export default function WaitersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filters = [
    { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
    { id: 'cafes', label: 'Cafes', icon: '☕' },
    { id: 'couriers', label: 'Couriers', icon: '🚚' },
    { id: 'streamers', label: 'Streamers', icon: '📺' },
    { id: 'bars', label: 'Bars', icon: '🍺' },
    { id: 'hotels', label: 'Hotels', icon: '🏨' },
    { id: 'other', label: 'Other', icon: '💼' }
  ]

  const mockWorkers = [
    {
      id: 1,
      name: 'Ivan Petrov',
      position: 'Waiter',
      workplace: 'Restaurant "Vkusno"',
      rating: 4.8,
      reviews: 23,
      photo: '/api/placeholder/100/100',
      category: 'restaurants'
    },
    {
      id: 2,
      name: 'Maria Ivanova',
      position: 'Barista',
      workplace: 'Coffee House "Aroma"',
      rating: 4.9,
      reviews: 45,
      photo: '/api/placeholder/100/100',
      category: 'cafes'
    },
    {
      id: 3,
      name: 'Alexei Smirnov',
      position: 'Courier',
      workplace: 'Fast Delivery Service',
      rating: 4.7,
      reviews: 67,
      photo: '/api/placeholder/100/100',
      category: 'couriers'
    },
    {
      id: 4,
      name: 'Elena Kozlova',
      position: 'Waitress',
      workplace: 'Bar "Night Owl"',
      rating: 4.6,
      reviews: 34,
      photo: '/api/placeholder/100/100',
      category: 'bars'
    },
    {
      id: 5,
      name: 'Dmitri Volkov',
      position: 'Streamer',
      workplace: 'Gaming Channel',
      rating: 4.9,
      reviews: 156,
      photo: '/api/placeholder/100/100',
      category: 'streamers'
    },
    {
      id: 6,
      name: 'Anna Sokolova',
      position: 'Concierge',
      workplace: 'Grand Hotel',
      rating: 4.8,
      reviews: 28,
      photo: '/api/placeholder/100/100',
      category: 'hotels'
    }
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.workplace.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(worker.category)
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Service Workers</h1>
          <p className="text-white/70">
            Discover amazing service workers and show your appreciation with anonymous tips
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search by name or workplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-white/50" />
              <span className="font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                    selectedFilters.includes(filter.id)
                      ? 'bg-blue-500 border-blue-400 text-white'
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <span>{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredWorkers.length} worker{filteredWorkers.length !== 1 ? 's' : ''} found
            </h2>
            {selectedFilters.length > 0 && (
              <button
                onClick={() => setSelectedFilters([])}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {worker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{worker.name}</h3>
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <Utensils className="w-4 h-4" />
                    <span className="text-sm">{worker.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{worker.workplace}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{worker.rating}</span>
                    </div>
                    <span className="text-sm text-white/50">({worker.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <Link
                href={`/waiter/${worker.id}`}
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium text-center block transition-all duration-200"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No workers found</h3>
            <p className="text-white/70 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedFilters([])
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
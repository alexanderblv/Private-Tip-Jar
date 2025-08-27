import Link from 'next/link'
import { ArrowRight, Shield, Zap, Coins } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Private Tips on Aleo Blockchain
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Send and receive tips completely anonymously. Amounts are hidden from everyone except the recipient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/register?role=tipper" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              👤 I'm a Customer - Want to Give Tips
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/register?role=worker" 
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              🍽️ I'm a Service Worker - Want to Receive Tips
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Private Tip Jar?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Complete Privacy</h3>
              <p className="text-white/70 text-center">
                Tip amounts are visible only to the recipient. Your generosity stays private and secure.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Coins className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">No Fees</h3>
              <p className="text-white/70 text-center">
                Minimal network fees only. Keep more of your money where it belongs - with the workers.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Instant</h3>
              <p className="text-white/70 text-center">
                Tips are delivered immediately. No waiting, no delays, just instant appreciation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of users who are already using Private Tip Jar for anonymous tipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/waiters" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Find Workers to Tip
            </Link>
            <Link 
              href="/register" 
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200"
            >
              Create Your Tip Jar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
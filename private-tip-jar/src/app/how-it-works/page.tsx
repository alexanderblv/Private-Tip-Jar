import Link from 'next/link'
import { 
  Shield, 
  Zap, 
  Coins, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Lock,
  Eye,
  Globe
} from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Connect Your Wallet',
      description: 'Connect your Aleo wallet to start sending or receiving tips. No personal information required.',
      icon: Shield
    },
    {
      number: 2,
      title: 'Find Service Workers',
      description: 'Browse our directory of service workers or scan their QR codes to find someone to tip.',
      icon: Users
    },
    {
      number: 3,
      title: 'Send Anonymous Tips',
      description: 'Choose an amount and send your tip. The transaction is completely private and anonymous.',
      icon: Lock
    },
    {
      number: 4,
      title: 'Instant Delivery',
      description: 'Tips are delivered instantly to the recipient\'s wallet with minimal network fees.',
      icon: Zap
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'Tip amounts are visible only to the recipient. Your generosity stays completely private.',
      color: 'blue'
    },
    {
      icon: Coins,
      title: 'No Fees',
      description: 'Minimal network fees only. Keep more of your money where it belongs - with the workers.',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Instant',
      description: 'Tips are delivered immediately. No waiting, no delays, just instant appreciation.',
      color: 'purple'
    },
    {
      icon: Globe,
      title: 'Global',
      description: 'Send tips to anyone, anywhere in the world, without borders or restrictions.',
      color: 'orange'
    }
  ]

  const securityFeatures = [
    'Zero-knowledge proofs ensure complete privacy',
    'No personal data is stored on the blockchain',
    'All transactions are cryptographically secure',
    'Decentralized network prevents censorship',
    'Open source code for transparency'
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How Private Tip Jar Works
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover how Aleo blockchain technology enables completely anonymous tipping while maintaining security and transparency.
          </p>
        </div>

        {/* How It Works Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Simple 4-Step Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-white/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Private Tip Jar?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className={`w-16 h-16 bg-${benefit.color}-500/20 rounded-full flex items-center justify-center mb-6`}>
                  <benefit.icon className={`w-8 h-8 text-${benefit.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Security & Privacy First</h2>
              <p className="text-lg text-white/80 mb-8">
                Private Tip Jar leverages Aleo's zero-knowledge blockchain technology to ensure your privacy is never compromised.
              </p>
              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Zero-Knowledge Proofs</h3>
                <p className="text-white/70 mb-6">
                  Aleo's advanced cryptography ensures that transaction details remain private while still being verifiable.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">100%</div>
                    <div className="text-white/60">Private</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">0%</div>
                    <div className="text-white/60">Fees</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aleo Technology */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Powered by Aleo Blockchain</h2>
              <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
                Aleo is the first blockchain to offer full privacy for all applications. Built with zero-knowledge cryptography, 
                Aleo enables users to interact with Web3 applications without revealing personal information.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">ZK-Proofs</div>
                  <p className="text-white/70">Zero-knowledge proofs ensure privacy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">Scalable</div>
                  <p className="text-white/70">High throughput for global adoption</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">Secure</div>
                  <p className="text-white/70">Cryptographically verified transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of users who are already using Private Tip Jar for anonymous tipping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Create Your Account
            </Link>
            <Link 
              href="/waiters" 
              className="px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Browse Workers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
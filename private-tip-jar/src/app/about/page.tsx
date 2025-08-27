import Link from 'next/link'
import { 
  Heart, 
  Shield, 
  Globe, 
  Users, 
  Code, 
  Award,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Blockchain enthusiast with 8+ years in fintech. Passionate about privacy and decentralized solutions.',
      avatar: 'AC',
      social: {
        github: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in blockchain and zero-knowledge proofs. Aleo ecosystem contributor.',
      avatar: 'SJ',
      social: {
        github: '#',
        twitter: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'UX Designer',
      bio: 'Product designer focused on creating intuitive user experiences for Web3 applications.',
      avatar: 'MR',
      social: {
        github: '#',
        twitter: '#',
        linkedin: '#'
      }
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'We believe privacy is a fundamental human right. Every transaction on our platform is designed to protect user privacy.'
    },
    {
      icon: Heart,
      title: 'Empowering Workers',
      description: 'Our mission is to empower service workers by providing them with a fair, transparent, and private way to receive tips.'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'We\'re building for everyone, everywhere. No borders, no restrictions, just global access to fair tipping.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'We believe in the power of community. Our platform is built by the community, for the community.'
    }
  ]

  const milestones = [
    {
      year: '2024',
      title: 'CodeSprint v4.0 Launch',
      description: 'Private Tip Jar launches as part of Aleo CodeSprint v4.0, showcasing the power of zero-knowledge proofs.'
    },
    {
      year: '2024',
      title: 'Beta Testing',
      description: 'Comprehensive beta testing with real service workers and customers across multiple industries.'
    },
    {
      year: '2024',
      title: 'Mainnet Launch',
      description: 'Full mainnet launch with enhanced features and improved user experience.'
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Private Tip Jar
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We're revolutionizing the way people show appreciation to service workers through 
            blockchain technology and complete privacy.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 mb-6">
                Private Tip Jar was born from a simple observation: service workers deserve better ways to receive 
                appreciation for their hard work, and customers deserve privacy when showing that appreciation.
              </p>
              <p className="text-lg text-white/80 mb-6">
                We're building a world where tipping is instant, private, and fair. Using Aleo's revolutionary 
                zero-knowledge blockchain technology, we're creating a platform that protects everyone's privacy 
                while enabling seamless, borderless transactions.
              </p>
              <p className="text-lg text-white/80">
                Our vision is to become the global standard for private, decentralized tipping, empowering 
                millions of service workers worldwide.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Empowering Service Workers</h3>
                <p className="text-white/70 mb-6">
                  Every tip sent through our platform goes directly to the worker, with no intermediaries 
                  taking a cut. We believe in fair compensation for quality service.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">100%</div>
                    <div className="text-white/60">To Workers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">0%</div>
                    <div className="text-white/60">Platform Fees</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-400 mb-4">{member.role}</p>
                <p className="text-white/70 mb-4 text-sm">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a href={member.social.github} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={member.social.twitter} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={member.social.linkedin} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-white/70">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Built on Aleo</h2>
              <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
                Private Tip Jar is built on Aleo, the first blockchain to offer full privacy for all applications. 
                Aleo's zero-knowledge cryptography ensures that your transactions remain completely private while 
                still being verifiable and secure.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">ZK-Proofs</div>
                  <p className="text-white/70">Zero-knowledge proofs for complete privacy</p>
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
          <h2 className="text-3xl font-bold mb-6">Join Us in Revolutionizing Tipping</h2>
          <p className="text-xl text-white/80 mb-8">
            Be part of the future of private, decentralized tipping. Start using Private Tip Jar today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Get Started
            </Link>
            <Link 
              href="/how-it-works" 
              className="px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
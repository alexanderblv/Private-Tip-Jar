'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail, MessageCircle, HelpCircle } from 'lucide-react'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      id: 1,
      question: 'What is Private Tip Jar?',
      answer: 'Private Tip Jar is a decentralized application built on the Aleo blockchain that enables completely anonymous tipping. Users can send tips to service workers without revealing their identity or the tip amount to anyone except the recipient.'
    },
    {
      id: 2,
      question: 'How does privacy work?',
      answer: 'Private Tip Jar uses Aleo\'s zero-knowledge proofs to ensure complete privacy. Tip amounts and sender information are encrypted and only visible to the recipient. The blockchain verifies the transaction without revealing any sensitive data.'
    },
    {
      id: 3,
      question: 'Do I need an Aleo wallet?',
      answer: 'Yes, you need an Aleo wallet to use Private Tip Jar. We recommend using Leo Wallet, which is the official wallet for the Aleo ecosystem. You can download it from the official website.'
    },
    {
      id: 4,
      question: 'Are there any fees?',
      answer: 'Private Tip Jar itself has no fees. You only pay minimal network fees to the Aleo blockchain for processing your transaction, which are typically less than $0.01.'
    },
    {
      id: 5,
      question: 'How do I create a tip jar profile?',
      answer: 'To create a tip jar profile, click "Register" and select "I\'m a Service Worker". Fill in your information, connect your Aleo wallet, and your unique tip jar address will be generated automatically.'
    },
    {
      id: 6,
      question: 'Can I tip anyone?',
      answer: 'You can tip any service worker who has created a profile on Private Tip Jar. This includes waiters, couriers, baristas, streamers, and other service professionals.'
    },
    {
      id: 7,
      question: 'How long do transactions take?',
      answer: 'Transactions on the Aleo blockchain are typically confirmed within a few seconds. Your tip will be delivered to the recipient almost instantly.'
    },
    {
      id: 8,
      question: 'What if I make a mistake?',
      answer: 'Unfortunately, blockchain transactions cannot be reversed once confirmed. Always double-check the recipient address and amount before sending. We recommend starting with small amounts to test the system.'
    },
    {
      id: 9,
      question: 'Is my personal information safe?',
      answer: 'Yes, Private Tip Jar collects minimal personal information. Your wallet address is the only required identifier, and all transaction details are encrypted using zero-knowledge proofs.'
    },
    {
      id: 10,
      question: 'Can I withdraw my tips?',
      answer: 'Yes, as a service worker, you can withdraw your tips to your connected Aleo wallet at any time. The funds are immediately available in your wallet after receiving a tip.'
    },
    {
      id: 11,
      question: 'What happens if I lose my wallet?',
      answer: 'If you lose access to your Aleo wallet, you will lose access to your tips. Always keep your wallet credentials safe and consider using a hardware wallet for additional security.'
    },
    {
      id: 12,
      question: 'Is Private Tip Jar available worldwide?',
      answer: 'Yes, Private Tip Jar is available globally. Since it\'s built on blockchain technology, there are no geographical restrictions. However, make sure to comply with your local regulations regarding cryptocurrency transactions.'
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80">
              Find answers to common questions about Private Tip Jar and how to use our platform.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-white/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  )}
                </button>
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-4">
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
              <p className="text-lg text-white/80 mb-8">
                Our support team is here to help you with any questions or issues you might have.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                  <p className="text-white/70 mb-4">Get help via email</p>
                  <a 
                    href="mailto:support@privatetipjar.com" 
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    support@privatetipjar.com
                  </a>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                  <p className="text-white/70 mb-4">Chat with our support team</p>
                  <button className="text-green-400 hover:text-green-300 font-medium">
                    Start Chat
                  </button>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Help Center</h3>
                  <p className="text-white/70 mb-4">Browse our documentation</p>
                  <button className="text-purple-400 hover:text-purple-300 font-medium">
                    Visit Help Center
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Quick Links</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a 
                href="/how-it-works" 
                className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-center"
              >
                <h4 className="font-semibold mb-2">How It Works</h4>
                <p className="text-sm text-white/60">Learn about our process</p>
              </a>
              <a 
                href="/register" 
                className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-center"
              >
                <h4 className="font-semibold mb-2">Get Started</h4>
                <p className="text-sm text-white/60">Create your account</p>
              </a>
              <a 
                href="/waiters" 
                className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-center"
              >
                <h4 className="font-semibold mb-2">Find Workers</h4>
                <p className="text-sm text-white/60">Browse service workers</p>
              </a>
              <a 
                href="/about" 
                className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-center"
              >
                <h4 className="font-semibold mb-2">About Us</h4>
                <p className="text-sm text-white/60">Learn about our mission</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
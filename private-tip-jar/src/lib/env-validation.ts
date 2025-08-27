import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'

export function validateEnvironment() {
  const errors: string[] = []
  const warnings: string[] = []

  // Check for required environment variables
  const network = process.env.NEXT_PUBLIC_ALEO_NETWORK
  if (!network) {
    warnings.push('NEXT_PUBLIC_ALEO_NETWORK not set, defaulting to testnet')
  } else if (!Object.values(WalletAdapterNetwork).includes(network as WalletAdapterNetwork)) {
    errors.push(`Invalid NEXT_PUBLIC_ALEO_NETWORK: ${network}. Must be one of: ${Object.values(WalletAdapterNetwork).join(', ')}`)
  }

  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    warnings.push('Running in server-side environment, wallet features will be limited')
  }

  // Check for HTTPS in production
  if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
    warnings.push('HTTPS is required for wallet connections in production')
  }

  return { errors, warnings }
}

export function logEnvironmentInfo() {
  const { errors, warnings } = validateEnvironment()
  
  if (errors.length > 0) {
    console.error('Environment validation errors:', errors)
  }
  
  if (warnings.length > 0) {
    console.warn('Environment validation warnings:', warnings)
  }

  console.log('Current environment:', {
    network: process.env.NEXT_PUBLIC_ALEO_NETWORK || 'testnet (default)',
    nodeEnv: process.env.NODE_ENV,
    protocol: typeof window !== 'undefined' ? window.location.protocol : 'server-side',
    origin: typeof window !== 'undefined' ? window.location.origin : 'server-side'
  })
}
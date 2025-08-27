export function validateEnvironment() {
  const errors: string[] = []
  const warnings: string[] = []

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
    nodeEnv: process.env.NODE_ENV,
    protocol: typeof window !== 'undefined' ? window.location.protocol : 'server-side',
    origin: typeof window !== 'undefined' ? window.location.origin : 'server-side'
  })
}
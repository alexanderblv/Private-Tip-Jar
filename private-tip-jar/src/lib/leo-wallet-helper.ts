// Leo Wallet Helper Utilities
// These functions help work around common Leo Wallet permission issues

export interface LeoWalletStatus {
  isInstalled: boolean
  isReady: boolean
  hasPermission: boolean
  network: string | null
  canConnect: boolean
}

export function detectLeoWallet(): LeoWalletStatus {
  if (typeof window === 'undefined') {
    return {
      isInstalled: false,
      isReady: false,
      hasPermission: false,
      network: null,
      canConnect: false
    }
  }

  // Check if Leo Wallet is available
  const hasLeoWallet = !!(window as any).leoWallet || 
    document.querySelector('[data-testid="leo-wallet-button"]') ||
    document.querySelector('[class*="leo"]') ||
    document.querySelector('[id*="leo"]')

  // Try to get network info if possible
  let network = null
  try {
    if ((window as any).leoWallet && (window as any).leoWallet.network) {
      network = (window as any).leoWallet.network
    }
  } catch (e) {
    // Network info not available
  }

  return {
    isInstalled: !!hasLeoWallet,
    isReady: !!(hasLeoWallet && typeof (window as any).leoWallet !== 'undefined'),
    hasPermission: false, // We can't reliably detect this
    network,
    canConnect: !!hasLeoWallet
  }
}

export function tryOpenLeoWallet(): boolean {
  if (typeof window === 'undefined') return false

  try {
    // Method 1: Direct API call
    if ((window as any).leoWallet && typeof (window as any).leoWallet.open === 'function') {
      (window as any).leoWallet.open()
      return true
    }

    // Method 2: Click extension button
    const extensionButton = document.querySelector('[data-testid="leo-wallet-button"]') as HTMLElement
    if (extensionButton) {
      extensionButton.click()
      return true
    }

    // Method 3: Find any Leo Wallet related element
    const leoElements = document.querySelectorAll('[class*="leo"], [id*="leo"], [data-*="leo"]')
    for (const el of leoElements) {
      if (el instanceof HTMLElement && el.offsetParent !== null) {
        el.click()
        return true
      }
    }

    // Method 4: Try to trigger a connection event
    const event = new CustomEvent('leo-wallet-connect', {
      detail: { network: 'testnet3' }
    })
    window.dispatchEvent(event)
    return true

  } catch (e) {
    console.log('Could not programmatically open Leo Wallet:', e)
    return false
  }
}

export function waitForLeoWallet(timeout = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now()
    
    const checkWallet = () => {
      const status = detectLeoWallet()
      
      if (status.isReady) {
        resolve(true)
        return
      }
      
      if (Date.now() - startTime > timeout) {
        resolve(false)
        return
      }
      
      setTimeout(checkWallet, 500)
    }
    
    checkWallet()
  })
}

export function createLeoWalletConnectionPrompt(): void {
  if (typeof window === 'undefined') return

  // Create a modal or notification to guide the user
  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: system-ui, -apple-system, sans-serif;
  `

  modal.innerHTML = `
    <div style="
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 24px;
      max-width: 400px;
      color: white;
      text-align: center;
    ">
      <h3 style="margin: 0 0 16px 0; color: #fff;">Connect Leo Wallet</h3>
      <p style="margin: 0 0 16px 0; color: #ccc; font-size: 14px;">
        Please follow these steps to connect your Leo Wallet:
      </p>
      <ol style="text-align: left; margin: 0 0 16px 0; color: #ccc; font-size: 14px;">
        <li>Click the Leo Wallet icon in your browser toolbar</li>
        <li>Make sure you're on Testnet 3 network</li>
        <li>Approve the connection when prompted</li>
        <li>Return here and click "Retry Connection"</li>
      </ol>
      <button id="close-modal" style="
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      ">Got it!</button>
    </div>
  `

  document.body.appendChild(modal)

  // Close modal when button is clicked
  modal.querySelector('#close-modal')?.addEventListener('click', () => {
    document.body.removeChild(modal)
  })

  // Auto-close after 30 seconds
  setTimeout(() => {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal)
    }
  }, 30000)
}

export function checkNetworkPermission(): Promise<boolean> {
  return new Promise((resolve) => {
    // This is a best-effort check since we can't directly access Leo Wallet's internal state
    const status = detectLeoWallet()
    
    if (!status.isInstalled) {
      resolve(false)
      return
    }

    // Try to detect if there are any permission-related errors
    const originalError = console.error
    let hasPermissionError = false
    
    console.error = (...args) => {
      if (args.some(arg => String(arg).includes('NETWORK_NOT_GRANTED'))) {
        hasPermissionError = true
      }
      originalError.apply(console, args)
    }

    // Wait a bit and check
    setTimeout(() => {
      console.error = originalError
      resolve(!hasPermissionError)
    }, 1000)
  })
}
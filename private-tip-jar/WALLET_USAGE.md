# Aleo Wallet Integration Guide

## Overview

This project uses the Aleo Wallet Adapter to integrate Leo Wallet functionality. The wallet integration is built using the following components:

- `Wallet.tsx` - Main wallet provider component with modal support
- `WalletConnectButton.tsx` - UI component for connecting/disconnecting wallets
- `WalletProviderWrapper.tsx` - Wrapper component for easy integration

## Key Features

### 1. Wallet Provider (`Wallet.tsx`)

The main wallet provider component that includes:

- **Leo Wallet Adapter**: Supports Leo Wallet extension
- **Modal Support**: Built-in wallet selection modal
- **Network Configuration**: Configurable for Testnet/Mainnet/Localnet
- **Decrypt Permissions**: Configurable permission levels
- **Auto-connect**: Disabled by default for better user control

### 2. Wallet Connect Button (`WalletConnectButton.tsx`)

Provides two connection methods:

- **Direct Connect**: Attempts to connect directly to Leo Wallet
- **Modal Connect**: Opens the wallet selection modal

## Usage

### Basic Integration

```tsx
import { Wallet } from '@/components/wallet/Wallet'

function App() {
  return (
    <Wallet>
      <YourAppContent />
    </Wallet>
  )
}
```

### Using the Connect Button

```tsx
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'

function Header() {
  return (
    <header>
      <WalletConnectButton />
    </header>
  )
}
```

### Using Wallet Hooks

```tsx
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useWalletModal } from '@demox-labs/aleo-wallet-adapter-reactui'

function MyComponent() {
  const { connected, publicKey, connect, disconnect } = useWallet()
  const { setVisible } = useWalletModal()

  // Your wallet logic here
}
```

## Configuration

### Network Selection

The wallet is configured for Testnet by default. To change networks:

```tsx
// In Wallet.tsx
network={WalletAdapterNetwork.Mainnet} // or Testnet, Localnet
```

### Environment Variables

Set the network via environment variable:

```env
NEXT_PUBLIC_ALEO_NETWORK=Testnet
```

### Decrypt Permissions

Configure decrypt permissions:

```tsx
// In Wallet.tsx
decryptPermission={DecryptPermission.UponRequest} // or NoDecrypt, AutoDecrypt
```

## Error Handling

The wallet components include comprehensive error handling for:

- Wallet not installed
- Network permission denied
- Connection failures
- Disconnection errors

## Styling

The wallet modal includes default styles from `@demox-labs/aleo-wallet-adapter-reactui/styles.css`. You can override these styles in your CSS.

## Dependencies

Required packages:

```json
{
  "@demox-labs/aleo-wallet-adapter-react": "0.0.22",
  "@demox-labs/aleo-wallet-adapter-leo": "0.0.25",
  "@demox-labs/aleo-wallet-adapter-reactui": "0.0.22"
}
```

## Troubleshooting

### Common Issues

1. **Wallet not detected**: Ensure Leo Wallet extension is installed
2. **Network errors**: Check network configuration and permissions
3. **Modal not showing**: Verify `WalletModalProvider` is wrapping your app

### Debug Mode

Enable console logging by checking browser developer tools for wallet connection events.
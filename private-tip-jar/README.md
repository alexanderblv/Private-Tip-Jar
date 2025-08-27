# Private Tip Jar

A decentralized tipping application built on Aleo for private transactions.

## Features

- Private tipping using Aleo's zero-knowledge proofs
- Leo Wallet integration
- User profiles and worker management
- Real-time transaction processing

## Getting Started

### Prerequisites

- Node.js 18+ 
- Leo Wallet browser extension
- Aleo Testnet 3 access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd private-tip-jar
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## Leo Wallet Connection

This application requires Leo Wallet for transactions. If you encounter connection issues:

### Quick Setup
1. Install Leo Wallet from [https://www.leo.app/](https://www.leo.app/)
2. Ensure you're on **Testnet 3** network
3. Grant permission to this site when prompted

### Troubleshooting

If you see `NETWORK_NOT_GRANTED` errors:

1. **Open Leo Wallet Extension**: Click the Leo Wallet icon in your browser toolbar
2. **Check Network Settings**: Ensure Testnet 3 is selected
3. **Approve Connection**: Look for and approve the connection popup
4. **Retry Connection**: Use the retry button in the error message

### Wallet Test Page

Visit `/wallet-test` to run diagnostic tests and troubleshoot connection issues. This page provides:

- Real-time wallet status
- Connection diagnostics
- Interactive troubleshooting tools
- Step-by-step connection guide

## Development

### Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   └── wallet/         # Wallet-related components
├── lib/                # Utility functions and configurations
└── middleware.ts       # Next.js middleware
```

### Key Components

- `WalletConnectButton`: Main wallet connection interface
- `WalletTroubleshooting`: Interactive troubleshooting guide
- `WalletDiagnostics`: Real-time connection diagnostics
- `WalletTestPage`: Comprehensive testing and debugging page

### Environment Variables

- `NEXT_PUBLIC_ALEO_NETWORK`: Aleo network (default: testnet3)
- `NEXT_PUBLIC_TIP_PROGRAM_ID`: Tip program ID
- `NEXT_PUBLIC_TIP_FUNCTION_NAME`: Tip function name

## Deployment

The application is configured for Vercel deployment with automatic builds and environment variable management.

## Support

For wallet connection issues:
1. Check the troubleshooting guide in the app
2. Visit the `/wallet-test` page for diagnostics
3. Refer to [Leo Wallet Documentation](https://docs.leo.app/)
4. Join the [Aleo Discord](https://discord.gg/aleo)

## License

Built for Aleo CodeSprint v4.0
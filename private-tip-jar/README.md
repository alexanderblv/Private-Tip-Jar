# Private Tip Jar (Aleo Testnet Beta)

A minimal private tipping app for service workers, built on Next.js and Vercel with Aleo wallet integration. Profiles and listing are stored in Vercel KV. Tip flows are private via Aleo smart contracts on Testnet Beta.

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Vercel KV (profiles index)
- Aleo Wallet Adapter (Leo + WalletConnect)
- Aleo Testnet Beta Network

## Network Configuration
This app is configured to work with **Aleo Testnet Beta**:
- **Network Name**: Aleo Testnet Beta
- **RPC Endpoint**: https://testnetbeta.aleorpc.com
- **Network ID**: Testnet Beta
- **Chain Status**: Active and Supported

## Local Setup
```bash
npm install
cp .env.local .env.local
# The .env.local file is already configured for Aleo Testnet Beta
npm run dev
```

## Environment Variables
### Required for Aleo Testnet Beta:
- `NEXT_PUBLIC_ALEO_NETWORK=Testnet` - Network configuration
- `NEXT_PUBLIC_ALEO_RPC_ENDPOINT=https://testnetbeta.aleorpc.com` - RPC endpoint
- `NEXT_PUBLIC_ALEO_NETWORK_ID=Testnet Beta` - Network identifier

### Optional:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: from WalletConnect Cloud
- `NEXT_PUBLIC_TIP_PROGRAM_ID`: your deployed Aleo program id
- `NEXT_PUBLIC_TIP_FUNCTION_NAME`: function to invoke for private tip
- `KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN`: from Vercel KV

## Deploy
- Push to GitHub and import in Vercel
- Add Vercel KV integration and bind env vars
- Set build command: `npm run build` and output as default

## Wiring Aleo Contracts
Edit `src/lib/aleo.ts` to call your deployed program via the connected wallet. For example with Leo Wallet adapter, sign and submit a transaction calling `PROGRAM_ID/ FUNCTION_NAME` with parameters: recipient address, amount, and optional memo.

## Routes
- `/` Landing
- `/workers` List/search workers
- `/workers/[id]` Worker profile and tip form
- `/profile` Create/update your profile (uses connected wallet address)
- `/api/profiles` List/Create profiles
- `/api/profiles/[id]` Fetch a profile

## Notes
- Tip send currently simulated; replace with real Aleo tx submit once ready.
- All amounts are strings; enforce your chosen units and validation in `TipForm`.
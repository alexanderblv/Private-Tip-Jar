# Private Tip Jar (Aleo)

A minimal private tipping app for service workers, built on Next.js and Vercel with Aleo wallet integration. Profiles and listing are stored in Vercel KV. Tip flows are private via Aleo smart contracts (wire up your deployed program IDs).

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Vercel KV (profiles index)
- Aleo Wallet Adapter (Leo + WalletConnect)

## Local Setup
```bash
npm install
cp .env.example .env.local
# Fill in KV_* and WalletConnect project id (optional)
npm run dev
```

## Environment
- KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN: from Vercel KV
- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: from WalletConnect Cloud (optional)
- NEXT_PUBLIC_TIP_PROGRAM_ID: your Aleo program id
- NEXT_PUBLIC_TIP_FUNCTION_NAME: function to invoke for private tip

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
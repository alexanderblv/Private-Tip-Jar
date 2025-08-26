# Private Tip Jar (Aleo)

Confidential tipping for service workers on Aleo. MVP demonstrates private creation of a tip jar, sending a private tip note, and claiming tips into a private balance.

## Features (MVP)
- Create private tip jar owned by caller
- Send private tip note with amount and recipient
- Claim tip notes into jar to update private balance

## Project Layout
- `program.json` — Leo program manifest
- `src/main.leo` — program source

## Prerequisites
- Leo toolchain installed: see Aleo docs (`https://developer.aleo.org/`)
- Alternatively use the online IDE: `https://play.leo-lang.org/`

## Build & Test (locally)
```bash
# In project root
leo build
leo run create_jar
leo run send_tip to=<aleo1...address> amount=5u64
# Provide the created TipNote and Jar outputs to claim
leo run claim_tip note=<TipNote> jar=<Jar>
```

Note: This MVP uses simple records (`Jar`, `TipNote`) to model private state. In production, integrate with Credits or Aleo token standard for real value transfer and add authorization, nullifiers, and proper record ownership rules.

## Next Steps
- Integrate Credits/token transfers (Aleo Token Standard)
- Add nullifiers to prevent double-claim of `TipNote`
- Expose web UI using Provable SDK and Universal Wallet Adapter
- Add tests (Leo native tests or DokoJS) and CI

## Resources
- Aleo DevDocs: `https://developer.aleo.org/`
- Leo Language Docs: `https://docs.leo-lang.org/leo`
- Testing Leo Programs: `https://developer.aleo.org/guides/leo/testing`
- Token Standard: `https://developer.aleo.org/guides/standards/token_registry`
- Universal Wallet Adapter: `https://developer.aleo.org/guides/wallets/universal_wallet_adapter`
- Provable SDK + Explorer API: `https://docs.explorer.provable.com/`
- Amareleo devnet: `https://developer.aleo.org/guides/amareleo/running`
- DokoJS: `https://github.com/venture23-aleo/doko-js`

## Testing Notes
- Leo unit tests: create `tests/` with `.leo` integration tests using `leo test`
- DokoJS: run JavaScript-driven tests for Leo circuits and transitions
- Prefer deterministic small amounts and explicit owners in fixtures
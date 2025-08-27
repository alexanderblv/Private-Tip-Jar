import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { WalletContextState } from '@demox-labs/aleo-wallet-adapter-react'

export interface SendTipParams {
  toAddress: string
  amount: string
  memo?: string
}

// Program configuration (Testnet-only)
const PROGRAM_ID = process.env.NEXT_PUBLIC_TIP_PROGRAM_ID || 'tip_jar.aleo'
const FUNCTION_NAME = process.env.NEXT_PUBLIC_TIP_FUNCTION_NAME || 'send_private_tip'

export async function sendPrivateTip(
  params: SendTipParams,
  walletCtx: Pick<WalletContextState, 'wallet' | 'connected'>
) {
  const { wallet, connected } = walletCtx
  const network: WalletAdapterNetwork = (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet

  if (!connected || !wallet) throw new Error('Wallet is not connected')
  if (!params.toAddress || !params.amount) throw new Error('Missing tip params')

  const inputs = params.memo ? [params.toAddress, params.amount, params.memo] : [params.toAddress, params.amount]

  // The Leo adapter exposes execution via requestExecute. Cast to any to avoid tight coupling on types.
  const adapterAny = wallet.adapter as any
  if (typeof adapterAny.requestExecute !== 'function') {
    throw new Error('Selected wallet does not support program execution')
  }

  try {
    const result = await adapterAny.requestExecute(
      PROGRAM_ID,
      FUNCTION_NAME,
      inputs,
      network
    )

    // Try to normalize the response
    const txId = result?.transactionId || result?.txId || result?.id || `unknown_${Date.now()}`
    return { txId }
  } catch (err: any) {
    const message = err?.message || 'Failed to submit transaction'
    throw new Error(message)
  }
}
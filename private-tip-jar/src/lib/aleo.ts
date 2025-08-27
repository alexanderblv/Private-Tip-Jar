import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { WalletContextState } from '@demox-labs/aleo-wallet-adapter-react'

export interface SendTipParams {
  toAddress: string
  amount: string
  memo?: string
}

// Program configuration (Testnet-only)
const TIP_JAR_PROGRAM_ID = process.env.NEXT_PUBLIC_TIP_PROGRAM_ID || 'tip_jar.aleo'
const TIP_JAR_FUNCTION_NAME = process.env.NEXT_PUBLIC_TIP_FUNCTION_NAME || 'send_private_tip'
const CREDITS_PROGRAM_ID = 'credits.aleo'
const CREDITS_FUNCTION_NAME = 'transfer_private'

export async function sendPrivateTip(
  params: SendTipParams,
  walletCtx: Pick<WalletContextState, 'wallet' | 'connected'>
) {
  const { wallet, connected } = walletCtx
  const network: WalletAdapterNetwork = (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet

  if (!connected || !wallet) throw new Error('Wallet is not connected')
  if (!params.toAddress || !params.amount) throw new Error('Missing tip params')

  // The Leo adapter exposes execution via requestExecute. Cast to any to avoid tight coupling on types.
  const adapterAny = wallet.adapter as any
  if (typeof adapterAny.requestExecute !== 'function') {
    throw new Error('Selected wallet does not support program execution')
  }

  try {
    // 1) Transfer funds privately via credits.aleo
    const transferInputs = [params.toAddress, params.amount]
    const transferResult = await adapterAny.requestExecute(
      CREDITS_PROGRAM_ID,
      CREDITS_FUNCTION_NAME,
      transferInputs,
      network
    )
    const transferTxId = transferResult?.transactionId || transferResult?.txId || transferResult?.id

    // 2) Record memo and increment counters in tip_jar.aleo
    const memoValue = params.memo ?? ''
    const tipInputs = [params.toAddress, params.amount, memoValue]
    const tipResult = await adapterAny.requestExecute(
      TIP_JAR_PROGRAM_ID,
      TIP_JAR_FUNCTION_NAME,
      tipInputs,
      network
    )
    const tipTxId = tipResult?.transactionId || tipResult?.txId || tipResult?.id

    return { transferTxId: transferTxId || `unknown_${Date.now()}`, tipTxId: tipTxId || `unknown_${Date.now()}` }
  } catch (err: any) {
    const message = err?.message || 'Failed to submit transaction'
    throw new Error(message)
  }
}
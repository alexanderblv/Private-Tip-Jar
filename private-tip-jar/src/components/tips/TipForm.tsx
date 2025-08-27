'use client'

import { useState } from 'react'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { sendPrivateTip } from '@/lib/aleo'

export function TipForm({ recipientId, recipientAddress }: { recipientId: string; recipientAddress: string }) {
  const walletCtx = useWallet()
  const { publicKey, connected } = walletCtx
  const [amount, setAmount] = useState<string>('')
  const [memo, setMemo] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    setLoading(true)
    try {
      if (!connected || !publicKey) throw new Error('Connect Aleo wallet')
      const { transferTxId, tipTxId } = await sendPrivateTip({ toAddress: recipientAddress, amount, memo }, walletCtx)
      setStatus(`Transfer tx: ${transferTxId} | Memo tx: ${tipTxId}`)
      setAmount('')
      setMemo('')
    } catch (err: any) {
      setStatus(err?.message || 'Failed to send tip')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-1">
        <label className="text-sm">Amount</label>
        <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="e.g. 1.5" className="bg-transparent border border-white/20 rounded px-3 py-2 outline-none" required />
      </div>
      <div className="grid gap-1">
        <label className="text-sm">Message (optional)</label>
        <input value={memo} onChange={(e)=>setMemo(e.target.value)} placeholder="Thanks!" className="bg-transparent border border-white/20 rounded px-3 py-2 outline-none" />
      </div>
      <button disabled={loading} className="px-4 py-2 rounded bg-brand text-black font-medium disabled:opacity-60">{loading? 'Sending...' : 'Send Tip Privately'}</button>
      {status && <div className="text-sm text-white/70">{status}</div>}
    </form>
  )
}
import Link from 'next/link'
import { WalletInstructions } from '@/components/wallet/WalletInstructions'

export default function Page() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-4">
        <h1 className="text-3xl font-bold">Private Tips on Aleo</h1>
        <p className="text-white/70 max-w-2xl">
          Send and receive tips privately. Amounts are hidden from everyone except the recipient.
        </p>
        <div className="flex gap-3">
          <Link href="/workers" className="px-4 py-2 rounded bg-brand text-black font-medium">Find Worker</Link>
          <Link href="/profile" className="px-4 py-2 rounded border border-white/20">Create Tip Jar</Link>
        </div>
      </section>
      
      <WalletInstructions />
    </div>
  )
}
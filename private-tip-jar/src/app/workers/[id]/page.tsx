import { notFound } from 'next/navigation'
import { getProfile } from '@/lib/kv'
import { TipForm } from '@/components/tips/TipForm'

interface Params { params: { id: string } }

export default async function WorkerDetailPage({ params }: Params) {
  const profile = await getProfile(params.id)
  if (!profile) return notFound()
  return (
    <div className="grid gap-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/10" style={{backgroundImage: profile.avatarUrl?`url(${profile.avatarUrl})`:undefined, backgroundSize:'cover'}} />
        <div>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <div className="text-xs text-white/60">@{profile.id}</div>
        </div>
      </div>
      {profile.bio && <p className="text-white/80">{profile.bio}</p>}
      <TipForm recipientId={profile.id} recipientAddress={profile.address} />
    </div>
  )
}
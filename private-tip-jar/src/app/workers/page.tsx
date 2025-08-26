import Link from 'next/link'

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/profiles`, { cache: 'no-store' })
  const json = await res.json()
  return json.profiles as Array<{ id: string; name: string; avatarUrl?: string }>
}

export default async function WorkersPage() {
  const profiles = await getData()
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Workers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((p) => (
          <Link key={p.id} href={`/workers/${p.id}`} className="border border-white/10 rounded p-4 flex items-center gap-3 hover:border-white/20">
            <div className="w-10 h-10 rounded-full bg-white/10" style={{backgroundImage: p.avatarUrl?`url(${p.avatarUrl})`:undefined, backgroundSize:'cover'}} />
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-white/60">@{p.id}</div>
            </div>
          </Link>
        ))}
        {profiles.length === 0 && (
          <div className="text-white/60">No workers yet. Be the first to create a profile.</div>
        )}
      </div>
    </div>
  )
}
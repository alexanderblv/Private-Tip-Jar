'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'

export default function ProfilePage() {
  const { publicKey, connected } = useWallet()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (connected && publicKey) {
      setId((prev) => prev || publicKey)
    }
  }, [connected, publicKey])

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    try {
      if (!connected || !publicKey) throw new Error('Connect Aleo wallet')
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, bio, avatarUrl, address: publicKey })
      })
      if (!res.ok) throw new Error('Failed to save profile')
      setStatus('Saved')
    } catch (err: any) {
      setStatus(err?.message || 'Error')
    }
  }

  return (
    <div className="grid gap-6 max-w-xl">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <form onSubmit={onSave} className="grid gap-3">
        <div className="grid gap-1">
          <label className="text-sm">Username or ID</label>
          <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="e.g. alice" className="bg-transparent border border-white/20 rounded px-3 py-2 outline-none" required />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Display name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Alice" className="bg-transparent border border-white/20 rounded px-3 py-2 outline-none" required />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Bio</label>
          <textarea value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Waiter at Cafe" className="bg-transparent border border-white/20 rounded px-3 py-2 outline-none" rows={3} />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Avatar URL</label>
          <input value={avatarUrl} onChange={(e)=>setAvatarUrl(e.target.value)} placeholder="https://..." className="bg-transparent border border-white/20 rounded px-3 py-2 outline-none" />
        </div>
        <button className="px-4 py-2 rounded bg-brand text-black font-medium">Save Profile</button>
        {status && <div className="text-sm text-white/70">{status}</div>}
      </form>
    </div>
  )
}
import { kv } from '@vercel/kv'

export interface WorkerProfile {
  id: string // aleo address or username slug
  address: string // aleo address for receiving tips
  name: string
  bio?: string
  avatarUrl?: string
  createdAt: number
}

const KEY = {
  profile: (id: string) => `ptj:profile:${id}`,
  allProfiles: 'ptj:profiles:index',
}

export async function saveProfile(profile: WorkerProfile) {
  await kv.hset(KEY.profile(profile.id), profile as unknown as Record<string, unknown>)
  await kv.sadd(KEY.allProfiles, profile.id)
  return profile
}

export async function getProfile(id: string): Promise<WorkerProfile | null> {
  const data = await kv.hgetall<Record<string, unknown>>(KEY.profile(id))
  return (data && Object.keys(data).length > 0) ? (data as unknown as WorkerProfile) : null
}

export async function listProfiles(): Promise<WorkerProfile[]> {
  const ids = await kv.smembers(KEY.allProfiles) as unknown as string[]
  const items = await Promise.all(ids.map((id) => getProfile(id)))
  return items.filter(Boolean) as WorkerProfile[]
}